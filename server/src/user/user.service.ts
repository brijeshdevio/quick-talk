import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/schema/chat.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly chatService: ChatService,
  ) { }

  private isValidMongoID(_id: string): boolean {
    if (isValidObjectId(_id)) return true;
    throw new BadRequestException(`Invalid ID: ${_id}`);
  }

  async getProfile(userId: string) {
    this.isValidMongoID(userId);
    const user = await this.userModel
      .findById(userId)
      .lean()
      .select('-__v -password');
    if (user) {
      return user;
    }

    throw new UnauthorizedException(
      'You are not authorized to access this resource.',
    );
  }

  async getUsers(userId: string): Promise<User[]> {
    return await this.userModel
      .find({ _id: { $ne: userId } })
      .lean()
      .select('_id name email');
  }

  async getUser(userId: string, chatId: string) {
    this.isValidMongoID(chatId);
    const chat = await this.chatModel
      .findOne({
        _id: chatId,
        // members: { $ne: userId },
      })
      .populate('members', 'name isOnline lastSeen avatar');

    if (chat) {
      return {
        user: chat.members.find((member) => String(member._id) !== userId),
      };
    }

    throw new BadRequestException('Chat not found.');
  }

  async setStatus(userId: string, isOnline: boolean = false): Promise<void> {
    this.isValidMongoID(userId);
    if (isOnline) {
      await this.chatService.updateMessagesUserOnline(userId);
    }

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        isOnline: isOnline,
        lastSeen: new Date(),
      },
      { new: true },
    );
  }
}
