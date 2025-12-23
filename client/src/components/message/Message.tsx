import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { messages } from "@/data";
import { formateTime } from "@/utils";
import { useGetUser } from "@/queries/user.queries";

interface MessageBubbleProps {
  content: string;
  createdAt: string;
}

interface UserProfileProps {
  _id: string;
  name: string;
  lastSeen: string;
  isOnline: boolean;
  avatar: string;
}

function UserProfile({ user }: { user: UserProfileProps }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`avatar avatar-placeholder ${
          user?.isOnline && "avatar-online"
        }`}
      >
        <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full ">
          {user?.avatar ? (
            <img src={user?.avatar} alt="" />
          ) : (
            <span>{user?.name?.[0]}</span>
          )}
        </div>
      </div>
      <div>
        <h3>{user.name}</h3>
        <p className={` leading-4 text-xs ${user.isOnline && "text-success"}`}>
          {user.isOnline
            ? "Online"
            : formateTime(user.lastSeen, { mode: "datetime" })}
        </p>
      </div>
    </div>
  );
}

function MessageHeader() {
  const { conversationId } = useParams();
  const { mutate, data, isPending } = useGetUser();

  useEffect(() => {
    if (conversationId) mutate(conversationId!);
  }, [mutate, conversationId]);

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-base-100 border-b border-primary/10">
      {!isPending && data?.user && <UserProfile user={data.user} />}
    </div>
  );
}

function MessageEmptyState() {
  return (
    <div className="h-[calc(100vh-115px)] flex items-center justify-center">
      <div className="max-w-[350px] flex flex-col gap-2 text-center">
        <h2 className="text-xl">No messages yet</h2>
        <p className="opacity-70">
          Be the first to break the ice! <br /> Say hello 👋 and start the
          conversation.
        </p>
        <div className="flex flex-wrap gap-2 mx-auto">
          <span className="badge">👋 Say hello</span>
          <span className="badge">Hi!</span>
        </div>
      </div>
    </div>
  );
}

function ReceiverMessageBubble({ content, createdAt }: MessageBubbleProps) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-base-100">{content}</div>
      <div className="chat-footer opacity-70 mt-1 text-xs">
        Delivered at {formateTime(createdAt, { mode: "time" })}
      </div>
    </div>
  );
}

function SenderMessageBubble({ content, createdAt }: MessageBubbleProps) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-primary/50 text-white">{content}</div>
      <div className="chat-footer opacity-70 mt-1 text-xs">
        Sent at {formateTime(createdAt, { mode: "time" })}
      </div>
    </div>
  );
}

function MessageList() {
  return (
    <div className="h-[calc(100vh-115px)] py-10 overflow-y-scroll">
      <div className="w-[90%] mx-auto">
        {messages.map((message) => (
          <Fragment key={message?._id}>
            {message?.senderId == "1" ? (
              <SenderMessageBubble {...message} />
            ) : (
              <ReceiverMessageBubble {...message} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function MessageComposer() {
  const [input, setInput] = useState("");

  return (
    <div className="px-4 py-2 bg-base-100 border-t border-primary/10">
      <div className="w-[90%] flex items-center mx-auto">
        <form className="w-full flex items-center gap-2">
          <label className="input input-bordered w-full">
            <input
              type="text"
              placeholder="Type a message..."
              name="message"
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={!input}>
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export function Message() {
  const [hasMessage] = useState(false);

  return (
    <>
      <MessageHeader />
      {!hasMessage && <MessageEmptyState />}
      {hasMessage && <MessageList />}
      <MessageComposer />
    </>
  );
}
