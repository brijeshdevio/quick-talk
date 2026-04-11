import { hashPassword, verifyPassword } from "../../lib/argon";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt";
import { hashString, randomString } from "../../lib/crypto";
import { ApiError } from "../../utils/ApiError";
import { User } from "../user/user.model";
import { RefreshToken } from "./refreshToken.model";

import { LoginDto, RegisterDto } from "./auth.schema";

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor() {}

  register = async (data: RegisterDto) => {
    try {
      const hashedPassword = await hashPassword(data.password);
      const user = await User.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      const err = error as { code: number };
      if (err?.code === 11000) {
        throw new ApiError(
          409,
          `${data.email} already exists. Use another email.`,
        );
      }
      throw new ApiError(500, "Internal server error");
    }
  };

  login = async (data: LoginDto): Promise<TokenPair> => {
    const user = await User.findOne({ email: data.email });

    const passwordHash = user?.password ?? DUMMY_HASH;
    const isPasswordValid = await verifyPassword(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    return this._issueTokenPair(String(user._id));
  };

  refresh = async (rawRefreshToken: string): Promise<TokenPair> => {
    // 1. Verify JWT signature & expiry
    let payload: { sub: string };
    try {
      payload = verifyRefreshToken<{ sub: string }>(rawRefreshToken);
    } catch {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    // 2. Look up the hashed token in DB
    const tokenHash = hashString(rawRefreshToken);
    const storedToken = await RefreshToken.findOneAndDelete({ tokenHash });

    if (!storedToken) {
      // Token was already used or revoked — possible token theft.
      // Revoke ALL refresh tokens for this user as a safety measure.
      await RefreshToken.deleteMany({ userId: payload.sub });
      throw new ApiError(401, "Refresh token reuse detected");
    }

    // 3. Issue a new token pair (rotation)
    return this._issueTokenPair(payload.sub);
  };

  logout = async (userId: string): Promise<void> => {
    // Revoke all refresh tokens for this user
    await RefreshToken.deleteMany({ userId });
  };

  // ─── Private Helpers ────────────────────────────────────────
  private _issueTokenPair = async (userId: string): Promise<TokenPair> => {
    const accessToken = signAccessToken({ sub: userId });

    // Generate a random refresh token and sign it as a JWT for expiry verification
    const refreshToken = signRefreshToken({ sub: userId });

    // Store hashed version in DB
    await RefreshToken.create({
      tokenHash: hashString(refreshToken),
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return { accessToken, refreshToken };
  };
}
