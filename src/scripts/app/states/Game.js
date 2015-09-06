/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Player from '../objects/Player';

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
    }

    update()
    {
        if( !this.game.started ) return;
        // Add game logic here
    }

    startGame()
    {
        this.levelText.destroy();
        this.tapToStart.destroy();
        this.background.inputEnabled = false;

        this.game.started = true;
    }
}
