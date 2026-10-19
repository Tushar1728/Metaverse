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
    }

    updatePosition(x, y, moving, direction) {
        this.sprite.setPosition(x, y);

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

    destroy() {
        this.sprite.destroy();
    }
}