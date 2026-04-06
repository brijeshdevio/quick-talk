import { hashPassword, verifyPassword } from "../../lib/argon";
import { signJwt } from "../../lib/jwt";
import { ApiError } from "../../utils/ApiError";
import { User } from "../user/user.model";

import { LoginDto, RegisterDto } from "./auth.schema";

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

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

  login = async (data: LoginDto): Promise<string> => {
    const user = await User.findOne({ email: data.email });

    const passwordHash = user?.password ?? DUMMY_HASH;
    const isPasswordValid = await verifyPassword(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    return signJwt({ sub: user.id });
  };
}
