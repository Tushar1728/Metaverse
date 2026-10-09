import Phaser from "phaser";

import officeMap from "../assets/game/maps/office.json";

import officeTiles from "../assets/game/tilesets/A4_Modern_Inside_Rasak.png";
import furnitureTiles from "../assets/game/tilesets/Tileset_Modern_Livingroom_Rasak.png";
import decorationTiles from "../assets/game/tilesets/Tileset_Modern_House_Decoration_Rasak.png";

import playerImg from "../assets/game/characters/player.png";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {

        // Map
        this.load.tilemapTiledJSON("office", officeMap);

        // Tilesets
        this.load.image("Rasak_Office", officeTiles);
        this.load.image("Rasak_Furnitures", furnitureTiles);
        this.load.image("Rasak_Decoration", decorationTiles);

        // Player
        this.load.image("player", playerImg);
    }

    create() {

        // Create map
        const map = this.make.tilemap({
            key: "office"
        });

        // Connect tilesets
        const officeTileset = map.addTilesetImage(
            "Rasak_Office",
            "Rasak_Office"
        );

        const furnitureTileset = map.addTilesetImage(
            "Rasak_Furnitures",
            "Rasak_Furnitures"
        );

        const decorationTileset = map.addTilesetImage(
            "Rasak_Decoration",
            "Rasak_Decoration"
        );

        // Create map layer
        this.layer = map.createLayer(
            "Tile Layer 1",
            [
                officeTileset,
                furnitureTileset,
                decorationTileset
            ],
            0,
            0
        );


        // Create player
        this.player = this.add.image(
            720,
            480,
            "player"
        );

        // Make player roughly one tile
        this.player.setDisplaySize(48, 48);


        // Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();


        // Camera boundaries
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        // Camera follows player
        this.cameras.main.startFollow(this.player);
    }


    update() {

        if (this.cursors.left.isDown) {
            this.player.x -= 1.5;
        }

        if (this.cursors.right.isDown) {
            this.player.x += 1.5;
        }

        if (this.cursors.up.isDown) {
            this.player.y -= 1.5;
        }

        if (this.cursors.down.isDown) {
            this.player.y += 1.5;
        }
    }
}