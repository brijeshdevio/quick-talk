import type { LoginForm, SignupForm } from "@/types";
import { http } from "./http";

export const AuthService = {
  signup: async (formData: SignupForm) =>
    (await http.post("/auth/register", formData)).data,

  login: async (formData: LoginForm) =>
    (await http.post("/auth/login", formData)).data,

  logout: async () => (await http.post("/auth/logout")).data,
};
