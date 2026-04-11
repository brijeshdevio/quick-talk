import { Search, Loader2 } from "lucide-react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useState, useEffect } from "react"

type Participant = {
  _id: string
  username: string
  avatar?: string
  isOnline?: boolean
}
type ChatMessage = { _id: string; content: string }
type Chat = {
  _id: string
  name?: string
  isGroupChat: boolean
  participants: Participant[]
  lastMessage?: ChatMessage
  avatar?: string
}

// Utilities
const getChatName = (chat: Chat, currentUserId?: string) => {
  if (chat.isGroupChat) return chat.name || "Group Chat"
  const other = chat.participants.find((p) => p._id !== currentUserId)
  return other?.username || "Unknown User"
}

const getChatInitials = (name: string) => {
  return name.slice(0, 2).toUpperCase()
}

const isChatOnline = (chat: Chat, currentUserId?: string) => {
  if (chat.isGroupChat) return false
  const other = chat.participants.find((p) => p._id !== currentUserId)
  return !!other?.isOnline
}

export function ChatLayout() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // Current user
  const authResponse = queryClient.getQueryData<any>(["auth-user"])
  const currentUserId = authResponse?.data?._id

  // Recent chats
  const { data: chatsResponse, isLoading: isLoadingChats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await api.get("/chats")
      return res.data
    },
    enabled: !!currentUserId && debouncedQuery.length === 0,
  })

  // Search users
  const { data: searchResponse, isLoading: isSearchLoading } = useQuery({
    queryKey: ["search-users", debouncedQuery],
    queryFn: async () => {
      const res = await api.get(`/users/search?q=${debouncedQuery}`)
      return res.data
    },
    enabled: debouncedQuery.length > 0 && !!currentUserId,
  })

  // Create or navigate to chat
  const { mutate: startChat, isPending: isStartingChat } = useMutation({
    mutationFn: async (targetUserId: string) => {
      const res = await api.post("/chats", { targetUserId })
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] })
      setSearchQuery("")
      setDebouncedQuery("")
      navigate(`/chat/${data.data._id}`)
    },
  })

  const chats: Chat[] = chatsResponse?.data || []
  const searchedUsers: Participant[] = searchResponse?.data?.users || []
  const isSearching = debouncedQuery.length > 0

  return (
    <div className="flex h-screen overflow-hidden bg-surface-container-low font-sans text-primary-brand">
      {/* Sidebar */}
      <aside className="z-10 flex h-full w-72 shrink-0 flex-col border-r border-surface-container-low bg-surface-container-lowest shadow-[10px_0_40px_-20px_rgba(45,52,53,0.05)]">
        {/* Branding */}
        <div className="p-6 pb-4">
          <h1 className="text-xl font-bold tracking-tight">
            The Silent Architect
          </h1>
          <p className="mt-1 text-xs text-tertiary-brand">Editorial Chat</p>
        </div>

        {/* Search */}
        <div className="mb-6 px-5">
          <div className="flex h-10 items-center gap-3 rounded-[0.5rem] bg-surface px-4 transition-shadow focus-within:ring-1 focus-within:ring-primary-brand/30">
            <Search className="h-4 w-4 shrink-0 text-tertiary-brand" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent text-xs text-primary-brand outline-none placeholder:text-tertiary-brand/70"
            />
          </div>
        </div>

        {/* Dynamic List */}
        <div className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-6">
          <h2 className="mb-2 px-4 text-[10px] font-bold tracking-widest text-tertiary-brand/70 uppercase">
            {isSearching ? "Search Results" : "Chats"}
          </h2>

          {(isLoadingChats || isSearchLoading) && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-tertiary-brand" />
            </div>
          )}

          {isStartingChat && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-surface-container-lowest/50 backdrop-blur-[1px]">
              <Loader2 className="h-6 w-6 animate-spin text-primary-brand" />
            </div>
          )}

          {!isSearchLoading && isSearching && searchedUsers.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-xs font-medium text-tertiary-brand">
                No users found.
              </p>
            </div>
          )}

          {/* Search Result Users */}
          {!isSearchLoading &&
            isSearching &&
            searchedUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => startChat(user._id)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-surface-container-low/50"
              >
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-brand/10 text-xs font-bold text-primary-brand uppercase">
                    {getChatInitials(user.username)}
                  </div>
                  {user.isOnline && (
                    <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-surface-container-low bg-[#4ade80]"></div>
                  )}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-primary-brand/80">
                    {user.username}
                  </span>
                  <span className="mt-0.5 truncate text-[10px] text-tertiary-brand">
                    Click to chat
                  </span>
                </div>
              </button>
            ))}

          {!isLoadingChats && !isSearching && chats.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-xs font-medium text-tertiary-brand">
                No recent conversations.
              </p>
            </div>
          )}

          {/* Recent Chats */}
          {!isLoadingChats &&
            !isSearching &&
            chats.map((chat) => {
              const chatName = getChatName(chat, currentUserId)
              const initials = getChatInitials(chatName)
              const isOnline = isChatOnline(chat, currentUserId)

              return (
                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition-colors ${currentPath === `/chat/${chat._id}` ? "bg-surface-container-high" : "hover:bg-surface-container-low/50"}`}
                >
                  {/* Avatar Mock */}
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary-brand text-xs font-bold text-white uppercase">
                      {initials}
                    </div>
                    {isOnline && (
                      <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-surface-container-low bg-[#4ade80]"></div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <span
                      className={`truncate text-sm ${currentPath === `/chat/${chat._id}` ? "font-bold text-primary-brand" : "font-semibold text-primary-brand/80"}`}
                    >
                      {chatName}
                    </span>
                    <span className="truncate text-xs text-tertiary-brand">
                      {chat.lastMessage?.content || "No messages yet"}
                    </span>
                  </div>
                </Link>
              )
            })}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col bg-surface">
        <Outlet />
      </div>
    </div>
  )
}
