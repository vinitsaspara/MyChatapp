// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Create HTTP server and attach socket
const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
