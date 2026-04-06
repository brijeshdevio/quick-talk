import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "../../modules/user/user.model";

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

    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET!) as {
      _id: string;
    };

    const user = await User.findById(decoded._id).select("_id username avatar");
    if (!user) return next(new Error("Unauthorized: User not found"));

    (socket as AuthenticatedSocket).user = {
      _id: String(user._id),
      username: user.username,
      avatar: user.avatar,
    };

    next();
  } catch (err) {
    next(new Error("Unauthorized: Invalid token"));
  }
};
