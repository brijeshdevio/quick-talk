import { Server } from "socket.io";
import {
  socketAuthMiddleware,
  AuthenticatedSocket,
} from "./middlewares/socket.auth";
import { registerMessageHandlers } from "./handlers/message.handler";
import { registerPresenceHandlers } from "./handlers/presence.handler";
import { registerRoomHandlers } from "./handlers/room.handler";
import { UserService } from "../modules/user/user.service";

// In-memory map: userId → socketId (for presence tracking)
// Replace with Redis when scaling horizontally
export const onlineUsers = new Map<string, string>();

export const registerSocketHandlers = (io: Server): void => {
  // Apply auth middleware to ALL socket connections
  io.use(socketAuthMiddleware as any);

  io.on("connection", async (socket) => {
    const authedSocket = socket as AuthenticatedSocket;
    const userId = authedSocket.user._id;

    console.log(`✅ Socket connected: ${userId} (${socket.id})`);

    // Track online user
    onlineUsers.set(userId, socket.id);

    // Join personal room (userId as room) — used to send targeted events
    socket.join(userId);

    // Broadcast online status to everyone
    await UserService.setOnlineStatus(userId, true); // add ✅
    socket.broadcast.emit("user:online", { userId });

    // Register feature handlers
    registerRoomHandlers(io, authedSocket);
    registerPresenceHandlers(io, authedSocket);
    registerMessageHandlers(io, authedSocket);

    // Handle disconnection
    socket.on("disconnect", async () => {
      console.log(`❌ Socket disconnected: ${userId}`);
      onlineUsers.delete(userId);
      await UserService.setOnlineStatus(userId, false); // add ✅
      io.emit("user:offline", {
        userId,
        lastSeen: new Date().toISOString(),
      });
    });
  });
};
