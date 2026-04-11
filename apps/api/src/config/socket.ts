import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { env } from "./env";

let io: Server;

export const initSocket = (httpServer: HTTPServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND,
      credentials: true, // required for cookies
    },
  });
  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
