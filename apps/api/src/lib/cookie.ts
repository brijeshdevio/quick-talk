import { CookieOptions, Response } from "express";
import { env } from "../config/env";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
};

// ─── Access Token Cookie ────────────────────────────────────
export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions,
) => {
  res.cookie(name, value, {
    ...baseCookieOptions,
    ...options,
  });
};

export const clearCookie = (res: Response, name: string) => {
  res.clearCookie(name, baseCookieOptions);
};

// ─── Refresh Token Cookie ───────────────────────────────────
const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    ...baseCookieOptions,
    path: "/api/auth/refresh",
    maxAge: REFRESH_MAX_AGE,
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    ...baseCookieOptions,
    path: "/api/auth/refresh",
  });
};
