import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { parseContent } from "@/lib/chatgpt";
import { ChatMessage } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
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
      temperature: 0.6,
      stream: true,
    }),
  };

  let response;
  try {
    response = await fetch(chatCompletionEndpoint, requestBody);
  } catch (e) {
    console.error(e);
  }

  if (!response?.ok) {
    let errorMessage = `Status: ${response?.status}, body: ${JSON.stringify(
      response?.body
    )}`;
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  // read from chatgpt response and create parsed stream
  const reader = response?.body?.getReader();
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();
  const outputStream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader?.read();

      if (done) {
        controller.close();
      } else {
        const text = textDecoder.decode(value);
        console.log(text);
        console.log("-------");
        controller.enqueue(textEncoder.encode(parseContent(text)));
      }
    },
  });

  return new Response(outputStream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream;charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
