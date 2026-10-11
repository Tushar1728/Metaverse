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

    updatePosition(x, y) {
        this.sprite.setPosition(x, y);
    }

    destroy() {
        this.sprite.destroy();
    }
}