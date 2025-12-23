import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { ChatService } from "@/api/chat.service";
import { notifyError, notifySuccess } from "@/utils";

export function useCreateChat() {
  const { refetch } = useGetChats();
  return useMutation({
    mutationKey: ["createChat"],
    mutationFn: ChatService.create,
    onSuccess: (data: AxiosResponse["data"]) => {
      notifySuccess(data.message);
      refetch();
    },
    onError: (error: unknown) => notifyError(error),
  });
}

export function useGetChats() {
  return useQuery({
    queryKey: ["getChats"],
    queryFn: ChatService.getChats,
    enabled: false,
  });
}
