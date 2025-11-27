import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { toast } from "sonner";

export function useSocket<T>(event: string, callback: (data: T) => void) {
  useEffect(() => {
    socket.on(event, callback);

    socket.on("error", (error: string) => {
      toast.error(error);
    });
    return () => {
      socket.off(event, callback);
      socket.off("error");
    };
  }, [event, callback]);
}
