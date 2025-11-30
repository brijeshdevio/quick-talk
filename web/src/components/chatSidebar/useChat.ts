import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/services/chat.service";
import { useListener } from "@/hooks/useListener";
import { WS_LISTENERS } from "@/constants";
import type { ChatItemType } from "@/types";

export const useChat = () => {
  const chatQuery = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(),
  });

  useListener(WS_LISTENERS.USER_ONLINE, (mID: string) => {
    const chats = chatQuery.data?.chats || [];
    const findChat = chats?.find(
      (c: ChatItemType) => c.member._id == mID
    ) as unknown as ChatItemType;

    if (findChat && findChat.member._id == mID) {
      // chatQuery.refetch();
    }
  });

  useListener(WS_LISTENERS.USER_OFFLINE, (mID: string) => {
    const chats = chatQuery.data?.chats || [];
    const findChat = chats?.find(
      (c: ChatItemType) => c.member._id == mID
    ) as unknown as ChatItemType;

    if (findChat && findChat.member._id == mID) {
      // chatQuery.refetch();
    }
  });

  return chatQuery;
};
