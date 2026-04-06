import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./auth.schema";
import { authMiddleware } from "../../middleware/auth.middleware";

export const authRouter = Router();
const authController = new AuthController(new AuthService());

authRouter.post("/register", validate(RegisterSchema), authController.register);
authRouter.post("/login", validate(LoginSchema), authController.login);
authRouter.post("/logout", authMiddleware, authController.logout);
