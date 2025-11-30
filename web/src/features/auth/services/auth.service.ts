import { axiosClient } from "@/services/axiosClient";
import type { LoginType, RegisterType } from "@/types";

export const register = async (data: RegisterType) =>
  (await axiosClient.post("/auth/register", data)).data;

export const login = async (data: LoginType) =>
  (await axiosClient.post("/auth/login", data)).data;
