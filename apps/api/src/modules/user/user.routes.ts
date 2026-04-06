import { Router } from "express";
import { UserController } from "./user.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  updateProfileSchema,
  changePasswordSchema,
  searchUsersQuerySchema,
  userParamsSchema,
} from "./user.schema";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

export const userRouter = Router();
const userController = new UserController();

userRouter.use(authMiddleware);

// Own profile
userRouter.get("/me", asyncHandler(userController.getMe));

userRouter.patch(
  "/me",
  validate(updateProfileSchema),
  asyncHandler(userController.updateProfile),
);

// Search — must be before /:userId to avoid conflict
userRouter.get(
  "/search",
  validate(searchUsersQuerySchema, "query"),
  asyncHandler(userController.searchUsers),
);

// Other users
userRouter.get(
  "/:userId",
  validate(userParamsSchema, "params"),
  asyncHandler(userController.getUserById),
);
