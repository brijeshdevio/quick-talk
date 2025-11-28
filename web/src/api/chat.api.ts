import type { CreateChatType } from "@/types";
import { axiosClient } from "./axiosClient";

export const createChat = async (data: CreateChatType) =>
  (await axiosClient.post("/chats", data)).data;

export const getChats = async () => (await axiosClient.get("/chats")).data;
