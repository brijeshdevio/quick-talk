import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = z
  .string({ message: "ID is required" })
  .regex(objectIdRegex, "Invalid ID format");

export const createOneOnOneChatSchema = z.object({
  targetUserId: objectId,
});

export const createGroupChatSchema = z.object({
  name: z
    .string({ message: "Group name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .trim(),

  participantIds: z
    .array(objectId, { message: "Participants are required" })
    .min(2, "Group chat requires at least 2 other participants")
    .max(50, "Group cannot exceed 50 participants"),

  avatar: z.string().url("Avatar must be a valid URL").optional(),
});

export const addParticipantsSchema = z.object({
  participantIds: z
    .array(objectId)
    .min(1, "Provide at least one participant to add")
    .max(50, "Too many participants"),
});

export const removeParticipantSchema = z.object({
  targetId: objectId,
});

export const chatParamsSchema = z.object({
  chatId: objectId,
});

// Inferred types — use in service/controller if needed
export type CreateOneOnOneChatDto = z.infer<typeof createOneOnOneChatSchema>;
export type CreateGroupChatDto = z.infer<typeof createGroupChatSchema>;
export type AddParticipantsDto = z.infer<typeof addParticipantsSchema>;
export type RemoveParticipantDto = z.infer<typeof removeParticipantSchema>;
