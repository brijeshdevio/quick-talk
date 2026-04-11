import { Search, MessageSquare, Hash, Users, Settings, Loader2 } from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

type Participant = { _id: string; username: string; avatar?: string; isOnline?: boolean };
type ChatMessage = { _id: string; content: string };
type Chat = {
  _id: string;
  name?: string;
  isGroupChat: boolean;
  participants: Participant[];
  lastMessage?: ChatMessage;
  avatar?: string;
};

// Utilities
const getChatName = (chat: Chat, currentUserId?: string) => {
  if (chat.isGroupChat) return chat.name || "Group Chat";
  const other = chat.participants.find(p => p._id !== currentUserId);
  return other?.username || "Unknown User";
};

const getChatInitials = (name: string) => {
  return name.slice(0, 2).toUpperCase();
};

const isChatOnline = (chat: Chat, currentUserId?: string) => {
  if (chat.isGroupChat) return false;
  const other = chat.participants.find(p => p._id !== currentUserId);
  return !!other?.isOnline;
};

export function ChatLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Current user
  const authResponse = queryClient.getQueryData<any>(["auth-user"]);
  const currentUserId = authResponse?.data?._id;

  // Recent chats
  const { data: chatsResponse, isLoading: isLoadingChats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await api.get("/chats");
      return res.data;
    },
    enabled: !!currentUserId && debouncedQuery.length === 0,
  });

  // Search users
  const { data: searchResponse, isLoading: isSearchLoading } = useQuery({
    queryKey: ["search-users", debouncedQuery],
    queryFn: async () => {
      const res = await api.get(`/users/search?q=${debouncedQuery}`);
      return res.data;
    },
    enabled: debouncedQuery.length > 0 && !!currentUserId,
  });

  // Create or navigate to chat
  const { mutate: startChat, isPending: isStartingChat } = useMutation({
    mutationFn: async (targetUserId: string) => {
      const res = await api.post("/chats", { targetUserId });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      setSearchQuery("");
      setDebouncedQuery("");
      navigate(`/chat/${data.data._id}`);
    }
  });

  const chats: Chat[] = chatsResponse?.data || [];
  const searchedUsers: Participant[] = searchResponse?.data?.users || [];
  const isSearching = debouncedQuery.length > 0;

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
          <div className="flex items-center gap-3 bg-surface h-10 px-4 rounded-[0.5rem] focus-within:ring-1 focus-within:ring-primary-brand/30 transition-shadow">
            <Search className="w-4 h-4 text-tertiary-brand shrink-0" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-primary-brand placeholder:text-tertiary-brand/70"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3 mb-8">
          <button onClick={() => { setSearchQuery(""); setDebouncedQuery(""); }} className="flex items-center gap-4 px-4 h-11 hover:bg-surface-container-low/50 rounded-lg font-bold text-sm text-primary-brand text-left cursor-pointer transition-colors">
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

        {/* Dynamic List */}
        <div className="flex-1 overflow-y-auto px-3 pb-6 flex flex-col gap-1 relative">
          <h2 className="text-[10px] font-bold tracking-widest text-tertiary-brand/70 uppercase px-4 mb-2">
            {isSearching ? "Search Results" : "Recent"}
          </h2>
          
          {(isLoadingChats || isSearchLoading) && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-5 h-5 text-tertiary-brand animate-spin" />
            </div>
          )}
          
          {isStartingChat && (
            <div className="absolute inset-0 bg-surface-container-lowest/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
               <Loader2 className="w-6 h-6 text-primary-brand animate-spin" />
            </div>
          )}

          {!isSearchLoading && isSearching && searchedUsers.length === 0 && (
             <div className="text-center px-4 py-8">
               <p className="text-xs text-tertiary-brand font-medium">No users found.</p>
             </div>
          )}

          {/* Search Result Users */}
          {!isSearchLoading && isSearching && searchedUsers.map((user) => (
             <button 
               key={user._id} 
               onClick={() => startChat(user._id)}
               className="flex items-center gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer hover:bg-surface-container-low/50 w-full"
             >
               <div className="relative shrink-0">
                 <div className="w-10 h-10 rounded-md bg-primary-brand/10 text-primary-brand flex items-center justify-center font-bold text-xs uppercase">
                    {getChatInitials(user.username)}
                 </div>
                 {user.isOnline && (
                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4ade80] border-2 border-surface-container-low rounded-full"></div>
                 )}
               </div>
               <div className="flex flex-col min-w-0">
                 <span className="text-sm font-semibold text-primary-brand/80 truncate">
                   {user.username}
                 </span>
                 <span className="text-[10px] truncate text-tertiary-brand mt-0.5">
                   Click to chat
                 </span>
               </div>
             </button>
          ))}

          {!isLoadingChats && !isSearching && chats.length === 0 && (
            <div className="text-center px-4 py-8">
              <p className="text-xs text-tertiary-brand font-medium">No recent conversations.</p>
            </div>
          )}

          {/* Recent Chats */}
          {!isLoadingChats && !isSearching && chats.map((chat) => {
            const chatName = getChatName(chat, currentUserId);
            const initials = getChatInitials(chatName);
            const isOnline = isChatOnline(chat, currentUserId);
            
            return (
              <Link 
                key={chat._id} 
                to={`/chat/${chat._id}`}
                className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${currentPath === `/chat/${chat._id}` ? 'bg-surface-container-high' : 'hover:bg-surface-container-low/50'}`}
              >
                {/* Avatar Mock */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-md bg-secondary-brand flex items-center justify-center text-white font-bold text-xs uppercase">
                     {initials}
                  </div>
                  {isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4ade80] border-2 border-surface-container-low rounded-full"></div>
                  )}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm truncate ${currentPath === `/chat/${chat._id}` ? 'font-bold text-primary-brand' : 'font-semibold text-primary-brand/80'}`}>
                    {chatName}
                  </span>
                  <span className="text-xs truncate text-tertiary-brand">
                    {chat.lastMessage?.content || "No messages yet"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        <Outlet />
      </div>
    </div>
  );
}
