const players = new Map();

export function addPlayer(playerId, roomCode) {
    players.set(playerId, {
        id: playerId,
        roomCode: roomCode,
        x: 720,
        y: 480,
        direction: "down"
    });
}

export function getPlayer(playerId) {
    return players.get(playerId);
}

export function getPlayersInRoom(roomCode) {
    return [...players.values()].filter(
        (player) => player.roomCode === roomCode
    );
}

export function removePlayer(playerId) {
    players.delete(playerId);
}