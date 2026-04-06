import http from "http";
import app from "./app";
import { connectToDatabase } from "./config/db";
import { initSocket } from "./config/socket";
import { registerSocketHandlers } from "./socket";

const httpServer = http.createServer(app);
const io = initSocket(httpServer);

registerSocketHandlers(io);

connectToDatabase().then(() => {
  httpServer.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
