import { Schema, model } from "mongoose";
import { IChat } from "./chat.types";

const chatSchema = new Schema<IChat>(
  {
    name: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

// Prevent duplicate 1-on-1 chats at DB level
chatSchema.index({ participants: 1 });

export const Chat = model<IChat>("Chat", chatSchema);
