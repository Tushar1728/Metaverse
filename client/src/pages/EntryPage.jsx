import { useState } from "react";
import { socket } from "../network/socket";
import { setGameState } from "../network/gameState";
import { startGame } from "../game/main.js";

function EntryPage() {
    const [roomCode, setRoomCode] = useState("");

    const createRoom = () => {
        console.log("Create button clicked");

        socket.emit("create-room", (response) => {
            console.log(response);

            if (response.success) {
                setGameState(
                    response.roomCode,
                    []
                );

                startGame();
            }
        });
    };

    const joinRoom = () => {
        socket.emit("join-room", roomCode, (response) => {
            console.log("Join response:", response);

            if (response.success) {
                setGameState(
                    response.roomCode,
                    response.existingPlayers
                );

                startGame();
            }
        });
    };

    return (
        <div>
            <h1>Metaverse</h1>

            <button onClick={createRoom}>
                Create Room
            </button>

            <div>
                <input
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Enter room code"
                />

                <button onClick={joinRoom}>
                    Join Room
                </button>
            </div>
        </div>
    );
}

export default EntryPage;