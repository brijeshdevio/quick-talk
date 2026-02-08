import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// types
import type { QueryUsersDto } from './dto';

type TUserResponse = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  isOnline: boolean;
  lastSeenAt: Date | null;
  createdAt: Date;
};

type TUsersResponse = {
  id: string;
  name: string;
  avatar: string | null;
  isOnline: boolean;
  lastSeenAt: Date | null;
};

type TUsersResponseWithPagination = {
  users: TUsersResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string): Promise<TUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        isOnline: true,
        lastSeenAt: true,
        createdAt: true,
      },
    });

    if (user) return user;

    throw new UnauthorizedException('You are not logged in.');
  }

  async getUsers(
    userId: string,
    query: QueryUsersDto,
  ): Promise<TUsersResponseWithPagination> {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    const where = {
      id: {
        not: userId,
      },
      ...(query.q && { name: { contains: query.q } }),
    };
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          avatar: true,
          isOnline: true,
          lastSeenAt: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getUser(
    userId: string,
  ): Promise<Omit<TUserResponse, 'email' | 'createdAt'>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        isOnline: true,
        lastSeenAt: true,
      },
    });

    if (user) return user;

    throw new NotFoundException('User not found.');
  }
}
