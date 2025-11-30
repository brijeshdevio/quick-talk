import { useEffect } from "react";
import { socket } from "@/services/socket";

export function useListener<T>(event: string, handler: (d: T) => void) {
  useEffect(() => {
    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
}
