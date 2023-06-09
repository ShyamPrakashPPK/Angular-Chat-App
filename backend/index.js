import express from "express";
import http from "http";
import { Server } from 'socket.io';


const app = express()
const server = http.createServer(app)
const io = new Server(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message });
    });
})
