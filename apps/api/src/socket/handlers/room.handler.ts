import { Server } from "socket.io";
import { AuthenticatedSocket } from "../middlewares/socket.auth";
import { Chat } from "../../modules/chat/chat.model";

export const registerRoomHandlers = (
  io: Server,
  socket: AuthenticatedSocket,
): void => {
  const userId = socket.user._id;

  // Auto-join all existing chat rooms on connect
  // so socket.to(chatId) works for broadcasting
  const joinUserChatRooms = async () => {
    const chats = await Chat.find({ participants: userId }).select("_id");
    const roomIds = chats.map((c) => String(c._id));
    socket.join(roomIds);
    console.log(`📦 ${userId} joined ${roomIds.length} chat room(s)`);
  };

  joinUserChatRooms();

  // Client joins a specific chat room (e.g. when opening a chat window)
  socket.on("room:join", (chatId: string) => {
    socket.join(chatId);
    console.log(`🚪 ${userId} joined room: ${chatId}`);
  });

  // Client leaves a specific chat room (e.g. closing chat window)
  socket.on("room:leave", (chatId: string) => {
    socket.leave(chatId);
    console.log(`🚶 ${userId} left room: ${chatId}`);
  });
};
