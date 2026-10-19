import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createRoom, roomExists } from "./rooms/roomManager.js";
import {
    addPlayer,
    getPlayer,
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

    socket.on("player-move", (data) => {
        const player = getPlayer(socket.id);

        if (!player) {
            return;
        }

        player.x = data.x;
        player.y = data.y;
        player.direction = data.direction;

        socket.to(player.roomCode).emit("player-moved", {
            playerId: socket.id,
            x: player.x,
            y: player.y,
            moving: data.moving,
            direction: data.direction
        });
    });

    socket.on("disconnect", () => {
        const player = getPlayer(socket.id);

        if (!player) {
            console.log("Player disconnected:", socket.id);
            return;
        }

        removePlayer(socket.id);

        socket.to(player.roomCode).emit("player-disconnected", {
            playerId: socket.id
        });

        console.log(
            `${socket.id} left room ${player.roomCode}`
        );
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

        const existingPlayers = getPlayersInRoom(roomCode);

        socket.join(roomCode);

        addPlayer(socket.id, roomCode);

        const player = getPlayer(socket.id);

        socket.to(roomCode).emit("player-joined", {
            player: player
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