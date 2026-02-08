import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from '../utils';
// types
import type { User } from '../generated/prisma/client';
import type { LoginDto, RegisterDto } from './dto';

type TRegisterResponse = Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;
type TLoginResponse = {
  accessToken: string;
  user: TRegisterResponse;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDto): Promise<TRegisterResponse> {
    const hashedPassword = await hashPassword(registerData.password);
    try {
      const data = {
        name: registerData.name,
        email: registerData.email,
        password: hashedPassword,
      };
      const user = await this.prisma.user.create({
        data,
        select: { id: true, name: true, email: true, createdAt: true },
      });
      return user;
    } catch (error: unknown) {
      const CONFLICT_ERROR_CODE = 'P2002';
      const err = error as { code: string };
      if (err?.code === CONFLICT_ERROR_CODE) {
        throw new ConflictException(`${registerData.email} already exists.`);
      }

      throw error;
    }
  }

  async login(loginData: LoginDto): Promise<TLoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginData.email },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const { password, ...safeUser } = user;

    const isValidPassword = await comparePassword(password, loginData.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { id: safeUser.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user: safeUser };
  }
}
