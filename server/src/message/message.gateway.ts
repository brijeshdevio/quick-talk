import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto, JoinRoomDto } from './dto';
import { Socket } from 'socket.io';

const EVENTS = {
  JOIN_ROOM: 'join_room',
  SEND_MESSAGE: 'send_message',
  SELF_MESSAGE: 'self_message',
  RECEIVE_MESSAGE: 'receive_message',
};

@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  private getRoomId(id1: string, id2: string) {
    return [id1, id2].sort().join('_');
  }

  @SubscribeMessage(EVENTS.JOIN_ROOM)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomDto,
  ) {
    const roomId = this.getRoomId(data.receiver, data.sender);
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
}
