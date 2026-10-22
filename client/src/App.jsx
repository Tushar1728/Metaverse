import { useState } from "react";
import EntryPage from "./pages/EntryPage.jsx";
import GameScreen from "./pages/GameScreen.jsx";
import { socket } from "./network/socket";

function App() {
    const [inGame, setInGame] = useState(false);

    return (
        <>
            {inGame ? (
                <GameScreen
                    onLeaveWorld={() => {
                        socket.disconnect();
                        setInGame(false);
                    }}
                />
            ) : (
                <EntryPage
                    onEnterWorld={() => setInGame(true)}
                />
            )}
        </>
    );
}

export default App;