import { axiosClient } from "./axiosClient";

export const getMessages = async (chatId: string) =>
  (await axiosClient.get(`/chats/${chatId}/messages`)).data;
