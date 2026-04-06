import { Request, Response } from "express";
import { MessageService } from "./message.service";
import { getIO } from "../../config/socket"; // 🔌
import { ApiResponse } from "../../utils/ApiResponse";

export class MessageController {
  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  getMessages = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    const { cursor } = req.query;
    const result = await MessageService.getMessages(
      chatId,
      userId,
      cursor as string | undefined,
    );
    res.json(new ApiResponse(200, result, "Messages fetched"));
  };

  // 🔌 Emits "message:new" to all participants except sender
  sendMessage = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    const { content, type } = req.body;
    const message = await MessageService.sendMessage(
      chatId,
      userId,
      content,
      type,
    );

    const io = getIO();
    const chat = message!.chat as any;
    chat.participants.forEach((participantId: any) => {
      if (String(participantId) !== userId) {
        io.to(String(participantId)).emit("message:new", message);
      }
    });

    res.json(new ApiResponse(201, message, "Message sent"));
  };

  // 🔌 Emits "message:read" to all participants in the chat room
  markAsRead = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const chatId = req.params?.chatId as string;
    await MessageService.markAsRead(chatId, userId);

    const io = getIO();
    io.to(chatId).emit("message:read", {
      chatId,
      readBy: userId,
    });

    res.json(new ApiResponse(200, null, "Marked as read"));
  };

  // 🔌 Emits "message:deleted" to all participants
  deleteForAll = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const messageId = req.params?.messageId as string;
    const message = await MessageService.deleteMessageForAll(messageId, userId);

    const io = getIO();
    io.to(String(message.chat)).emit("message:deleted", {
      messageId: message._id,
      chatId: message.chat,
    });

    res.json(new ApiResponse(200, null, "Message deleted for everyone"));
  };

  // 🔒 No socket emission needed
  deleteForMe = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const messageId = req.params?.messageId as string;
    await MessageService.deleteMessageForMe(messageId, userId);
    res.json(new ApiResponse(200, null, "Message deleted for you"));
  };
}
