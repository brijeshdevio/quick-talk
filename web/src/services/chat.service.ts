import { axiosClient } from "./axiosClient";

export const getChats = async () => (await axiosClient.get("/chats")).data;

export const getMessages = async (id: string) =>
  (await axiosClient.get(`/chats/${id}/messages`)).data;
