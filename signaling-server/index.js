import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const allUsers = {};

function getSocketIdByEmail(allUsers, toEmail) {
  for (const userId in allUsers) {
    if (allUsers[userId].email == toEmail) {
      return allUsers[userId].socket.id;
    }
  }
  return null;
}

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("user_loggined", (data) => {
    allUsers[socket.id] = {
      socket: socket,
      email: data.email,
      joinedVideoCall: false,
    };
  });

  socket.on("request_to_call", (data) => {
    let opponentUser;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.email === data.roomCreatorEmail && key !== socket.id) {
        opponentUser = user;
        break;
      }
    }

    if (opponentUser) {
      opponentUser.socket.emit("new_notification", {
        opponentUserData: data.currentUserData,
        roomGithubRepo: data.roomGithubRepo,
        roomId: data.roomId,
        roomCreatorLinkedinprofile: data.roomCreatorLinkedinprofile,
      });
    }
  });

  socket.on("opponent_joined", ({ email }) => {
    const opponentSocketId = getSocketIdByEmail(allUsers, email);
    io.to(opponentSocketId).emit("opponent_joined");
  });

  // socket.on("opponent_rejected", ({ email }) => {
  //   const opponentSocketId = getSocketIdByEmail(allUsers, email);
  //   if (opponentSocketId) {
  //     io.to(opponentSocketId).emit("opponent_rejected");
  //   } else {
  //     console.log(`No socket found for ${email}`);
  //   }
  // });

  socket.on("opponent_rejected", ({ roomId, email }) => {
    const opponentSocketId = getSocketIdByEmail(allUsers, email);
    if (opponentSocketId) {
      io.to(opponentSocketId).emit("opponent_rejected", { roomId });
    } else {
      console.log(`No socket found for ${email}`);
    }
  });

  socket.on("offer", ({ fromEmail, toEmail, offer }) => {
    const opponentSocketId = getSocketIdByEmail(allUsers, toEmail);
    io.to(opponentSocketId).emit("offer", { offer, opponentEmail: fromEmail });
  });

  socket.on("answer", ({ fromEmail, toEmail, answer }) => {
    const opponentSocketId = getSocketIdByEmail(allUsers, toEmail);
    io.to(opponentSocketId).emit("answer", { answer });
  });

  socket.on("icecandidate", ({ fromEmail, toEmail, candidate }) => {
    const opponentSocketId = getSocketIdByEmail(allUsers, toEmail);
    io.to(opponentSocketId).emit("icecandidate", { candidate });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    delete allUsers[socket.id];
  });
});

app.get("/", (req, res) => {
  res.send("Hello, from the server...");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Signaling server is running on port http://localhost:${PORT}`);
});
