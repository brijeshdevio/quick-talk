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
  constructor(private readonly messageService: MessageService) {}

  private getRoomId(id1: string, id2: string) {
    return [id1, id2].sort().join('_');
  }

  @SubscribeMessage(EVENTS.JOIN_ROOM)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const userId = await wsAuthGuard(client);
    const roomId = this.getRoomId(data, userId!);
    await client.join(roomId);
    return { status: 'joined', roomId };
  }

  @SubscribeMessage(EVENTS.SEND_MESSAGE)
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateMessageDto,
  ) {
    const roomId = this.getRoomId(data.receiver, data.sender);

    if (!client.rooms.has(roomId)) {
      return { error: 'Not in room' };
    }

    const message = await this.messageService.createMessage(data);
    client.emit(EVENTS.SELF_MESSAGE, message);
    client.to(roomId).emit(EVENTS.RECEIVE_MESSAGE, message);

    return message;
  }

  @SubscribeMessage(EVENTS.TYPING_MESSAGE)
  typingMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      receiver: string;
      sender: string;
      typing: boolean;
    },
  ) {
    const roomId = this.getRoomId(data.receiver, data.sender);
    if (!client.rooms.has(roomId)) {
      return { error: 'Not in room' };
    }
    client.to(roomId).emit(EVENTS.TYPING_MESSAGE, data);
  }
}
