import { useState } from "react";
import { socket } from "../network/socket";
import { setGameState } from "../network/gameState";

function EntryPage({ onEnterWorld }) {
    const [roomCode, setRoomCode] = useState("");
    const [playerName, setPlayerName] = useState("");

    const createRoom = () => {
        if (!playerName.trim()) {
            alert("Please enter your name");
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("create-room", (response) => {
            if (response.success) {
                setGameState(response.roomCode, []);
                onEnterWorld();
            }
        });
    };

    const joinRoom = () => {
        if (!playerName.trim()) {
            alert("Please enter your name");
            return;
        }

        if (!roomCode.trim()) {
            alert("Please enter a room code");
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit(
            "join-room",
            roomCode.toUpperCase(),
            (response) => {
                if (response.success) {
                    setGameState(
                        response.roomCode,
                        response.existingPlayers
                    );

                    onEnterWorld();
                } else {
                    alert(response.message);
                }
            }
        );
    };

    return (
        <div
            className="
                min-h-screen
                w-full
                bg-cover
                bg-center
                bg-no-repeat
                flex
                items-center
                justify-center
                relative
            "
            style={{
                backgroundImage: "url('../../public/entry-page-bg.png')"
            }}
        >

            {/* Main entry card */}
            <div
                className="
                    w-[360px]
                    max-w-[90%]
                    rounded-[28px]
                    bg-white/55
                    backdrop-blur-md
                    border
                    border-white/70
                    shadow-2xl
                    p-7
                    translate-y-[25px]
                "
            >

                {/* Name */}
                <div className="mb-5">

                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            mb-2
                            ml-1
                            text-sm
                            font-bold
                            text-blue-900
                        "
                    >
                        <span>👤</span>
                        Your Name
                    </label>

                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) =>
                            setPlayerName(e.target.value)
                        }
                        placeholder="Enter your name..."
                        className="
                            w-full
                            h-11
                            px-4
                            rounded-xl
                            bg-white/90
                            border
                            border-blue-100
                            outline-none
                            text-gray-800
                            placeholder:text-gray-400
                            shadow-sm
                            focus:border-blue-400
                            focus:ring-2
                            focus:ring-blue-200
                        "
                    />

                </div>


                {/* Create Room */}
                <button
                    onClick={createRoom}
                    className="
                        w-full
                        h-12
                        rounded-full

                        bg-blue-500
                        hover:bg-blue-600

                        text-white
                        font-extrabold
                        text-base

                        shadow-[0_4px_0_#1d4ed8]

                        transition-all
                        duration-150

                        hover:scale-[1.02]
                        active:translate-y-1
                        active:shadow-[0_1px_0_#1d4ed8]
                    "
                >
                    🌐 &nbsp; CREATE ROOM
                </button>


                {/* OR */}
                <div
                    className="
                        flex
                        items-center
                        gap-3
                        my-5
                    "
                >
                    <div className="h-px flex-1 bg-blue-300/60" />

                    <span
                        className="
                            text-xs
                            font-bold
                            text-blue-800
                        "
                    >
                        OR
                    </span>

                    <div className="h-px flex-1 bg-blue-300/60" />
                </div>


                {/* Room Code */}
                <div className="mb-5">

                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            mb-2
                            ml-1
                            text-sm
                            font-bold
                            text-blue-900
                        "
                    >
                        <span>👥</span>
                        Room Code
                    </label>

                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) =>
                            setRoomCode(
                                e.target.value.toUpperCase()
                            )
                        }
                        placeholder="Enter room code..."
                        className="
                            w-full
                            h-11
                            px-4
                            rounded-xl
                            bg-white/90
                            border
                            border-blue-100
                            outline-none
                            text-gray-800
                            uppercase
                            placeholder:normal-case
                            placeholder:text-gray-400
                            shadow-sm
                            focus:border-green-400
                            focus:ring-2
                            focus:ring-green-200
                        "
                    />

                </div>


                {/* Join Room */}
                <button
                    onClick={joinRoom}
                    className="
                        w-full
                        h-12
                        rounded-full

                        bg-emerald-500
                        hover:bg-emerald-600

                        text-white
                        font-extrabold
                        text-base

                        shadow-[0_4px_0_#047857]

                        transition-all
                        duration-150

                        hover:scale-[1.02]
                        active:translate-y-1
                        active:shadow-[0_1px_0_#047857]
                    "
                >
                    👥 &nbsp; JOIN ROOM
                </button>

            </div>

        </div>
    );
}

export default EntryPage;