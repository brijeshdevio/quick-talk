import { Schema, model } from "mongoose";
import { IMessage, MessageType } from "./message.types";

const MESSAGE_TYPES: MessageType[] = ["text", "image", "file", "audio"];

const messageSchema = new Schema<IMessage>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true, // fetch all messages by chat fast
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: MESSAGE_TYPES,
      default: "text",
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    deletedFor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDeletedForAll: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Paginate messages per chat efficiently
messageSchema.index({ chat: 1, createdAt: -1 });

export const Message = model<IMessage>("Message", messageSchema);
