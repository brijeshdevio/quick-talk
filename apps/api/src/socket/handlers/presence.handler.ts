import { Server } from "socket.io";
import { AuthenticatedSocket } from "../middlewares/socket.auth";
import { onlineUsers } from "../index";

// Typing state: chatId → Set of userIds currently typing
const typingUsers = new Map<string, Set<string>>();

export const registerPresenceHandlers = (
  io: Server,
  socket: AuthenticatedSocket,
): void => {
  const userId = socket.user._id;

  // Client requests list of online users at connection time
  socket.on("presence:get_online", () => {
    const onlineUserIds = Array.from(onlineUsers.keys());
    socket.emit("presence:online_list", { onlineUserIds });
  });

  // ----- Typing Indicator -----

  socket.on("typing:start", ({ chatId }: { chatId: string }) => {
    if (!typingUsers.has(chatId)) {
      typingUsers.set(chatId, new Set());
    }
    typingUsers.get(chatId)!.add(userId);

    // Broadcast to everyone in the chat room except sender
    socket.to(chatId).emit("typing:started", {
      chatId,
      userId,
      username: socket.user.username,
    });
  });

  socket.on("typing:stop", ({ chatId }: { chatId: string }) => {
    typingUsers.get(chatId)?.delete(userId);

    socket.to(chatId).emit("typing:stopped", {
      chatId,
      userId,
    });
  });

  // Auto-clear typing state on disconnect
  socket.on("disconnect", () => {
    typingUsers.forEach((users, chatId) => {
      if (users.has(userId)) {
        users.delete(userId);
        io.to(chatId).emit("typing:stopped", { chatId, userId });
      }
    });
  });
};
