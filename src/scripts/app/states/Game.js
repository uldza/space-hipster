/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */


export default class Game extends Phaser.State {
    init( currentLevel )
    {
        //level data
        this.numLevels = 3;
        this.currentLevel = currentLevel ? currentLevel : 1;
        console.log('current level:' + this.currentLevel);

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

        this.levelText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'LEVEL ' + this.currentLevel, { font: '30px Verdana', fill: '#fff' });
        this.levelText.anchor.setTo(0.5);

        this.tapToStart = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'tap to start the game', { font: '18px Verdana', fill: '#fff' });
        this.tapToStart.anchor.setTo(0.5);
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

        this.game.started = true;
    }
}
