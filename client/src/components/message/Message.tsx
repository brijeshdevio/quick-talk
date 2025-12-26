import { useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState, type ChangeEvent } from "react";
import { Check, CheckCheck, SendHorizontal, SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { formateTime } from "@/utils";
import { useGetUser } from "@/queries/user.queries";
import { socket } from "@/api/socket.service";
import { WS_EVENTS, WS_LISTENERS } from "@/constants";
// import { messages } from "@/data";
import { useGetMessages } from "@/queries/message.queries";
import { useAuth } from "@/app/providers/AuthProvider";

let isMemberOnline = false;

function memberOnline(isOnline: boolean) {
  isMemberOnline = isOnline;
}

interface MessageBubbleProps {
  _id: string;
  sender: string;
  content: string;
  updatedAt: string;
  isDelivered: boolean;
}

interface UserProfileProps {
  _id: string;
  name: string;
  lastSeen: string;
  isOnline: boolean;
  avatar: string;
}

function UserProfile({ user }: { user: UserProfileProps }) {
  useEffect(() => {
    memberOnline(user.isOnline);
  }, [user]);

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
    if (conversationId) {
      mutate(conversationId);
      socket.emit(WS_EVENTS.ROOM_JOIN, { chatID: conversationId });
    }
  }, [mutate, conversationId]);

  useEffect(() => {
    socket.on(WS_LISTENERS.USER_ONLINE, (memberId: string) => {
      if (conversationId && data?.user?._id == memberId) {
        mutate(conversationId);
      }
    });

    socket.on(WS_LISTENERS.USER_OFFLINE, (memberId) => {
      if (conversationId && data?.user?._id == memberId) {
        mutate(conversationId);
      }
    });

    return () => {
      socket.off(WS_LISTENERS.USER_ONLINE);
      socket.off(WS_LISTENERS.USER_OFFLINE);
    };
  }, [mutate, conversationId, data]);

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

function ReceiverMessageBubble({ content, updatedAt }: MessageBubbleProps) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-base-100">{content}</div>
      <div className="chat-footer opacity-70 mt-1 text-xs">
        {formateTime(updatedAt, { mode: "time" })}
      </div>
    </div>
  );
}

function SenderMessageBubble({
  content,
  updatedAt,
  isDelivered,
}: MessageBubbleProps) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-primary/50 text-white">{content}</div>
      <div className="chat-footer opacity-70 mt-1 text-xs">
        {formateTime(updatedAt, { mode: "time" })}
        {isDelivered ? <CheckCheck size={15} /> : <Check size={15} />}
      </div>
    </div>
  );
}

function MessageList() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState({
    isActive: false,
    sender: "",
  });
  const { user } = useAuth();
  const { data, mutate } = useGetMessages();

  useEffect(() => {
    const handleMessage = (message: MessageBubbleProps) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on(WS_EVENTS.MSG_TYPING, ({ isActive, sender }) => {
      setTyping({ isActive, sender });
    });

    socket.on(WS_LISTENERS.MSG_DELIVERED, handleMessage);

    return () => {
      socket.off(WS_LISTENERS.MSG_DELIVERED, handleMessage);
      socket.off(WS_LISTENERS.USER_OFFLINE);
    };
  }, []);

  useEffect(() => {
    if (data?.messages) {
      (() => setMessages(data.messages))();
    }
  }, [data]);

  useEffect(() => {
    if (conversationId) {
      mutate(conversationId);
    }
  }, [conversationId, mutate]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {}, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="h-[calc(100vh-115px)] py-10 overflow-y-scroll"
      >
        <div className="w-[90%] flex flex-col gap-3 mx-auto">
          {/* Messages */}
          {messages.map((message) => (
            <Fragment key={message?._id}>
              {message?.sender == user?._id ? (
                <SenderMessageBubble {...message} />
              ) : (
                <ReceiverMessageBubble {...message} />
              )}
            </Fragment>
          ))}

          {/* Typing Indicator */}
          {typing.isActive && user?._id !== typing.sender && (
            <div className="pl-5">
              <div className="loading loading-dots"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function MessageComposer() {
  const { conversationId } = useParams();
  const [input, setInput] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const debounceRef = useRef(false);
  const { user } = useAuth();

  function handleTyping(isActive: boolean = false) {
    socket.emit(WS_EVENTS.MSG_TYPING, {
      isActive: isActive,
      sender: user?._id,
      chatID: conversationId,
    });
  }

  const debounce = () => {
    if (!debounceRef.current) {
      debounceRef.current = true;
      handleTyping(true);
      setTimeout(() => {
        handleTyping();
        debounceRef.current = false;
      }, 3000);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(WS_EVENTS.MSG_SEND, {
      content: input,
      chatID: conversationId,
      isMemberOnline,
    });
    e.currentTarget.reset();
    setInput("");
    toggleEmojiPicker(false);
    handleTyping();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debounce();
  };

  function toggleEmojiPicker(state: boolean) {
    if (!state) {
      setIsEmojiPickerOpen(state);
    } else {
      setIsEmojiPickerOpen((prev) => !prev);
    }
  }

  function onReactionClick({ emoji }: { emoji: string }) {
    setInput((prev) => prev + emoji);
  }

  return (
    <>
      <div className="px-4 py-2 bg-base-100 border-t border-primary/10">
        <div className="relative w-[90%] flex items-center mx-auto">
          <div
            className={`absolute bottom-16 left-2 ${
              isEmojiPickerOpen ? "block" : "hidden"
            }`}
          >
            <EmojiPicker
              onEmojiClick={onReactionClick}
              className="max-h-[300px] min-h-[300px] md:w-auto"
            />
          </div>
          <form
            className="w-full flex items-center gap-2"
            onSubmit={handleSendMessage}
          >
            <label className="input input-bordered w-full">
              <SmilePlus
                className="text-xl opacity-50 group-hover:opacity-100 cursor-pointer"
                onClick={() => toggleEmojiPicker(true)}
              />
              <input
                type="hidden"
                defaultValue={conversationId}
                name="chatID"
              />
              <input
                type="text"
                placeholder="Type a message..."
                name="content"
                value={input}
                onChange={handleChange}
                required
              />
            </label>
            <button className="btn btn-primary" type="submit" disabled={!input}>
              <SendHorizontal size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export function Message() {
  const [hasMessage] = useState(true);

  return (
    <>
      <MessageHeader />
      {!hasMessage && <MessageEmptyState />}
      {hasMessage && <MessageList />}
      <MessageComposer />
    </>
  );
}
