import { Router } from "express";
import { MessageController } from "./message.controller";

import { asyncHandler } from "../../utils/asyncHandler";
import {
  sendMessageSchema,
  getMessagesQuerySchema,
  chatIdParamsSchema,
  messageParamsSchema,
} from "./message.schema";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

export const messageRouter = Router();
const messageController = new MessageController();

messageRouter.use(authMiddleware);

messageRouter.get(
  "/:chatId",
  validate(chatIdParamsSchema, "params"),
  validate(getMessagesQuerySchema, "query"),
  asyncHandler(messageController.getMessages),
);

messageRouter.post(
  "/:chatId",
  validate(chatIdParamsSchema, "params"),
  validate(sendMessageSchema),
  asyncHandler(messageController.sendMessage),
);

messageRouter.patch(
  "/:chatId/read",
  validate(chatIdParamsSchema, "params"),
  asyncHandler(messageController.markAsRead),
);

messageRouter.delete(
  "/:messageId/all",
  validate(messageParamsSchema, "params"),
  asyncHandler(messageController.deleteForAll),
);

messageRouter.delete(
  "/:messageId/me",
  validate(messageParamsSchema, "params"),
  asyncHandler(messageController.deleteForMe),
);
