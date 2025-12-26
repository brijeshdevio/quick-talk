import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import { Chat, ChatSchema } from 'src/schema/chat.schema';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
    ChatModule
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
