import { ChatMessage } from "@/types/chat";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Mock streaming chat response
const mockChatResponse = `I'd be happy to help you create a user journey map! Based on your inputs, I'll design a comprehensive TO-BE journey that addresses your pain points and business goals.

Let me analyze your requirements:
- **Role**: You're a product manager looking to streamline processes
- **Domain**: SaaS product management with focus on data-driven decisions
- **Key Pain Points**: Difficulty prioritizing features, misalignment with stakeholders, lengthy planning cycles

Here's a tailored user journey that addresses these challenges:

The journey starts with **Data Collection** where you gather user feedback from multiple sources like surveys, support tickets, and app reviews. This ensures decisions are grounded in real user needs.

Next is **Analysis & Prioritization** where you use frameworks like RICE scoring to objectively evaluate features. This removes guesswork and helps focus on high-impact work.

Then comes **Stakeholder Alignment** where you present your roadmap visually and collect feedback. This ensures everyone is on the same page before development begins.

Finally, **Implementation Planning** breaks down approved features into actionable sprints with clear requirements.

This journey should help you:
- Make more confident prioritization decisions
- Reduce time spent in meetings
- Improve stakeholder satisfaction
- Ship features faster

Would you like me to elaborate on any specific stage or suggest tools that could support this workflow?`;

export async function POST(req: NextRequest) {
  // Parse the request but we don't need it for mock data
  await req.json() as ChatMessage[];

  const textEncoder = new TextEncoder();

  // Split the mock response into words to simulate streaming
  const words = mockChatResponse.split(/(\s+)/);

  const stream = new ReadableStream({
    async start(controller) {
      // Send words with a small delay to simulate streaming
      for (const word of words) {
        const queue = textEncoder.encode(word);
        controller.enqueue(queue);

        // Small delay to simulate typing effect (15-40ms per word)
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      controller.close();
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
