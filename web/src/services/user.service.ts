import { axiosClient } from "./axiosClient";

export const getProfile = async () =>
  (await axiosClient.get("/users/profile")).data;

export const getMember = async (id: string) =>
  (await axiosClient.get(`/users/${id}`)).data;
