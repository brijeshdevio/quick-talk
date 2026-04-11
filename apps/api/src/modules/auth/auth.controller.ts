import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import {
  setCookie,
  clearCookie,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../../lib/cookie";
import { ApiError } from "../../utils/ApiError";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const data = await this.authService.register({ username, email, password });
    res.json(new ApiResponse(201, data, "Registration successful"));
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await this.authService.login({
      email,
      password,
    });

    setCookie(res, "accessToken", accessToken, {
      maxAge: 1000 * 60 * 15, // 15 minutes
    });
    setRefreshTokenCookie(res, refreshToken);

    res.json(new ApiResponse(200, null, "Login successful"));
  };

  refresh = async (req: Request, res: Response) => {
    const rawRefreshToken = req.cookies?.["refreshToken"];

    if (!rawRefreshToken) {
      throw new ApiError(401, "Missing refresh token");
    }

    const { accessToken, refreshToken } =
      await this.authService.refresh(rawRefreshToken);

    setCookie(res, "accessToken", accessToken, {
      maxAge: 1000 * 60 * 15, // 15 minutes
    });
    setRefreshTokenCookie(res, refreshToken);

    res.json(new ApiResponse(200, null, "Token refreshed"));
  };

  logout = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (userId) {
      await this.authService.logout(userId);
    }

    clearCookie(res, "accessToken");
    clearRefreshTokenCookie(res);

    res.json(new ApiResponse(200, null, "Logout successful"));
  };
}
