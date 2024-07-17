import { defineStore } from "pinia";

interface ChatMessage {
  role: string;
  content: string;
}

export const useUserChat = defineStore("userChat", {
  state: () => {
    return {
      messages: [] as ChatMessage[]
    };
  },
  actions: {
    saveMessageInChat(message: ChatMessage) {
      this.messages.push(message);
    }
  }
});
