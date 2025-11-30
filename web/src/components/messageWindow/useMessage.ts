import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WS_EVENTS, WS_LISTENERS } from "@/constants";
import { useListener } from "@/hooks/useListener";
import type { MessageType } from "@/types";
import { getMessages } from "@/services/chat.service";

export function useMessage() {
  const { chatID } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesQuery = useQuery({
    queryKey: ["messages", chatID],
    queryFn: async () => await getMessages(chatID!),
  });

  useListener(WS_LISTENERS.MSG_DELIVERED, (msg: MessageType) => {
    setMessages((prev) => [...prev, msg]);
  });

  useListener(WS_EVENTS.MSG_TYPING, (payload: { isActive: boolean }) => {
    if (payload.isActive != isTyping) {
      setIsTyping(payload.isActive);
    }
  });

  useEffect(() => {
    (() => setMessages(messagesQuery.data?.messages || []))();
  }, [messagesQuery.isPending, messagesQuery.data?.messages]);

  return { messages, ...messagesQuery, isTyping };
}
