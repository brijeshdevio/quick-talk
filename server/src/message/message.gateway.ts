import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto';
import { Socket } from 'socket.io';
import { wsAuthGuard } from 'src/common';
import { ChatService } from 'src/chat/chat.service';

const EVENTS = {
  JOIN_ROOM: 'join_room',
  SEND_MESSAGE: 'send_message',
  SELF_MESSAGE: 'self_message',
  RECEIVE_MESSAGE: 'receive_message',
  TYPING_MESSAGE: 'typing_message',
};
const hosts = process.env.HOSTS_URI as string;
const allowHosts = hosts?.split(' ');

@WebSocketGateway({ cors: { origin: allowHosts, credentials: true } })
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
  ) {}

  // Join Room
  @SubscribeMessage(EVENTS.JOIN_ROOM)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatID: string,
  ) {
    await client.join(chatID);
    return { status: 'joined', chatID };
  }

  // Send Message
  @SubscribeMessage(EVENTS.SEND_MESSAGE)
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { chatID, content }: CreateMessageDto,
  ) {
    const sender = (await wsAuthGuard(client)) as string;

    const message = (await this.messageService.createMessage(
      sender,
      chatID,
      content,
    )) as unknown as { _id: string };

    await this.chatService.updateLastMessage(chatID, String(message._id));

    client.emit(EVENTS.SELF_MESSAGE, message);
    client.to(chatID).emit(EVENTS.RECEIVE_MESSAGE, message);
    return message;
  }
}
