import { useEffect, useState } from "react"
import { useSocket } from "../context/SocketContext"
import { useQueryClient } from "@tanstack/react-query"

interface MessagePayload {
  _id: string
  chat: string
  content: string
  sender: { _id: string; username: string; avatar?: string }
  readBy: string[]
  createdAt: string
}

export function useChatSocket(chatId: string | undefined) {
  const { socket, isConnected } = useSocket()
  const queryClient = useQueryClient()
  
  // Track typing users: { "userId": "username" }
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!socket || !chatId || !isConnected) return

    // Join room specifically (backup for direct linkage)
    socket.emit("chat:join", { chatId })

    // Mark messages as read right when connecting
    socket.emit("message:read", { chatId })

    const handleNewMessage = (message: MessagePayload) => {
      console.log("🟢 socket received 'message:new':", message)
      
      const msgChatId = typeof message.chat === "object" ? (message.chat as any)._id : message.chat;
      if (msgChatId !== chatId) {
         console.log("Ignoring message for different chat:", msgChatId);
         return;
      }

      console.log("Updating cache for messages in chat:", chatId);

      // Append to Infinite Query data structure
      queryClient.setQueryData(["messages", chatId], (oldData: any) => {
        if (!oldData || !oldData.pages) return oldData

        const updatedData = {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                messages: [...(page.messages || []), message],
              }
            }
            return page
          }),
        }
        
        return updatedData;
      })

      // Update the chat object last preview
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] })
      queryClient.invalidateQueries({ queryKey: ["chats"] })

      // Optionally re-emit mark-as-read
      socket.emit("message:read", { chatId })
    }

    const handleChatUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] })
    }

    const handleTypingStart = ({ chatId: typedChatId, userId, username }: { chatId: string, userId: string, username: string }) => {
      if (typedChatId !== chatId) return;
      setTypingUsers(prev => ({ ...prev, [userId]: username }));
    };

    const handleTypingStop = ({ chatId: typedChatId, userId }: { chatId: string, userId: string }) => {
      if (typedChatId !== chatId) return;
      setTypingUsers(prev => {
        const next = { ...prev };
        delete next[userId];
        return next;
      });
    };

    socket.on("message:new", handleNewMessage)
    socket.on("chat:updated_last_message", handleChatUpdated)
    socket.on("typing:started", handleTypingStart)
    socket.on("typing:stopped", handleTypingStop)

    return () => {
      socket.off("message:new", handleNewMessage)
      socket.off("chat:updated_last_message", handleChatUpdated)
      socket.off("typing:started", handleTypingStart)
      socket.off("typing:stopped", handleTypingStop)
      // Reset typing state when unmounting or changing chat
      setTypingUsers({})
    }
  }, [socket, chatId, isConnected, queryClient])

  const sendMessage = (content: string) => {
    if (!socket || !chatId) return

    socket.emit("message:send", { chatId, content }, (ack: any) => {
      if (!ack.success) {
        console.error("Failed to send message", ack.error)
      }
    })
  }

  const sendTypingStart = () => {
    if (!socket || !chatId) return;
    socket.emit("typing:start", { chatId });
  }

  const sendTypingStop = () => {
    if (!socket || !chatId) return;
    socket.emit("typing:stop", { chatId });
  }

  return { sendMessage, isConnected, typingUsers, sendTypingStart, sendTypingStop }
}
