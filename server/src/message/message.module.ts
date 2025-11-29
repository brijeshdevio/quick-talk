import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { Message, MessageSchema } from 'src/schema/message.schema';
import { MessageController } from './message.controller';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ChatModule,
  ],
  controllers: [MessageController],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
