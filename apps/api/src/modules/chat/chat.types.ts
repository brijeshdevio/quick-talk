import { Document, Types } from "mongoose";

export interface IChat extends Document {
  _id: Types.ObjectId;
  name?: string; // only for group chats
  isGroupChat: boolean;
  participants: Types.ObjectId[]; // ref → User
  admin?: Types.ObjectId; // ref → User (group only)
  lastMessage?: Types.ObjectId; // ref → Message (for sidebar preview)
  avatar?: string; // group avatar URL
  createdAt: Date;
  updatedAt: Date;
}
