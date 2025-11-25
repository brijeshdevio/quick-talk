import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private isValidMongoID(_id: string): boolean {
    if (isValidObjectId(_id)) return true;
    throw new BadRequestException(`Invalid ID: ${_id}`);
  }

  async getProfile(userId: string) {
    this.isValidMongoID(userId);
    const user = await this.userModel
      .findById(userId)
      .lean()
      .select('-__v -password');
    if (user) {
      return user;
    }

    throw new UnauthorizedException(
      'You are not authorized to access this resource.',
    );
  }

  async getUsers(userId: string): Promise<User[]> {
    return await this.userModel
      .find({ _id: { $ne: userId } })
      .lean()
      .select('_id name email');
  }
}
