import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import argon2 from 'argon2';
import { User } from 'src/schema/user.schema';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  private async comparePassword(
    hashedPassword: string,
    rawPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, rawPassword);
  }

  private async generateToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return await this.jwtService.signAsync(payload);
  }

  async register(data: RegisterDto): Promise<void> {
    try {
      data.password = await this.hashPassword(data.password);
      await this.userModel.create(data);
    } catch (error: unknown) {
      const CONFLICT_ERROR_CODE = 11000;
      const err = error as { code: number };
      if (err?.code === CONFLICT_ERROR_CODE) {
        throw new ConflictException('User with this email already exists.');
      }
      throw error;
    }
  }

  async login(data: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    const isValid = await this.comparePassword(user.password, data.password);
    if (isValid) {
      const accessToken = await this.generateToken(String(user._id));
      return { accessToken };
    }

    throw new UnauthorizedException('Invalid Credentials.');
  }
}
