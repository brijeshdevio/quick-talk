import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "@/api/user.service";
import { notifyError } from "@/utils";

export function useGetUsers() {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: UserService.users,
    enabled: false,
  });
}

export function useGetUser() {
  return useMutation({
    mutationKey: ["getUser"],
    mutationFn: (conversationId: string) => UserService.user(conversationId),
    onError: (error: unknown) => notifyError(error),
  });
}
