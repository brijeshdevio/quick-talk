import { Request, Response } from "express";
import { ChatService } from "./chat.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { getIO } from "../../config/socket"; // 🔌 socket instance

export class ChatController {
  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  getUserChats = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chats = await ChatService.getUserChats(userId);
    res.json(new ApiResponse(200, chats, "Chats fetched"));
  };

  getChatById = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    const chat = await ChatService.getChatById(chatId, userId);
    res.json(new ApiResponse(200, chat, "Chat fetched"));
  };

  // 🔌 Emits "chat:new" to target user if chat is new
  createOrGetOneOnOneChat = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const { targetUserId } = req.body;
    const { chat, isNew } = await ChatService.createOrGetOneOnOneChat(
      userId,
      targetUserId,
    );

    if (isNew) {
      const io = getIO();
      chat!.participants.forEach((participantId) => {
        if (String(participantId) !== userId) {
          io.to(String(participantId)).emit("chat:new", chat);
        }
      });
    }

    res.json(
      new ApiResponse(201, chat, isNew ? "Chat created" : "Chat fetched"),
    );
  };

  // 🔌 Emits "chat:new" to all participants
  createGroupChat = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const { name, participantIds } = req.body;
    const chat = await ChatService.createGroupChat(
      userId,
      name,
      participantIds,
    );

    const io = getIO();
    chat!.participants.forEach((participantId) => {
      if (String(participantId) !== userId) {
        io.to(String(participantId)).emit("chat:new", chat);
      }
    });

    res.json(new ApiResponse(201, chat, "Group chat created"));
  };

  // 🔌 Emits "chat:updated" to all participants
  addParticipants = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    const { participantIds } = req.body;
    const chat = await ChatService.addParticipants(
      chatId,
      userId,
      participantIds,
    );

    const io = getIO();
    chat!.participants.forEach((participantId) => {
      io.to(String(participantId)).emit("chat:updated", chat);
    });

    res.json(new ApiResponse(200, chat, "Participants added"));
  };

  // 🔌 Emits "chat:updated" to all remaining participants
  removeParticipant = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    const { targetId } = req.body;
    const chat = await ChatService.removeParticipant(
      chatId,
      userId,
      targetId,
    );

    const io = getIO();
    chat!.participants.forEach((participantId) => {
      io.to(String(participantId)).emit("chat:updated", chat);
    });

    res.json(new ApiResponse(200, chat, "Participant removed"));
  };

  deleteChat = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    await ChatService.deleteChat(chatId, userId);
    res.json(new ApiResponse(200, null, "Chat deleted"));
  };
}
