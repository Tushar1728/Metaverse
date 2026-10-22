export default class RemotePlayer {
    constructor(scene, playerData) {
        console.log("Creating remote player:", playerData);

        this.scene = scene;

        this.sprite = scene.physics.add.sprite(
            playerData.x,
            playerData.y,
            "player"
        );

        this.sprite.setFrame(0);

        // Position received from the server
        this.targetX = playerData.x;
        this.targetY = playerData.y;
    }

    updatePosition(x, y, moving, direction) {

        // Don't immediately move the sprite.
        // Store the server position as the target.
        this.targetX = x;
        this.targetY = y;

        console.log("REMOTE SPRITE:", this.sprite);
        console.log("REMOTE ANIMS:", this.sprite.anims);

        console.log("REMOTE PLAYER SCENE:", this.scene);
        console.log("REMOTE SPRITE SCENE:", this.sprite.scene);
        console.log("REMOTE SPRITE ANIMS:", this.sprite.anims);

        // Player stopped
        if (!moving) {
            this.sprite.anims.stop();

            if (direction === "down") {
                this.sprite.setFrame(0);
            }
            else if (direction === "up") {
                this.sprite.setFrame(4);
            }
            else if (direction === "left") {
                this.sprite.setFrame(8);
            }
            else if (direction === "right") {
                this.sprite.setFrame(12);
            }

            return;
        }

        // Player is moving
        if (direction === "down") {
            this.sprite.anims.play("walk-down", true);
        }
        else if (direction === "up") {
            this.sprite.anims.play("walk-up", true);
        }
        else if (direction === "left") {
            this.sprite.anims.play("walk-left", true);
        }
        else if (direction === "right") {
            this.sprite.anims.play("walk-right", true);
        }
    }

    update() {
        const interpolationSpeed = 0.2;

        this.sprite.x +=
            (this.targetX - this.sprite.x) * interpolationSpeed;

        this.sprite.y +=
            (this.targetY - this.sprite.y) * interpolationSpeed;
    }

    destroy() {
        this.sprite.destroy();
    }
}