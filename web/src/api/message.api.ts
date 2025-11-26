import { axiosClient } from "./axiosClient";

export const getMessages = async (receiver: string) =>
  (await axiosClient.get(`/messages/${receiver}`)).data;
