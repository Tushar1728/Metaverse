import { useEffect, useRef } from "react";
import { socket } from "../network/socket";
import { startGame } from "../game/main.js";

function GameScreen({ onLeaveWorld }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    useEffect(() => {
        gameRef.current = startGame(gameContainer.current);

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    const leaveWorld = () => {
        socket.disconnect();
        onLeaveWorld();
    };

    return (
        <div className="relative w-screen h-screen">

            {/* Phaser game */}
            <div
                ref={gameContainer}
                className="w-full h-full"
            />

            {/* Leave button */}
            <button
                onClick={leaveWorld}
                title="Leave World"
                className="
                    absolute
                    top-5
                    right-5
                    z-50

                    w-14
                    h-14

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-150

                    active:translate-y-1
                    
                "
            >
                <img
                    src="/exit-icon.png"
                    alt="Leave"
                    className="w-9 h-9 object-contain"
                />
            </button>

        </div>
    );
}

export default GameScreen;