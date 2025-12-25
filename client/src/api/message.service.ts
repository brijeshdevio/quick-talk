import { http } from "./http";

export const MessageService = {
  messages: async (conversationId: string) =>
    (await http.get(`/chats/${conversationId}/messages`)).data,
};
