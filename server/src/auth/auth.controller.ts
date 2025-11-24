import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleRegister(
    @Body() body: RegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.authService.register(body);
    return res.json({ message: 'Account created successfully.' });
  }

  @Post('login')
  async handleLogin(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { accessToken } = await this.authService.login(body);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.json({ message: 'You Logged in successfully.', accessToken });
  }
}
