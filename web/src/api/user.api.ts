import { axiosClient } from "./axiosClient";

export const getProfile = async () =>
  (await axiosClient.get("/users/profile")).data;
