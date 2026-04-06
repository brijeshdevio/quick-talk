import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = z
  .string({ message: "ID is required" })
  .regex(objectIdRegex, "Invalid ID format");

export const sendMessageSchema = z.object({
  content: z
    .string({ message: "Message content is required" })
    .min(1, "Message cannot be empty")
    .max(2000, "Message too long")
    .trim(),

  type: z.enum(["text", "image", "file", "audio"]).default("text"),
});

export const getMessagesQuerySchema = z.object({
  cursor: z
    .string()
    .datetime({ message: "Cursor must be a valid ISO datetime" })
    .optional(),
});

export const messageParamsSchema = z.object({
  messageId: objectId,
});

export const chatIdParamsSchema = z.object({
  chatId: objectId,
});

// Inferred types
export type SendMessageDto = z.infer<typeof sendMessageSchema>;
export type GetMessagesQueryDto = z.infer<typeof getMessagesQuerySchema>;
