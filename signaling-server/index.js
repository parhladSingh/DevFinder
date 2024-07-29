import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],   
  },
});




io.on('connection', (socket) => {
  // console.log('a user connected:', socket.id);

  socket.on('join-room', (roomId) => {
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  socket.on('offer', (data) => {
    console.log(`Offer from ${data.userId} in room ${data.roomId}`);
    socket.to(data.roomId).emit('offer', data);
  });

  socket.on('answer', (data) => {
    console.log(`Answer from ${data.userId} in room ${data.roomId}`);
    socket.to(data.roomId).emit('answer', data);
  });

  socket.on('candidate', (data) => {
    console.log(`Candidate from ${data.userId} in room ${data.roomId}`);
    socket.to(data.roomId).emit('candidate', data);
  });
 

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
       