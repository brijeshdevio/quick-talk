import { MessageSquareText, Search, Slack } from "lucide-react";

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

export function Sidebar() {
  return (
    <aside className="min-w-80 h-screen flex flex-col gap-4 py-5 border-r border-primary/10 bg-base-100">
      <SidebarHeader />
      <UserSearch />
      <ConversationEmptyState />
    </aside>
  );
}
