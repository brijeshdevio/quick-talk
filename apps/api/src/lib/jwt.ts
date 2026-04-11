import jwt from "jsonwebtoken";
import { env } from "../config/env";

// ─── Access Token (short-lived: 15m) ────────────────────────
export const signAccessToken = (payload: Record<string, any>): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "15m" });
};

export const verifyAccessToken = <T>(token: string): T => {
  return jwt.verify(token, env.JWT_SECRET) as unknown as T;
};

// ─── Refresh Token (long-lived: 7d) ─────────────────────────
export const signRefreshToken = (payload: Record<string, any>): string => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = <T>(token: string): T => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as unknown as T;
};

// ─── Backward-compat aliases ─────────────────────────────────
export const signJwt = signAccessToken;
export const verifyJwt = verifyAccessToken;
