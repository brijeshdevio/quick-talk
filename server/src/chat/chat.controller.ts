import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from 'src/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async handleCreateChat(
    @Req() req: { user: { sub: string } },
    @Body() body: CreateChatDto,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = req.user.sub;
    const chat = await this.chatService.crateChat(userId, body.member);
    return res.json({ chat, message: 'Chat created successfully.' });
  }

  @Get()
  async handleGetChats(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const userId = req.user.sub;
    const chats = await this.chatService.getChats(userId);
    return res.json({ chats });
  }

  @Get(':chatId/messages')
  async handleGetMessages(
    @Param('chatId') chatId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const messages = await this.chatService.getMessages(chatId);
    return res.json({ messages });
  }
}
