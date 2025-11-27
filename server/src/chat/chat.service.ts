import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Chat } from 'src/schema/chat.schema';
import { Message } from 'src/schema/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  private isValidMongoID(_id: string): boolean {
    if (isValidObjectId(_id)) return true;
    throw new BadRequestException(`Invalid ID: ${_id}`);
  }

  async crateChat(userId: string, receiverId: string): Promise<Chat> {
    this.isValidMongoID(receiverId);

    const existingChat = await this.chatModel.findOne({
      members: { $all: [userId, receiverId] },
    });

    if (existingChat) {
      throw new ConflictException('Chat already exists.');
    }

    const members = [
      userId as unknown as Types.ObjectId,
      receiverId as unknown as Types.ObjectId,
    ];
    const chat = await this.chatModel.create({ members });
    return chat;
  }

  async getChats(userId: string): Promise<any[]> {
    const chats = await this.chatModel
      .find({ members: { $all: [userId] } })
      .lean()
      .select('-__v -isGroup -groupName -createdAt')
      .populate('members', 'name isOnline lastSeen')
      .populate('lastMessage', 'content');

    return chats?.map((chat) => {
      return {
        ...chat,
        member: chat.members.find((member) => String(member._id) !== userId),
        members: undefined,
      };
    });
  }

  async getMessages(chat: string): Promise<Message[]> {
    this.isValidMongoID(chat);
    const messages = await this.messageModel
      .find({ chat })
      .lean()
      .select('-__v -updatedAt -chat')
      .limit(20);
    return messages;
  }

  async updateLastMessage(chatId: string, messageId: string): Promise<Chat> {
    this.isValidMongoID(chatId);
    this.isValidMongoID(messageId);
    const chat = await this.chatModel.findByIdAndUpdate(chatId, {
      lastMessage: messageId,
    });

    if (chat) {
      return chat;
    }

    throw new BadRequestException('Chat not found.');
  }
}
