import { useMutation, useQuery } from "@tanstack/react-query";
import { createChat, getChats } from "@/api/chat.api";
import type { CreateChatType } from "@/types";
import { errorHandler } from "./utils";

export function useChat() {
  const createChatMutate = useMutation({
    mutationKey: ["chats"],
    mutationFn: async (data: CreateChatType) => await createChat(data),
    onError: errorHandler,
  });

  const getChatsQuery = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(),
  });

  return { createChatMutate, getChatsQuery };
}
