import { Link } from "react-router-dom";
import { ArrowLeft, SendHorizontal, SmilePlus } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import type { MessageType } from "@/types";
import { formateTime } from "@/utils";
import { useMessageHeader } from "./useMessageHeader";
import { useMessageInput } from "./useMessageInput";
import { useMessage } from "./useMessage";
import { useAuth } from "@/auth/useAuth";

function MessageHeader() {
  const { data } = useMessageHeader();
  const user = data?.user;

  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 bg-base-200">
      <Link to="/c" className="sm:hidden">
        <button className="btn btn-ghost btn-circle btn-sm">
          <ArrowLeft size={25} />
        </button>
      </Link>
      <div className="flex items-center gap-2">
        <div
          className={`avatar avatar-placeholder ${
            user?.isOnline && "avatar-online"
          }`}
        >
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span>{user?.name?.[0]}</span>
            )}
          </div>
        </div>
        <div>
          <h3>{user?.name}</h3>
          <p className={`text-xs ${user?.isOnline ? "text-primary" : ""}`}>
            {user?.isOnline
              ? "Online"
              : formateTime(user?.lastSeen, { mode: "datetime" })}
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageInput() {
  const { handleSubmit, onChange } = useMessageInput();

  return (
    <div className="w-full mx-auto px-3 py-2 border-t border-white/5 bg-base-200">
      <form
        className="sm:w-[90%] flex items-center gap-2 mx-auto "
        onSubmit={handleSubmit}
      >
        <label className="input input-bordered w-full rounded-full">
          <SmilePlus size={20} className="opacity-70" />
          <input
            type="text"
            placeholder="Type a message..."
            name="message"
            required
            onChange={onChange}
          />
        </label>
        <button className="btn btn-primary rounded-full">
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
}

function TimeLine({ time }: { time: string }) {
  return (
    <div className="w-full flex items-center justify-center mt-5">
      <div className="badge badge-ghost opacity-70 ">
        {formateTime(time, { mode: "date" })}
      </div>
    </div>
  );
}

function MessageLeft({ content, createdAt }: MessageType) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-base-100 text-sm">{content}</div>
      <div className="chat-footer opacity-50 mt-1 text-xs">
        {formateTime(createdAt, { mode: "time" })}
      </div>
    </div>
  );
}

function MessageRight({ content, createdAt }: MessageType) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-primary text-sm text-base-300">
        {content}
      </div>
      <div className="chat-footer opacity-50 mt-1 text-xs">
        {formateTime(createdAt, { mode: "time" })}
      </div>
    </div>
  );
}

function MessageList() {
  const { user } = useAuth();
  const { messages, isPending, isTyping } = useMessage();
  let lastRenderedTime = "";
  if (isPending) return null;

  return (
    <div className="w-full h-[calc(100vh-114px)] px-3 py-10 overflow-y-scroll bg-base-300">
      <div className="w-full sm:w-[90%] flex flex-col gap-2 mx-auto">
        {messages.map((message: MessageType) => {
          const messageTime = formateTime(message.createdAt, { mode: "date" });
          const shouldRenderTimeLine = messageTime !== lastRenderedTime;
          if (shouldRenderTimeLine) {
            lastRenderedTime = messageTime;
          }

          return (
            <Fragment key={message._id}>
              {shouldRenderTimeLine && <TimeLine time={message.createdAt} />}
              {user?._id == message.sender ? (
                <MessageRight {...message} />
              ) : (
                <MessageLeft {...message} />
              )}
            </Fragment>
          );
        })}

        {isTyping && (
          <div className="pl-5">
            <div className="loading loading-dots"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MessageWindow() {
  return (
    <>
      {/* Message Header */}
      <MessageHeader />

      {/* Messages */}
      <MessageList />

      {/* Message Input */}
      <MessageInput />
    </>
  );
}
