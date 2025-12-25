import { useMutation } from "@tanstack/react-query";
import { MessageService } from "@/api/message.service";
import { notifyError } from "@/utils";

export function useGetMessages() {
  return useMutation({
    mutationKey: ["getMessages"],
    mutationFn: MessageService.messages,
    onError: (error: unknown) => notifyError(error),
  });
}
