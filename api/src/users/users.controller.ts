import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { ZodValidationPipe } from '../common/pipes';
import { apiResponse } from '../utils';
import { UsersService } from './users.service';
import { QueryUsersSchema } from './dto';
// types
import type { Response } from 'express';
import type { QueryUsersDto } from './dto';
import type { CurrentUser } from '../types';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async handleGetMe(
    @Req() req: CurrentUser,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = req.user.id;
    const user = await this.usersService.getMe(userId);
    return apiResponse(200, { data: { user } })(res);
  }

  @Get()
  async handleGetUsers(
    @Req() req: CurrentUser,
    @Query(new ZodValidationPipe(QueryUsersSchema)) query: QueryUsersDto,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.usersService.getUsers(req.user.id, query);
    return apiResponse(200, { data })(res);
  }

  @Get(':id')
  async handleGetUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.usersService.getUser(id);
    return apiResponse(200, { data: { user } })(res);
  }
}
