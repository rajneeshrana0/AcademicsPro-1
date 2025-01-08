import { WebSocketServer, WebSocket } from "ws";

interface User {
  socket: WebSocket;
  room: string;
}

const allSockets: User[] = [];

const setupWebSocketServer = (port = 8080) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (data) => {
      try {
        const parsedMessage = JSON.parse(data.toString());

        if (parsedMessage.type === "join") {
          const roomId = parsedMessage.payload.roomId;
          console.log(`User joined room: ${roomId}`);

          const existingUserIndex = allSockets.findIndex(
            (user) => user.socket === socket
          );
          if (existingUserIndex >= 0) {
            allSockets[existingUserIndex].room = roomId;
          } else {
            allSockets.push({ socket, room: roomId });
          }
        }

        if (parsedMessage.type === "chat") {
          console.log("User sent a chat message");
          const currentUser = allSockets.find((user) => user.socket === socket);

          if (currentUser) {
            const currentRoom = currentUser.room;
            const message = parsedMessage.payload.message;

            allSockets.forEach((user) => {
              if (user.room === currentRoom && user.socket !== socket) {
                user.socket.send(message);
              }
            });
          } else {
            console.log("User is not in any room");
          }
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    socket.on("close", () => {
      console.log("Client disconnected");
      const index = allSockets.findIndex((user) => user.socket === socket);
      if (index >= 0) {
        allSockets.splice(index, 1);
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  console.log(`WebSocket Server is running on port ${port}`);
};

export default setupWebSocketServer;
