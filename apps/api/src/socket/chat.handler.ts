import { Server } from "socket.io";
import { AuthenticatedSocket } from "./socket.auth";
import { chatModel } from "../models/chat.model";
import { messageModel } from "../models/message.model";

export function registerChatHandlers(
  io: Server,
  socket: AuthenticatedSocket,
) {
  const userId = socket.userId;

  // Join all chat rooms the user belongs to
  const joinUserChats = async () => {
    const chats = await chatModel.find({ members: userId });
    for (const chat of chats) {
      socket.join(`chat:${chat._id}`);
    }
  };

  // Send a message
  const onSendMessage = async (
    data: { chatId: string; content: string },
    callback?: (response: { success: boolean; data?: any; error?: string }) => void,
  ) => {
    try {
      const { chatId, content } = data;

      const chat = await chatModel.findOne({
        _id: chatId,
        members: userId,
      });

      if (!chat) {
        return callback?.({ success: false, error: "Chat not found" });
      }

      const message = await messageModel.create({
        sender: userId,
        chat: chatId,
        content,
        readBy: [userId],
      });

      await chatModel.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
      });

      const populated = await message.populate("sender", "name email");

      io.to(`chat:${chatId}`).emit("message:received", {
        message: populated,
        chatId,
      });

      callback?.({ success: true, data: populated });
    } catch {
      callback?.({ success: false, error: "Failed to send message" });
    }
  };

  // Typing indicators
  const onTypingStart = (data: { chatId: string }) => {
    socket.to(`chat:${data.chatId}`).emit("typing:start", {
      chatId: data.chatId,
      userId,
    });
  };

  const onTypingStop = (data: { chatId: string }) => {
    socket.to(`chat:${data.chatId}`).emit("typing:stop", {
      chatId: data.chatId,
      userId,
    });
  };

  // Mark messages as read
  const onMessagesRead = async (
    data: { chatId: string },
    callback?: (response: { success: boolean; error?: string }) => void,
  ) => {
    try {
      const { chatId } = data;

      const chat = await chatModel.findOne({
        _id: chatId,
        members: userId,
      });

      if (!chat) {
        return callback?.({ success: false, error: "Chat not found" });
      }

      await messageModel.updateMany(
        { chat: chatId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } },
      );

      socket.to(`chat:${chatId}`).emit("messages:read", {
        chatId,
        userId,
      });

      callback?.({ success: true });
    } catch {
      callback?.({ success: false, error: "Failed to mark as read" });
    }
  };

  // Join a specific chat room (e.g. after creating a new chat)
  const onJoinChat = (data: { chatId: string }) => {
    socket.join(`chat:${data.chatId}`);
  };

  // Auto-join all existing chats on connection
  joinUserChats();

  // Register event listeners
  socket.on("message:send", onSendMessage);
  socket.on("typing:start", onTypingStart);
  socket.on("typing:stop", onTypingStop);
  socket.on("messages:read", onMessagesRead);
  socket.on("chat:join", onJoinChat);
}
