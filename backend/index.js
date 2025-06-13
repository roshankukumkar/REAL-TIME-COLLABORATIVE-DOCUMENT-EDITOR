// server/index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

const documents = {}; // Store docs in memory (for demo purpose)

io.on("connection", (socket) => {
  console.log("✅ New client connected");

  socket.on("get-document", (documentId) => {
    // Create document if not exists
    if (!documents[documentId]) {
      documents[documentId] = defaultValue;
    }

    // Send the document back to client
    socket.join(documentId);
    socket.emit("load-document", documents[documentId]);

    // Receive changes and broadcast to others
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // Save the document content
    socket.on("save-document", (data) => {
      documents[documentId] = data;
    });
  });
});

app.use(cors());

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
