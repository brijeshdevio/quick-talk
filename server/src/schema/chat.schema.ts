import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: String, default: null })
  groupName?: string;

  @Prop({ type: Boolean, default: false })
  isGroup?: boolean;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'User' })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  lastMessage?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
