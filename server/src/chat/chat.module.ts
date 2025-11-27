import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatSchema } from 'src/schema/chat.schema';
import { Message, MessageSchema } from 'src/schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  exports: [ChatService],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
