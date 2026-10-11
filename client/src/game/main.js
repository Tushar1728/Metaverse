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
            debug: true
        }
    },
    backgroundColor: "#222222",
    scene: GameScene
};

export function startGame() {
    const game = new Phaser.Game(config);
    return game;
}