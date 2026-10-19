import Phaser from "phaser";
import GameScene from "./GameScene";

const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    backgroundColor: "#222222",

    scene: GameScene
};

export function startGame(parent) {
    const gameConfig = {
        ...config,
        parent: parent
    };

    const game = new Phaser.Game(gameConfig);

    return game;
}