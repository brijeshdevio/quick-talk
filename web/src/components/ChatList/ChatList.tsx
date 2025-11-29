import { formateTime } from "@/utils";
import type { ChatItemProps } from "@/types";
import { Link, NavLink } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { socket } from "@/lib/socket";
import { toast } from "sonner";
import { useLocalStore } from "@/hooks/useLocalStore";
import { useChat } from "@/hooks/useChat";

function Profile() {
  const { setIsContactModal } = useLocalStore();

  const handleOpenContactModal = () => setIsContactModal(true);

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
      <Link to="/" className="">
        <span className="logo text-2xl ml-2 text-primary">QuickTalk</span>
      </Link>
      <button
        className="ml-auto btn btn-sm btn-circle btn-ghost"
        onClick={handleOpenContactModal}
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
      <label className="input input-bordered w-full">
        <Search className="opacity-60" />
        <input type="text" placeholder="Search chats..." />
      </label>
    </div>
  );
}

function ChatItem({
  _id,
  member,
  lastMessage,
  onClick = () => {},
}: ChatItemProps & { onClick: (id: string) => void }) {
  return (
    <NavLink
      to={`/c/${_id}/${member._id}`}
      onClick={() => onClick(_id)}
      className={({ isActive }) => {
        return isActive ? "block bg-primary/40" : "block hover:bg-primary/40";
      }}
    >
      <div className="flex gap-3 px-3 py-2">
        <div
          className={`avatar avatar-placeholder ${
            member.isOnline && "avatar-online"
          }`}
        >
          <div className="bg-neutral text-neutral-content w-10 rounded-full ">
            {member.avatar ? (
              <img src={member.avatar} alt="" />
            ) : (
              <span>{member.name?.[0]}</span>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base">{member.name}</h3>
            {member.isOnline ? (
              <p className="text-xs text-primary">Online</p>
            ) : (
              <p className="text-xs">
                {member.lastSeen &&
                  formateTime(member.lastSeen, { mode: "date" })}
              </p>
            )}
          </div>
          <p className="text-sm opacity-70 line-clamp-1">
            {lastMessage?.content}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export function ChatList() {
  const { getChatsQuery } = useChat();

  const handleClick = (id: string) => {
    if (id)
      socket.emit("join_room", id, ({ status }: { status: string }) =>
        toast.success(status)
      );
  };

  return (
    <aside className="min-w-80 h-screen bg-base-100  border-r border-white/5">
      <Profile />
      <SearchBar />
      <div className="h-[calc(100vh-50px-57px)] overflow-y-scroll">
        {getChatsQuery.data?.chats?.map((chat: ChatItemProps) => (
          <ChatItem onClick={handleClick} key={chat._id} {...chat} />
        ))}
      </div>
    </aside>
  );
}
