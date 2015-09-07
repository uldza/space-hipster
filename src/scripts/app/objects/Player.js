/*
 * Player
 */


class Player extends Phaser.Sprite {
    constructor (game, x, y)
    {
        super(game, x, y, 'player');

        // Player movement constants
        this.PLAYER_SPEED = 200;
        this.BULLET_SPEED = -1000;

        this.anchor.setTo(0.5);

        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.add.existing( this );
    }

    update()
    {
        //player has no direction by default
        let direction = 0;

        //listen to user touch screen
        if(this.game.input.activePointer.isDown)
        {
            let targetX = this.game.input.activePointer.position.x;
            //define the direction of the speed
            direction = targetX >= this.game.world.centerX ? 1 : -1;
        }

        // Listen for directional keys
        if(this.cursors.left.isDown || this.cursors.right.isDown)
        {
            direction = this.cursors.right.isDown ? 1 : -1;
        }

        // Move player
        this.body.velocity.x = direction * this.PLAYER_SPEED;
    }

    die(player, bullet)
    {
        player.kill();
        this.orchestra.stop();
        this.game.state.start('Game');
    }
}


export default Player;
