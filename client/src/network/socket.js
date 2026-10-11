import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected:", socket.id);
});

socket.on("connect_error", (error) => {
    console.log("Connection error:", error.message);
});

socket.on("player-joined", (data) => {
    console.log("New player joined:", data.playerId);
});