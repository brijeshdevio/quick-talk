import { formateTime } from "@/utils";
import { Fragment, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import type { MessageProps } from "@/types";
import { useAuth } from "@/auth";

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
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { user } = useAuth();

  // Receive message
  useSocket("receive_message", (data: MessageProps) => {
    setMessages((prev) => [...prev, data]);
  });

  // Receive self messages
  useSocket("self_message", (data: MessageProps) => {
    setMessages((prev) => [...prev, data]);
  });

  return (
    <>
      {messages?.map((message) => (
        <Fragment key={message?._id}>
          {message?.sender == user?._id ? (
            <SenderMessage {...message} />
          ) : (
            <ReceiverMessage {...message} />
          )}
        </Fragment>
      ))}
    </>
  );
}
