
import EnemyBullet from './EnemyBullet';
import EnemyBullets from './EnemyBullets';

class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key, health)
    {
        super(game, x, y, key);

        this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
        this.anchor.setTo(0.5);
        this.health = health;

        this.enemyBullets = new EnemyBullets(this.game);

        this.enemyTimer = this.game.time.create(false);
        this.enemyTimer.start();

        this.scheduleShooting();
    }

    update()
    {
        //bounce on the borders
        if(this.position.x < 0.05 * this.game.world.width)
        {
            this.position.x = 0.05 * this.game.world.width + 2;
            this.body.velocity.x *= -1;
        }
        else if(this.position.x > 0.95 * this.game.world.width)
        {
            this.position.x = 0.95 * this.game.world.width - 2;
            this.body.velocity.x *= -1;
        }

        //kill if off world in the bottom
        if(this.position.y > this.game.world.height)
        {
            this.kill();
        }
    }
    damage(amount)
    {
        super.damage(amount);
        this.play('getHit');

        //particle explosion
        if(this.health <= 0)
        {
            let emitter = this.game.add.emitter(this.x, this.y, 100);

            emitter.makeParticles('enemyParticle');
            emitter.minParticleSpeed.setTo(-200, -200);
            emitter.maxParticleSpeed.setTo(200, 200);
            emitter.gravity = 0;
            emitter.start(true, 500, null, 100);

            this.enemyTimer.pause();
        }
    }

    reset(x, y, health, key, scale, speedX, speedY)
    {
        super.reset(this, x, y, health);
        this.loadTexture(key);
        this.scale.setTo(scale);
        this.body.velocity.x = speedX;
        this.body.velocity.y = speedY;

        this.enemyTimer.resume();
    }

    scheduleShooting()
    {
        this.shoot();
        this.enemyTimer.add(Phaser.Timer.SECOND * 2, this.scheduleShooting, this);
    }

    shoot()
    {
        let bullet = this.enemyBullets.getFirstExists(false);

        if(!bullet)
        {
            bullet = new EnemyBullet(this.game, this.x, this.bottom);
            this.enemyBullets.add(bullet);
        }
        else
        {
            bullet.reset(this.x, this.y);
        }

        bullet.body.velocity.y = 100;
    }
}

export default Enemy;
