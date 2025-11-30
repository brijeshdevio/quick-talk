import { NavLink, useParams } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { formateTime } from "@/utils";
import { userProfile } from "@/data";
import { useChat } from "./useChat";
import type { ChatItemType } from "@/types";

function ChatHeader() {
  return (
    <div className="w-full flex items-center gap-2 px-3 py-2 border-b border-white/10">
      <div className="avatar avatar-online avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-10 rounded-full">
          {userProfile.image ? (
            <img src={userProfile.image} alt={userProfile.name} />
          ) : (
            <span className="text-sm">AI</span>
          )}
        </div>
      </div>
      <h2 className="text-xl">Chats</h2>
      <div className="ml-auto">
        <button className="btn btn-ghost btn-circle btn-sm">
          <Plus size={25} />
        </button>
      </div>
    </div>
  );
}

function ChatSearchbar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
      <label className="input input-bordered w-full">
        <Search className="opacity-60" />
        <input type="text" placeholder="Search chats..." />
      </label>
    </div>
  );
}

function ChatItem({ _id, member, lastMessage }: ChatItemType) {
  return (
    <NavLink
      to={`/c/${_id}/${member._id}`}
      className={({ isActive }) =>
        "hover:bg-base-100 active:bg-base-100 focus:bg-base-100 block " +
        (isActive ? "bg-base-100 border-l-2 border-primary" : "")
      }
    >
      <div className="flex gap-3 px-3 py-2.5" key={_id}>
        <div
          className={`avatar avatar-placeholder ${
            member.isOnline && "avatar-online"
          }`}
        >
          <div className="bg-neutral text-neutral-content w-10 rounded-full ">
            {member?.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 min-h-10"
              />
            ) : (
              <span>{member?.name?.[0]}</span>
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

function ChatList() {
  const { data } = useChat();
  const chats = data?.chats || [];

  return (
    <div className="h-[calc(100vh-115px)] overflow-y-auto">
      {chats?.map((chat: ChatItemType) => (
        <ChatItem key={chat._id} {...chat} />
      ))}
    </div>
  );
}

export function ChatSidebar() {
  const { chatID } = useParams();

  return (
    <aside
      className={`min-w-[360px] bg-base-200 border-r border-white/10 ${
        chatID && "hidden sm:block"
      }`}
    >
      {/* Header */}
      <ChatHeader />

      {/* Searchbar */}
      <ChatSearchbar />

      {/* Chat List */}
      <ChatList />
    </aside>
  );
}
