import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../lib/jwt";
import { ApiError } from "../utils/ApiError";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.["accessToken"];

  if (!token) {
    throw new ApiError(401, `Missing access token`);
  }

  try {
    const payload = verifyJwt(token) as { sub: string };

    (req as any).user = {
      id: payload.sub,
    };
    next();
  } catch {
    throw new ApiError(401, `Invalid access token`);
  }
}
