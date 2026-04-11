import { Types } from "mongoose";
import { Chat } from "./chat.model";
import { ApiError } from "../../utils/ApiError";

export class ChatService {
  // 🔒 REST only — get all chats for sidebar
  static async getUserChats(userId: string) {
    return Chat.find({ participants: userId })
      .populate("participants", "username avatar isOnline lastSeen")
      .populate("lastMessage")
      .populate("admin", "username")
      .sort({ updatedAt: -1 });
  }

  // 🔒 REST only — get single chat by id
  static async getChatById(chatId: string, userId: string) {
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId,
    })
      .populate("participants", "username avatar isOnline lastSeen")
      .populate("lastMessage");

    if (!chat) throw new ApiError(404, "Chat not found");
    return chat;
  }

  // 🔌 Socket: emit "chat:new" to all participants after creation
  static async createOrGetOneOnOneChat(
    currentUserId: string,
    targetUserId: string,
  ) {
    if (currentUserId === targetUserId) {
      throw new ApiError(400, "Cannot create chat with yourself");
    }

    // Check if 1-on-1 already exists
    const existing = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [currentUserId, targetUserId] },
    })
      .populate("participants", "username avatar isOnline lastSeen")
      .populate("lastMessage");

    if (existing) return { chat: existing, isNew: false };

    const chat = await Chat.create({
      isGroupChat: false,
      participants: [currentUserId, targetUserId],
    });

    const populated = await Chat.findById(chat._id)
      .populate("participants", "username avatar isOnline lastSeen")
      .populate("lastMessage");

    return { chat: populated, isNew: true };
  }

  // 🔌 Socket: emit "chat:new" to all participants
  static async createGroupChat(
    adminId: string,
    name: string,
    participantIds: string[],
  ) {
    if (participantIds.length < 2) {
      throw new ApiError(
        400,
        "Group chat requires at least 2 other participants",
      );
    }

    const allParticipants = [...new Set([adminId, ...participantIds])];

    const chat = await Chat.create({
      name,
      isGroupChat: true,
      participants: allParticipants,
      admin: adminId,
    });

    return Chat.findById(chat._id)
      .populate("participants", "username avatar isOnline lastSeen")
      .populate("admin", "username avatar");
  }

  // 🔌 Socket: emit "chat:updated" to all participants
  static async addParticipants(
    chatId: string,
    adminId: string,
    newParticipantIds: string[],
  ) {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new ApiError(404, "Chat not found");
    if (!chat.isGroupChat) throw new ApiError(400, "Not a group chat");
    if (String(chat.admin) !== adminId)
      throw new ApiError(403, "Only admin can add participants");

    const toAdd = newParticipantIds.filter(
      (id) => !chat.participants.map(String).includes(id),
    );

    chat.participants.push(...toAdd.map((id) => new Types.ObjectId(id)));
    await chat.save();

    return Chat.findById(chatId).populate(
      "participants",
      "username avatar isOnline",
    );
  }

  // 🔌 Socket: emit "chat:updated" to all participants
  static async removeParticipant(
    chatId: string,
    adminId: string,
    targetId: string,
  ) {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new ApiError(404, "Chat not found");
    if (!chat.isGroupChat) throw new ApiError(400, "Not a group chat");
    if (String(chat.admin) !== adminId)
      throw new ApiError(403, "Only admin can remove participants");

    chat.participants = chat.participants.filter(
      (p) => String(p) !== targetId,
    ) as Types.Array<Types.ObjectId>;

    await chat.save();

    return Chat.findById(chatId).populate(
      "participants",
      "username avatar isOnline",
    );
  }

  // 🔒 REST only
  static async deleteChat(chatId: string, userId: string) {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new ApiError(404, "Chat not found");

    const isAdmin = chat.isGroupChat && String(chat.admin) === userId;
    const isParticipant = chat.participants.map(String).includes(userId);

    if (!isParticipant) throw new ApiError(403, "Not a participant");
    if (chat.isGroupChat && !isAdmin)
      throw new ApiError(403, "Only admin can delete group");

    await chat.deleteOne();
  }
}
