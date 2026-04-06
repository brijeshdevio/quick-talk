import { Server } from "socket.io";
import { AuthenticatedSocket } from "../middlewares/socket.auth";
import { MessageService } from "../../modules/message/message.service";
import { ChatService } from "../../modules/chat/chat.service";
import { MessageType } from "../../modules/message/message.types";

export const registerMessageHandlers = (
  io: Server,
  socket: AuthenticatedSocket,
): void => {
  const userId = socket.user._id;

  // ----- Send Message (real-time path) -----
  socket.on(
    "message:send",
    async ({
      chatId,
      content,
      type = "text",
    }: {
      chatId: string;
      content: string;
      type?: MessageType;
    }) => {
      try {
        const message = await MessageService.sendMessage(
          chatId,
          userId,
          content,
          type,
        );

        // Emit to everyone in the chat room INCLUDING sender
        // Sender needs confirmation with server-generated _id + timestamps
        io.to(chatId).emit("message:new", message);

        // Also update chat sidebar for all participants (lastMessage changed)
        const chat = await ChatService.getChatById(chatId, userId);
        io.to(chatId).emit("chat:updated_last_message", chat);
      } catch (err: any) {
        socket.emit("error", { event: "message:send", message: err.message });
      }
    },
  );

  // ----- Read Receipt -----
  socket.on("message:read", async ({ chatId }: { chatId: string }) => {
    try {
      await MessageService.markAsRead(chatId, userId);

      // Notify all participants so they can update their unread count / ticks
      io.to(chatId).emit("message:read_ack", {
        chatId,
        readBy: userId,
        readAt: new Date().toISOString(),
      });
    } catch (err: any) {
      socket.emit("error", { event: "message:read", message: err.message });
    }
  });

  // ----- Delete For Everyone (real-time path) -----
  socket.on(
    "message:delete",
    async ({ messageId, chatId }: { messageId: string; chatId: string }) => {
      try {
        await MessageService.deleteMessageForAll(messageId, userId);

        io.to(chatId).emit("message:deleted", {
          messageId,
          chatId,
          deletedAt: new Date().toISOString(),
        });
      } catch (err: any) {
        socket.emit("error", { event: "message:delete", message: err.message });
      }
    },
  );
};
