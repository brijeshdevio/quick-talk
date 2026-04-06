import { Socket } from "socket.io";
import cookie from "cookie";
import { verifyJwt } from "../lib/jwt";

export interface AuthenticatedSocket extends Socket {
  userId: string;
}

export function socketAuthMiddleware(
  socket: Socket,
  next: (err?: Error) => void,
) {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies["accessToken"];

    if (!token) {
      return next(new Error("Authentication error: Missing access token"));
    }

    const payload = verifyJwt<{ sub: string }>(token);
    (socket as AuthenticatedSocket).userId = payload.sub;
    next();
  } catch {
    next(new Error("Authentication error: Invalid access token"));
  }
}
