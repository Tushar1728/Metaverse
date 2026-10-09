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

        const map = this.make.tilemap({
            key: "office"
        });

        // Tilesets
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

        // Office map
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


        // Player
        this.player = this.physics.add.image(
            720,
            480,
            "player"
        );

        this.player.setDisplaySize(48, 48);


        // Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });


        // Collision objects from Tiled
        const collisionObjects = map.getObjectLayer("Collision");

        this.collisionGroup = this.physics.add.staticGroup();


        collisionObjects.objects.forEach((object) => {

            const collision = this.collisionGroup.create(
                object.x + object.width / 2,
                object.y + object.height / 2,
                null
            );

            collision.setSize(
                object.width,
                object.height
            );

            collision.setVisible(false);
        });


        // Player vs environment
        this.physics.add.collider(
            this.player,
            this.collisionGroup
        );


        // Camera
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        this.cameras.main.startFollow(this.player);
    }


    update() {

        let velocityX = 0;
        let velocityY = 0;

        // Horizontal
        if (this.cursors.left.isDown || this.keys.left.isDown) {
            velocityX = -150;
        }
        else if (this.cursors.right.isDown || this.keys.right.isDown) {
            velocityX = 150;
        }

        // Vertical
        if (this.cursors.up.isDown || this.keys.up.isDown) {
            velocityY = -150;
        }
        else if (this.cursors.down.isDown || this.keys.down.isDown) {
            velocityY = 150;
        }


        // Prevent diagonal movement from being faster
        if (velocityX !== 0 && velocityY !== 0) {
            const length = Math.sqrt(
                velocityX * velocityX +
                velocityY * velocityY
            );

            velocityX = (velocityX / length) * 150;
            velocityY = (velocityY / length) * 150;
        }


        this.player.setVelocity(
            velocityX,
            velocityY
        );
    }
}