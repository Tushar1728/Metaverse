let currentRoom = null;
let existingPlayers = [];

export function setGameState(roomCode, players) {
    currentRoom = roomCode;
    existingPlayers = players;
}

export function getGameState() {
    return {
        roomCode: currentRoom,
        existingPlayers
    };
}