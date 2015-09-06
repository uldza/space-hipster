
import PlayerBullet from './PlayerBullet';

class PlayerBullets extends Phaser.Group {
    constructor(game, player)
    {
        super(game, null, 'bullets', false, true);

        this.player = player;

        this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5, this.shoot, this);

        this.game.add.existing( this );
    }

    shoot()
    {
        let bullet = this.getFirstExists(false);

        //only create a bullet if there are no dead ones available to reuse
        if(!bullet)
        {
            bullet = new PlayerBullet(this.game, this.player.x, this.player.top);
            this.add(bullet);
        }
        else
        {
            //reset position
            bullet.reset(this.player.x, this.player.top);
        }

        //set velocity
        bullet.body.velocity.y = this.player.BULLET_SPEED;
    }
}


export default PlayerBullets;
