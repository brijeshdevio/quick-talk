import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MessageSquareText, Search, Slack } from "lucide-react";
import { chats } from "@/data";
import { formateTime } from "@/utils";

type Member = {
  _id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
};

interface ChatProps {
  _id: string;
  member: Member[];
  lastMessage: {
    _id: string;
    content: string;
  };
  onClick?: (id: string) => void;
}

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2 px-4">
      <div className="p-2 flex items-center justify-center bg-primary/10 rounded-xl">
        <Slack className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-bold leading-5">QuickTalk</h2>
        <p className="text-xs opacity-70">Workspace</p>
      </div>
    </div>
  );
}

function UserSearch() {
  return (
    <div className="px-3">
      <form>
        <label className="input">
          <Search size={20} />
          <input type="search" placeholder="Search for people..." />
        </label>
      </form>
    </div>
  );
}

function ConversationEmptyState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-fit flex items-center justify-center mx-auto p-2 opacity-40 bg-primary/5 rounded-2xl">
          <MessageSquareText className="w-8 h-8" />
        </div>
        <h3 className="text-lg">No conversations</h3>
        <p className="text-sm opacity-70">
          Search a user above to start chatting
        </p>
      </div>
    </div>
  );
}

function Chat({ _id, member, lastMessage, onClick = () => {} }: ChatProps) {
  const user = member[0];

  return (
    <NavLink
      to={`/c/${_id}`}
      onClick={() => onClick(_id)}
      className={({ isActive }) => {
        return isActive ? "block bg-primary/40" : "block hover:bg-primary/40";
      }}
    >
      <div className="flex gap-3 px-3 py-2">
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
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base">{user?.name}</h3>
            {user?.isOnline ? (
              <p className="text-xs text-success">Online</p>
            ) : (
              <p className="text-xs">
                {user?.lastSeen &&
                  formateTime(user?.lastSeen, { mode: "date" })}
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
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col px-2">
        {chats?.map((chat) => (
          <Chat key={chat._id} {...chat} />
        ))}

        {chats?.map((chat) => (
          <Chat key={chat._id} {...chat} />
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const [hasChats] = useState(true);

  return (
    <aside className="min-w-80 h-screen flex flex-col gap-4 py-5 border-r border-primary/10 bg-base-100">
      <SidebarHeader />
      <UserSearch />
      {hasChats ? <ChatList /> : <ConversationEmptyState />}
    </aside>
  );
}
