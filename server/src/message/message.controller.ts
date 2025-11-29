import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/common';
import type { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':receiver')
  handleGetMessages(
    @Req() req: { user: { sub: string } },
    @Param('receiver') receiver: string,
    @Res() res: Response,
  ) {
    return res.json({ messages: [] });
  }
}
