import { formateTime } from "@/utils";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import type { MessageProps } from "@/types";
import { useAuth } from "@/auth";
import { useMessage } from "@/hooks/useMessage";
import { useParams } from "react-router-dom";

function ReceiverMessage({ message, createdAt }: MessageProps) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-base-100">{message}</div>
      <div className="chat-footer opacity-50 mt-1 text-xs">
        Sent at {formateTime(createdAt, { mode: "time" })}
      </div>
    </div>
  );
}

function SenderMessage({ message, createdAt }: MessageProps) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-primary/50 text-white">{message}</div>
      <div className="chat-footer opacity-50 mt-1 text-xs">
        Sent at {formateTime(createdAt, { mode: "time" })}
      </div>
    </div>
  );
}

export function MessageList() {
  const { channelId } = useParams();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { messagesMutate } = useMessage();
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Receive message
  useSocket("receive_message", (data: MessageProps) => {
    setMessages((prev) => [...prev, data]);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Receive self messages
  useSocket("self_message", (data: MessageProps) => {
    setMessages((prev) => [...prev, data]);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  useEffect(() => {
    if (channelId) messagesMutate.mutate(channelId);
  }, [channelId]);

  useEffect(() => {
    if (messagesMutate.data) {
      (() => setMessages(() => messagesMutate.data?.messages))();

      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messagesMutate.data]);

  return (
    <div>
      {messages?.map((message) => (
        <Fragment key={message?._id}>
          {message?.sender == user?._id ? (
            <SenderMessage {...message} />
          ) : (
            <ReceiverMessage {...message} />
          )}
        </Fragment>
      ))}
      <div ref={scrollRef} className="mt-20"></div>
    </div>
  );
}
