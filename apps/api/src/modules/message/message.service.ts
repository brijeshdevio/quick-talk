import { Message } from "./message.model";
import { Chat } from "../chat/chat.model";
import { ApiError } from "../../utils/ApiError";
import { MessageType } from "./message.types";

const MESSAGE_PAGE_SIZE = 30;

export class MessageService {
  // 🔌 Socket: emit "message:new" to all chat participants
  static async sendMessage(
    chatId: string,
    senderId: string,
    content: string,
    type: MessageType = "text",
  ) {
    const chat = await Chat.findOne({
      _id: chatId,
      participants: senderId,
    });
    if (!chat) throw new ApiError(404, "Chat not found or access denied");

    const message = await Message.create({
      chat: chatId,
      sender: senderId,
      content,
      type,
      readBy: [senderId], // sender has already "read" it
    });

    // Update chat's lastMessage for sidebar preview
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

    return Message.findById(message._id)
      .populate("sender", "username avatar")
      .populate("chat");
  }

  // 🔒 REST only — cursor-based pagination
  static async getMessages(
    chatId: string,
    userId: string,
    cursor?: string, // createdAt of oldest message loaded so far
  ) {
    const chat = await Chat.findOne({ _id: chatId, participants: userId });
    if (!chat) throw new ApiError(403, "Access denied");

    const query: Record<string, any> = {
      chat: chatId,
      isDeletedForAll: false,
      deletedFor: { $ne: userId },
    };

    // Load messages OLDER than cursor for infinite scroll upward
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(MESSAGE_PAGE_SIZE)
      .populate("sender", "username avatar");

    return {
      messages: messages.reverse(), // return in asc order
      hasMore: messages.length === MESSAGE_PAGE_SIZE,
      nextCursor: messages.length ? messages[0].createdAt.toISOString() : null,
    };
  }

  // 🔌 Socket: emit "message:read" to sender
  static async markAsRead(chatId: string, userId: string) {
    await Message.updateMany(
      {
        chat: chatId,
        readBy: { $ne: userId },
        sender: { $ne: userId }, // don't mark own messages
        isDeletedForAll: false,
      },
      { $addToSet: { readBy: userId } },
    );
  }

  // 🔌 Socket: emit "message:deleted" to all participants
  static async deleteMessageForAll(messageId: string, senderId: string) {
    const message = await Message.findById(messageId);
    if (!message) throw new ApiError(404, "Message not found");
    if (String(message.sender) !== senderId) {
      throw new ApiError(403, "Only sender can delete for everyone");
    }

    message.isDeletedForAll = true;
    message.content = "This message was deleted";
    await message.save();

    return message;
  }

  // 🔒 REST only — soft delete only for current user
  static async deleteMessageForMe(messageId: string, userId: string) {
    const message = await Message.findOne({
      _id: messageId,
      deletedFor: { $ne: userId },
    });
    if (!message) throw new ApiError(404, "Message not found");

    await Message.findByIdAndUpdate(messageId, {
      $addToSet: { deletedFor: userId },
    });
  }
}
