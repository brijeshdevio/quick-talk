import { messages } from "@/data";
import { formateTime } from "@/utils";
import type { MessageProps } from "@/types";

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
  return (
    <>
      {messages?.map((message) => (
        <>
          {message.senderId == "1" ? (
            <SenderMessage {...message} />
          ) : (
            <ReceiverMessage {...message} />
          )}
        </>
      ))}
    </>
  );
}
