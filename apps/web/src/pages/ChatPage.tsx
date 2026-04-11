import { Video, Phone, MoreVertical, Send, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useMemo, useState, useEffect, useRef } from "react";
import { useChatSocket } from "../hooks/useChatSocket";

type Participant = { _id: string; username: string; avatar?: string; isOnline?: boolean; lastSeen?: string };
type ChatMessage = { _id: string; content: string; sender: Participant; createdAt: string };
type Chat = {
  _id: string;
  name?: string;
  isGroupChat: boolean;
  participants: Participant[];
  lastMessage?: ChatMessage;
  avatar?: string;
};

export function ChatPage() {
  const { id: chatId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auth Context
  const queryClient = useQueryClient();
  const authResponse = queryClient.getQueryData<any>(["auth-user"]);
  const currentUserId = authResponse?.data?._id;

  // Socket
  const { sendMessage, isConnected } = useChatSocket(chatId);

  // Chat Metadata 
  const { data: chatResponse, isLoading: isChatLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await api.get(`/chats/${chatId}`);
      return res.data;
    },
    enabled: !!chatId && !!currentUserId,
    refetchInterval: 10000, 
  });

  const chat: Chat | undefined = chatResponse?.data;

  // Messages Query
  const { 
    data: messagesResponse, 
    isLoading: isMessagesLoading, 
    fetchNextPage, 
    hasNextPage,
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ["messages", chatId],
    queryFn: async ({ pageParam = "" }) => {
      const res = await api.get(`/messages/${chatId}${pageParam ? `?cursor=${pageParam}` : ''}`);
      return res.data.data; // expects { messages, hasMore, nextCursor } inside data
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
    enabled: !!chatId && !!currentUserId,
  });

  // Automatically scroll to bottom exactly on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesResponse]);

  // Derived state
  const chatDetails = useMemo(() => {
    if (!chat || !currentUserId) return { name: "Loading...", initials: "", isOnline: false, statusText: "" };
    
    if (chat.isGroupChat) {
      const name = chat.name || "Group Chat";
      return {
        name,
        initials: name.slice(0, 2).toUpperCase(),
        isOnline: false,
        statusText: `${chat.participants.length} participants`,
      };
    }

    const other = chat.participants.find(p => p._id !== currentUserId);
    if (!other) return { name: "Unknown User", initials: "??", isOnline: false, statusText: "Offline" };

    let statusText = "Offline";
    if (other.isOnline) {
      statusText = "Online";
    } else if (other.lastSeen) {
      const date = new Date(other.lastSeen);
      statusText = `Last seen ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return {
      name: other.username,
      initials: other.username.slice(0, 2).toUpperCase(),
      isOnline: !!other.isOnline,
      statusText,
    };
  }, [chat, currentUserId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !isConnected) return;
    sendMessage(inputValue.trim());
    setInputValue("");
  };

  if (isChatLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 text-primary-brand animate-spin" />
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <p className="text-tertiary-brand text-sm">Select a conversation to start chatting.</p>
      </div>
    );
  }

  const allMessages = messagesResponse?.pages
    ? [...messagesResponse.pages].reverse().flatMap(page => page.messages)
    : [];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface">
      {/* Top Header */}
      <header className="h-20 flex items-center justify-between px-8 shrink-0 bg-surface/80 backdrop-blur-md z-10 border-b border-surface-container-high/50">
         <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-md bg-secondary-brand flex items-center justify-center text-white font-bold text-sm tracking-wider uppercase">
                 {chatDetails.initials}
              </div>
              {chatDetails.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#4ade80] border-2 border-surface rounded-full"></div>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-primary-brand">{chatDetails.name}</h2>
              <span className={`text-[10px] font-bold tracking-widest uppercase ${chatDetails.isOnline ? 'text-[#4ade80]' : 'text-tertiary-brand/80'}`}>
                {chatDetails.statusText}
              </span>
            </div>
         </div>

         <div className="flex items-center gap-5 text-tertiary-brand">
           <button className="hover:text-primary-brand transition-colors cursor-pointer"><Video className="w-5 h-5 fill-current" /></button>
           <button className="hover:text-primary-brand transition-colors cursor-pointer"><Phone className="w-5 h-5 fill-current rotate-90" /></button>
           <button className="hover:text-primary-brand transition-colors cursor-pointer"><MoreVertical className="w-5 h-5" /></button>
         </div>
      </header>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
        {hasNextPage && (
          <button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            className="self-center text-xs font-semibold tracking-widest text-tertiary-brand uppercase hover:text-primary-brand cursor-pointer"
          >
            {isFetchingNextPage ? "Loading..." : "Load Older"}
          </button>
        )}
        
        {isMessagesLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="w-5 h-5 text-tertiary-brand animate-spin" />
            </div>
        ) : allMessages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-tertiary-brand text-xs font-semibold">
              Say hi to start the conversation!
            </div>
        ) : (
          allMessages.map((msg: ChatMessage, index: number) => {
            const isMe = msg.sender?._id === currentUserId;
            const isNextSame = allMessages[index + 1]?.sender?._id === msg.sender?._id;
            
            return (
              <div 
                key={msg._id} 
                className={`flex flex-col max-w-2xl min-w-[20%] py-3 px-5 rounded-[0.5rem] shadow-sm ${!isMe ? 'bg-surface-container-high self-start text-primary-brand' : 'bg-primary-brand self-end text-white'}`}
                style={{
                  marginBottom: isNextSame ? '-0.5rem' : '0'
                }}
              >
                {!isMe && chat.isGroupChat && (
                    <span className="text-[10px] font-bold opacity-70 mb-1">{msg.sender?.username}</span>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <div className="flex items-center justify-end mt-1 gap-2 opacity-60">
                  <span className="text-[10px]">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8 pt-4 shrink-0 bg-surface">
         <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-3 bg-white h-14 pl-4 pr-2 rounded-[0.5rem] shadow-[0_10px_30px_-10px_rgba(45,52,53,0.08)] focus-within:ring-1 focus-within:ring-primary-brand/20 transition-all">
           <input 
             type="text" 
             name="message"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             disabled={!isConnected}
             placeholder={isConnected ? "Type your message..." : "Connecting..."} 
             className="flex-1 h-full bg-transparent border-none outline-none text-sm placeholder:text-tertiary-brand/60"
           />
           <button 
             type="submit"
             disabled={!inputValue.trim() || !isConnected}
             className="w-10 h-10 bg-primary-brand rounded flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-brand/90 transition-colors cursor-pointer"
           >
             <Send className="w-4 h-4" />
           </button>
         </form>
      </div>
    </div>
  );
}
