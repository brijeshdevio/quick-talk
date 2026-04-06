import { Router } from "express";
import { ChatController } from "./chat.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createOneOnOneChatSchema,
  createGroupChatSchema,
  addParticipantsSchema,
  removeParticipantSchema,
  chatParamsSchema,
} from "./chat.schema";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

export const chatRouter = Router();
const chatController = new ChatController();

chatRouter.use(authMiddleware);

chatRouter.get("/", asyncHandler(chatController.getUserChats));

chatRouter.get(
  "/:chatId",
  validate(chatParamsSchema, "params"),
  asyncHandler(chatController.getChatById),
);

chatRouter.post(
  "/",
  validate(createOneOnOneChatSchema),
  asyncHandler(chatController.createOrGetOneOnOneChat),
);

chatRouter.post(
  "/group",
  validate(createGroupChatSchema),
  asyncHandler(chatController.createGroupChat),
);

chatRouter.patch(
  "/:chatId/add",
  validate(chatParamsSchema, "params"),
  validate(addParticipantsSchema),
  asyncHandler(chatController.addParticipants),
);

chatRouter.patch(
  "/:chatId/remove",
  validate(chatParamsSchema, "params"),
  validate(removeParticipantSchema),
  asyncHandler(chatController.removeParticipant),
);

chatRouter.delete(
  "/:chatId",
  validate(chatParamsSchema, "params"),
  asyncHandler(chatController.deleteChat),
);
