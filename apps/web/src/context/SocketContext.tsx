import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { io, Socket } from "socket.io-client"
import { useQueryClient } from "@tanstack/react-query"

interface SocketContextProps {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    // Only connect if the user hits the app (and relies on HTTP-only cookie headers to auth automatically)
    const socketInstance = io(
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
        "http://localhost:3000",
      {
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    )

    socketInstance.on("connect", () => {
      console.log("🟢 Socket connected:", socketInstance.id)
      setIsConnected(true)
    })

    socketInstance.on("connect_error", (error) => {
      console.error("🔴 Socket connection error:", error.message);
      setIsConnected(false);
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Socket disconnected")
      setIsConnected(false)
    })

    socketInstance.on("user:online", () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] }) // invalidate specific chats
    })

    socketInstance.on("user:offline", () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] })
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [queryClient])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
