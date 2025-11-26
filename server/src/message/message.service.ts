import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/schema/message.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  private isValidMongoID(_id: string): boolean {
    if (isValidObjectId(_id)) return true;
    throw new BadRequestException(`Invalid ID: ${_id}`);
  }

  async createMessage(data: CreateMessageDto) {
    this.isValidMongoID(data.receiver);
    this.isValidMongoID(data.sender);
    return this.messageModel.create(data);
  }

  async getMessages(sender: string, receiver: string) {
    this.isValidMongoID(receiver);
    return this.messageModel
      .find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      })
      .lean()
      .select('-__v');
  }
}
