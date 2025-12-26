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
import { WS_EVENTS, WS_LISTENERS } from 'src/constants';
import { UserService } from 'src/user/user.service';

const hosts = process.env.HOSTS_URI as string;
const allowHosts = hosts?.split(' ');

@WebSocketGateway({ cors: { origin: allowHosts, credentials: true } })
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) { }

  // Built-in - Connect
  async handleConnection(client: Socket) {
    const userId = (await wsAuthGuard(client)) as string;
    if (userId) {
      await this.userService.setStatus(userId, true).finally(() => {
        client.broadcast.emit(WS_LISTENERS.USER_ONLINE, userId);
      });
    }
  }

  // Join Room
  @SubscribeMessage(WS_EVENTS.ROOM_JOIN)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { chatID }: { chatID: string },
  ) {
    await client.join(chatID);
    const userId = (await wsAuthGuard(client)) as string;
    if (userId) {
      await this.userService.setStatus(userId, true).finally(() => {
        client.broadcast.emit(WS_LISTENERS.USER_ONLINE, userId);
      });
    }
  }

  // Send Message
  @SubscribeMessage(WS_EVENTS.MSG_SEND)
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { chatID, content, isMemberOnline }: CreateMessageDto,
  ) {
    const sender = (await wsAuthGuard(client)) as string;
    if (sender) {
      const message = (await this.messageService.createMessage(
        sender,
        chatID,
        content,
        isMemberOnline
      )) as unknown as { _id: string };

      await this.chatService.updateLastMessage(chatID, String(message._id));

      client.emit(WS_LISTENERS.MSG_DELIVERED, message);
      client.to(chatID).emit(WS_LISTENERS.MSG_DELIVERED, message);
    }
  }

  // Typing Message
  @SubscribeMessage(WS_EVENTS.MSG_TYPING)
  async typingMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { chatID, isActive }: { chatID: string; isActive: boolean },
  ) {
    const sender = (await wsAuthGuard(client)) as string;
    if (sender) {
      client.to(chatID).emit(WS_EVENTS.MSG_TYPING, { sender, isActive });
    }
  }

  // User Status - Offline
  @SubscribeMessage(WS_EVENTS.USER_ONLINE)
  async userOffline(@ConnectedSocket() client: Socket) {
    const userId = (await wsAuthGuard(client)) as string;
    if (userId) {
      await this.userService.setStatus(userId, false);
    }
  }

  // built-in - Disconnect
  async handleDisconnect(client: Socket) {
    const userId = (await wsAuthGuard(client)) as string;
    if (userId) {
      await this.userService.setStatus(userId, false).finally(() => {
        client.broadcast.emit(WS_LISTENERS.USER_OFFLINE, userId);
      });
    }
  }
}
