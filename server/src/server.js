import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createRoom, roomExists } from "./rooms/roomManager.js";
import {
    addPlayer,
    getPlayersInRoom,
    removePlayer
} from "./players/playerManager.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
    });

    socket.on("create-room", (callback) => {
        const roomCode = createRoom();

        socket.join(roomCode);

        addPlayer(socket.id, roomCode);

        callback({
            success: true,
            roomCode
        });

        console.log(`${socket.id} created room ${roomCode}`);
    });

    socket.on("join-room", (roomCode, callback) => {
        if (!roomExists(roomCode)) {
            callback({
                success: false,
                message: "Room does not exist"
            });
            return;
        }

        socket.join(roomCode);

        const existingPlayers = getPlayersInRoom(roomCode);

        socket.to(roomCode).emit("player-joined", {
            playerId: socket.id
        });

        callback({
            success: true,
            roomCode,
            existingPlayers
        });

        console.log(`${socket.id} joined room ${roomCode}`);
    });
});

httpServer.listen(3000, () => {
    console.log("Server running on port 3000");
});