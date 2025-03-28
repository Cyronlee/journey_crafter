import type { ChatMessage } from "@/types/chat";

export const generateRequestBody = (
  apiKey: string,
  messages: ChatMessage[]
): RequestInit & { dispatcher?: any } => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  method: "POST",
  body: JSON.stringify({
    model: process.env.MODEL,
    messages,
    temperature: 0.6,
    stream: true,
  }),
});

export const parseContent = (text: string) => {
  if (text == "data: [DONE]") return "";

  try {
    const obj = JSON.parse(text.replace("data: ", ""));
    return obj?.choices[0]?.delta?.content || "";
  } catch (e) {
    return "";
  }
};
