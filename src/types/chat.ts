export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface IChatMessage extends ChatMessage {
  id: number;
  timestamp: number;
}
