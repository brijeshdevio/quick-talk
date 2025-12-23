import { http } from "./http";

export const UserService = {
  profile: async () => (await http.get("/users/profile")).data,

  users: async () => (await http.get("/users")).data,

  user: async (chatId: string) => (await http.get(`/users/${chatId}`)).data,
};
