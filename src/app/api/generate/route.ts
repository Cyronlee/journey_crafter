import { ChatMessage } from "@/types/chat";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Mock streaming response data - simulating AI-generated user journey
const mockJourneyResponse = `begin
header:
  role: Product Manager
  persona: Sarah, 35 years old, experienced product manager with 8 years in SaaS industry, proficient in agile methodologies and user research
  scenario: Streamlining the product feature prioritization process using a data-driven approach
  goals: Improve feature prioritization accuracy - Reduce time-to-market for high-impact features - Align stakeholder expectations
stages:
  - stage: Data Collection
    tasks:
    - task: Gather user feedback
      touchpoint: Analyze user surveys, support tickets, and app reviews in the product analytics dashboard
      emotion: 2
    - task: Review metrics
      touchpoint: Check usage metrics and conversion funnels in the analytics platform
      emotion: 2

  - stage: Analysis & Prioritization
    tasks:
    - task: Score features
      touchpoint: Use RICE scoring framework in the prioritization tool to evaluate potential features
      emotion: 2
    - task: Create roadmap
      touchpoint: Build visual roadmap in the project management tool with timelines and dependencies
      emotion: 3

  - stage: Stakeholder Alignment
    tasks:
    - task: Present roadmap
      touchpoint: Share interactive roadmap in the weekly stakeholder meeting via presentation tool
      emotion: 2
    - task: Collect feedback
      touchpoint: Gather comments and approvals through the collaboration platform
      emotion: 2

  - stage: Implementation Planning
    tasks:
    - task: Define requirements
      touchpoint: Write detailed user stories in the project management system
      emotion: 2
    - task: Plan sprints
      touchpoint: Organize tasks into sprints using the agile planning board
      emotion: 3
end`;

export async function POST(req: NextRequest) {
  // Parse the request but we don't need it for mock data
  await req.json() as ChatMessage[];

  const textEncoder = new TextEncoder();

  // Split the mock response into chunks to simulate streaming
  const chunks = mockJourneyResponse.split("");
  const chunkSize = 5; // Characters per chunk

  const stream = new ReadableStream({
    async start(controller) {
      // Send chunks with a small delay to simulate streaming
      for (let i = 0; i < chunks.length; i += chunkSize) {
        const chunk = chunks.slice(i, i + chunkSize).join("");
        const queue = textEncoder.encode(chunk);
        controller.enqueue(queue);

        // Small delay to simulate network latency (20-50ms)
        await new Promise((resolve) => setTimeout(resolve, 30));
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
