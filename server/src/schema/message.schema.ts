import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: String })
  content: string;

  @Prop({ type: Types.ObjectId, required: true })
  sender: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isDelivered: boolean;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Chat' })
  chat: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
