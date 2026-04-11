import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { User } from "../../modules/user/user.model";
import { env } from "../../config/env";

export interface AuthenticatedSocket extends Socket {
  user: {
    _id: string;
    username: string;
    avatar?: string;
  };
}

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void,
) => {
  try {
    // Parse cookies from handshake headers
    const rawCookies = socket.handshake.headers.cookie || "";
    const cookies = cookie.parse(rawCookies);
    const token = cookies["accessToken"]; // your cookie name

    // Fallback: also accept token from auth header (Postman testing)
    const headerToken = socket.handshake.auth?.token;
    const finalToken = token || headerToken;

    if (!finalToken) {
      return next(new Error("Unauthorized: No token provided"));
    }

    const decoded = jwt.verify(finalToken, env.JWT_SECRET) as {
      sub: string;
    };

    const user = await User.findById(decoded.sub).select("_id username avatar");
    if (!user) {
      console.error("🔴 User not found for token sub:", decoded.sub);
      return next(new Error("Unauthorized: User not found"));
    }

    (socket as AuthenticatedSocket).user = {
      _id: String(user._id),
      username: user.username,
      avatar: user.avatar,
    };

    next();
  } catch (err: any) {
    console.error("🔴 JWT Verify Error Stack:");
    console.error("finalToken: UNDEFINED/FALSY");
    console.error("Error instance:", err);
    next(new Error(`Unauthorized: Invalid token (${err.message})`));
  }
};
