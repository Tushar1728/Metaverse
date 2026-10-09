import Phaser from "phaser";
import GameScene from "./GameScene.js";

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

const game = new Phaser.Game(config);