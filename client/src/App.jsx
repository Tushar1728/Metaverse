import { useState } from "react";
import EntryPage from "./pages/EntryPage.jsx";
import GameScreen from "./pages/GameScreen.jsx";

function App() {
    const [inGame, setInGame] = useState(false);

    return (
        <>
            {inGame ? (
                <GameScreen
                    onLeaveWorld={() => setInGame(false)}
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