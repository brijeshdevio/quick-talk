import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Safe public projection — never expose password
export type PublicUser = Pick<
  IUser,
  "_id" | "username" | "email" | "avatar" | "bio" | "isOnline" | "lastSeen"
>;