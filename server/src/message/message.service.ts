import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/schema/message.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  private isValidMongoID(_id: string): boolean {
    if (isValidObjectId(_id)) return true;
    throw new BadRequestException(`Invalid ID: ${_id}`);
  }

  async createMessage(
    sender: string,
    chat: string,
    content: string,
  ): Promise<Message> {
    this.isValidMongoID(chat);
    const message = await this.messageModel.create({
      sender,
      chat,
      content,
    });
    return message;
  }
}
