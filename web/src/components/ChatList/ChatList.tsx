import { formateTime } from "@/utils";
import type { ChatItemProps } from "@/types";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { Plus, Search } from "lucide-react";
import { socket } from "@/lib/socket";
import { toast } from "sonner";

function Profile() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
      <Link to="/" className="">
        <span className="logo text-2xl ml-2 text-primary">QuickTalk</span>
      </Link>
      <button className="ml-auto btn btn-sm btn-circle btn-ghost">
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
  name,
  profileImage,
  lastMessage,
  lastSeen,
  isOnline,
  onClick = () => {},
}: ChatItemProps & { onClick: (id: string) => void }) {
  return (
    <NavLink
      to={`/c/${_id}`}
      className={() => `hover:bg-primary/50 bg-blue-100`}
      onClick={() => onClick(_id)}
    >
      <div className="group flex gap-3 px-3 py-2 cursor-pointer">
        <div
          className={`avatar avatar-placeholder ${isOnline && "avatar-online"}`}
        >
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            {profileImage ? (
              <img src={profileImage} alt="" />
            ) : (
              <span>{name?.[0]}</span>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base">{name}</h3>
            {isOnline ? (
              <p className="text-xs text-primary">Online</p>
            ) : (
              <p className="text-xs">
                {lastSeen && formateTime(lastSeen, { mode: "date" })}
              </p>
            )}
          </div>
          <p className="text-sm opacity-70 line-clamp-1">{lastMessage}</p>
        </div>
      </div>
    </NavLink>
  );
}

export function ChatList() {
  const { getUsersQuery } = useUser();

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
        {getUsersQuery.data?.users?.map((chat: ChatItemProps) => (
          <ChatItem onClick={handleClick} key={chat._id} {...chat} />
        ))}
      </div>
    </aside>
  );
}
