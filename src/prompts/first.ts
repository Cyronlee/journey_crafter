import { ChatMessage } from '@/types/chat';

export const promptMessage: ChatMessage = {
  role: "assistant",
  content: `我会给你一个需求，你需要：
1.分析和完善需求，但是不需要返回结果给我。
2.使用 Mermaid 绘制用户旅程图，但是不需要返回给我。
3.最后，只返回 Mermaid 代码，请按照以下格式，其中用户心情为数字1-5：

journey
header
  personal:{}
  scenario:{}
  goals:{}

stage {string}
  action: {string}
  touchpoint:{string}
  emotion:{1-3}

stage {string}
  action: {string}
  touchpoint:{string}
  emotion:{1-3}

  action: {string}
  touchpoint:{string}
  emotion:{1-3}`,
};
