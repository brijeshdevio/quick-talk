import { Request, Response } from "express";
import { UserService } from "./user.service";
import { ApiResponse } from "../../utils/ApiResponse";

export class UserController {
  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  // GET /users/me
  getMe = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const user = await UserService.getMe(userId);
    res.json(new ApiResponse(200, user, "Profile fetched"));
  };

  // GET /users/:userId
  getUserById = async (req: Request, res: Response) => {
    const userId = req.params?.userId as string;
    const user = await UserService.getUserById(userId);
    res.json(new ApiResponse(200, user, "User fetched"));
  };

  // GET /users/search?q=john&page=1&limit=10
  searchUsers = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const { q, page, limit } = req.query as any; // Zod already parsed + transformed
    const result = await UserService.searchUsers(q, userId, page, limit);
    res.json(new ApiResponse(200, result, "Users fetched"));
  };

  // PATCH /users/me
  updateProfile = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const updated = await UserService.updateProfile(userId, req.body);
    res.json(new ApiResponse(200, updated, "Profile updated"));
  };
}
