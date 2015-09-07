/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Player from '../objects/Player';
import Enemy from '../objects/Enemy';
import PlayerBullets from '../objects/PlayerBullets';
import EnemyBullets from '../objects/EnemyBullets';

export default class Game extends Phaser.State {
    init( currentLevel )
    {
        //level data
        this.numLevels = 3;
        this.currentLevel = currentLevel ? currentLevel : 1;
        this.game.started = false;
    }

    create()
    {
        //moving stars background
        this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        this.background.autoScroll(0, 30);
        // Add start game event
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.startGame, this);

        // Add game sound
        this.orchestra = this.add.audio('orchestra');
        this.orchestra.play();

        // Level start texts
        this.levelText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'LEVEL ' + this.currentLevel, { font: '30px Verdana', fill: '#fff' });
        this.levelText.anchor.setTo(0.5);

        this.tapToStart = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'tap to start the game', { font: '18px Verdana', fill: '#fff' });
        this.tapToStart.anchor.setTo(0.5);

        // Add player
        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 50);
        // Add player bullets
        this.playerBullets = new PlayerBullets(this.game, this.player);

        // Create enemy group
        this.enemies = this.add.group();
        this.enemies.enableBody = true;

        this.enemyBullets = new EnemyBullets(this.game);

        //load level
        this.loadLevel();
    }

    update()
    {
        if( !this.game.started ) return;
        // Add game logic here
        this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
        this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.player.die, null, this);
    }

    startGame()
    {
        this.levelText.destroy();
        this.tapToStart.destroy();
        this.background.inputEnabled = false;

        this.playerBullets.start();

        this.startLevelTimer();

        this.scheduleNextEnemy();

        this.game.started = true;
    }

    loadLevel()
    {
        this.currentEnemyIndex = 0;
        this.levelData = this.game.cache.getJSON('level' + this.currentLevel);
    }

    startLevelTimer()
    {
        //end of the level timer
        this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, () => {
            console.log('level ended!');

            this.orchestra.stop();

            if(this.currentLevel < this.numLevels)
            {
                this.currentLevel++;
            }
            else
            {
                this.currentLevel = 1;
            }

            this.game.state.start('Game', true, false, this.currentLevel);
        }, this);
    }

    createEnemy(x, y, health, key, scale, speedX, speedY)
    {
        let enemy = this.enemies.getFirstExists(false);

        if(!enemy)
        {
            enemy = new Enemy(this.game, x, y, key, health, this.enemyBullets);
            this.enemies.add(enemy);
        }

        enemy.reset(x, y, health, key, scale, speedX, speedY);
    }

    scheduleNextEnemy()
    {
        let nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

        if(nextEnemy)
        {
            let nextTime = 1000 * ( nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time));

            this.nextEnemyTimer = this.game.time.events.add(nextTime, () => {
                this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);

                this.currentEnemyIndex++;
                this.scheduleNextEnemy();
            }, this);
        }
    }

    damageEnemy(bullet, enemy)
    {
        enemy.damage(1);
        bullet.kill();
    }
}
