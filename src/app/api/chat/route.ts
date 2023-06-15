import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { parseContent } from "@/lib/chatgpt";
import { ChatMessage } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY as string;
  const chatCompletionEndpoint = process.env.CHAT_COMPLETION_ENDPOINT as string;

  const messages = (await req.json()) as ChatMessage[];

  const requestBody = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
      stream: true,
    }),
  };
  let response: Response = await fetch(chatCompletionEndpoint, requestBody);

  if (!response?.ok) {
    let errorMessage = `Status: ${response?.status}, body: ${JSON.stringify(
      response?.body
    )}`;
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();

  let counter = 0;
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          console.log(data);
          console.log("----");
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = textEncoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of response.body as any) {
        parser.feed(textDecoder.decode(chunk));
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream;charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
