import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

import userRouter from "./routes/userroutes";
import braintwoRouter from "./routes/student/braintworoutes";
import "./config/db";
import setupWebSocketServer from "./services/chatServices";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", braintwoRouter);

// Create a shared HTTP server
const server = http.createServer(app);

// Setup WebSocket server on the shared HTTP server
setupWebSocketServer(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server (HTTP + WebSocket) is running on port ${PORT}`);
});
