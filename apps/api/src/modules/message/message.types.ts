import { Document, Types } from "mongoose";

export type MessageType = "text" | "image" | "file" | "audio";

export interface IMessage extends Document {
  _id: Types.ObjectId;
  chat: Types.ObjectId; // ref → Chat
  sender: Types.ObjectId; // ref → User
  content: string; // text body or file URL
  type: MessageType;
  readBy: Types.ObjectId[]; // ref → User[] (read receipts)
  deletedFor: Types.ObjectId[]; // ref → User[] (soft-delete per user)
  isDeletedForAll: boolean; // hard delete for everyone
  createdAt: Date;
  updatedAt: Date;
}
