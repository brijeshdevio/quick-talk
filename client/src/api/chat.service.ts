import { http } from "./http";

export const ChatService = {
  create: async (formData: { member: string }) =>
    (await http.post("/chats", formData)).data,

  getChats: async () => (await http.get("/chats")).data,
};
