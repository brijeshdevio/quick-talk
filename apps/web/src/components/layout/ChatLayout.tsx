import { Search, MessageSquare, Hash, Users, Settings } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

const RECENT_CHATS = [
  { id: 1, name: "Julian Vane", msg: "The layout looks incredible...", online: true },
  { id: 2, name: "Elena Rossi", msg: "Are we still meeting at 5?", online: false },
  { id: 3, name: "Marcus Thorne", msg: "Sent the final sketches.", online: true },
];

export function ChatLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-screen bg-surface-container-low text-primary-brand font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col h-full bg-surface-container-lowest shadow-[10px_0_40px_-20px_rgba(45,52,53,0.05)] z-10 shrink-0 border-r border-surface-container-low">
        
        {/* Branding */}
        <div className="p-6 pb-4">
          <h1 className="text-xl font-bold tracking-tight">The Silent Architect</h1>
          <p className="text-xs text-tertiary-brand mt-1">Editorial Chat</p>
        </div>

        {/* Search */}
        <div className="px-5 mb-6">
          <div className="flex items-center gap-3 bg-surface h-10 px-4 rounded-[0.5rem]">
            <Search className="w-4 h-4 text-tertiary-brand" />
            <input 
              type="text" 
              placeholder="Search conversations" 
              className="bg-transparent border-none outline-none text-xs w-full text-primary-brand placeholder:text-tertiary-brand/70"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3 mb-8">
          <button className="flex items-center gap-4 px-4 h-11 bg-surface-container-low rounded-lg font-bold text-sm text-primary-brand text-left cursor-pointer">
            <MessageSquare className="w-5 h-5" />
            Messages
          </button>
          <button className="flex items-center gap-4 px-4 h-11 hover:bg-surface-container-low/50 rounded-lg font-medium text-sm text-tertiary-brand transition-colors text-left cursor-pointer">
            <Hash className="w-5 h-5" />
            Channels
          </button>
          <button className="flex items-center gap-4 px-4 h-11 hover:bg-surface-container-low/50 rounded-lg font-medium text-sm text-tertiary-brand transition-colors text-left cursor-pointer">
            <Users className="w-5 h-5" />
            Contacts
          </button>
          <button className="flex items-center gap-4 px-4 h-11 hover:bg-surface-container-low/50 rounded-lg font-medium text-sm text-tertiary-brand transition-colors text-left cursor-pointer">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        {/* Recent List */}
        <div className="flex-1 overflow-y-auto px-3 pb-6 flex flex-col gap-1">
          <h2 className="text-[10px] font-bold tracking-widest text-tertiary-brand/70 uppercase px-4 mb-2">Recent</h2>
          
          {RECENT_CHATS.map((chat) => (
            <Link 
              key={chat.id} 
              to={`/chat/${chat.id}`}
              className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${currentPath === `/chat/${chat.id}` ? 'bg-surface-container-high' : 'hover:bg-surface-container-low/50'}`}
            >
              {/* Avatar Mock */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-md bg-secondary-brand flex items-center justify-center text-white font-bold text-xs">
                   <div className="w-5 h-5 bg-tertiary-brand/50 rounded-full mt-1"></div>
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4ade80] border-2 border-surface-container-low rounded-full"></div>
                )}
              </div>
              
              <div className="flex flex-col min-w-0">
                <span className={`text-sm truncate ${currentPath === `/chat/${chat.id}` ? 'font-bold text-primary-brand' : 'font-semibold text-primary-brand/80'}`}>
                  {chat.name}
                </span>
                <span className="text-xs truncate text-tertiary-brand">
                  {chat.msg}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        <Outlet />
      </div>
    </div>
  );
}
