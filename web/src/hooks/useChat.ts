import { useMutation } from "@tanstack/react-query";
import { createChat } from "@/api/chat.api";
import type { CreateChatType } from "@/types";
import { errorHandler } from "./utils";

export function useChat() {
  const createChatMutate = useMutation({
    mutationKey: ["chats"],
    mutationFn: async (data: CreateChatType) => await createChat(data),
    onError: errorHandler,
  });

  return { createChatMutate };
}
