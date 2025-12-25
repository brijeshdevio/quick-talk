import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async handleGetProfile(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const userId = req.user.sub;
    const user = await this.userService.getProfile(userId);
    return res.json({ user });
  }

  @Get()
  async handleGetUsers(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const userId = req.user.sub;
    const users = await this.userService.getUsers(userId);
    return res.json({ users });
  }

  @Get(':chatId')
  async handleGetUser(
    @Req() req: { user: { sub: string } },
    @Param('chatId') chatId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = req.user.sub;
    const result = await this.userService.getUser(userId, chatId);
    return res.json(result);
  }
}
