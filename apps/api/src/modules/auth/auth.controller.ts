import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { clearCookie, setCookie } from "../../lib/cookie";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const data = await this.authService.register({ username, email, password });
    res.json(new ApiResponse(201, data, "Registration successful"));
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const accessToken = await this.authService.login({ email, password });
    setCookie(res, "accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json(new ApiResponse(200, null, "Login successful"));
  };

  logout = async (req: Request, res: Response) => {
    clearCookie(res, "accessToken");
    res.json(new ApiResponse(200, null, "Logout successful"));
  };
}
