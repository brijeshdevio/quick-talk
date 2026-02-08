import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes';
import { apiResponse, clearCookie, setCookie } from '../utils';
import { JwtAuthGuard } from '../common/guards';
import { COOKIE_NAMES } from '../constants';
import { AuthService } from './auth.service';
import { LoginSchema, RegisterSchema } from './dto';
// types
import type { Response } from 'express';
import type { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async handleRegister(
    @Body() body: RegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.register(body);
    const message = 'Registered successfully';
    return apiResponse(201, { data: { user }, message })(res);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async handleLogin(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { accessToken, user } = await this.authService.login(body);
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, res);
    const message = 'Logged in successfully';
    return apiResponse(200, { data: { user }, rest: { accessToken }, message })(
      res,
    );
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  handleLogout(@Res() res: Response): Response {
    clearCookie(COOKIE_NAMES.ACCESS_TOKEN, res);
    const message = 'Logged out successfully';
    return apiResponse(200, { message })(res);
  }
}
