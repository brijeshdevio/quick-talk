import { socket } from "@/services/socket";

export function useEmit<T>(
  event: string,
  data?: T,
  response: (d: T) => void = () => {}
) {
  socket.emit(event, data, response);

  return () => {
    socket.off(event);
  };
}
