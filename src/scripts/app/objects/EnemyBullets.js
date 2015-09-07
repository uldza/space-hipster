
class EnemyBullets extends Phaser.Group {
    constructor(game)
    {
        super(game, null, 'bullets', false, true);
        this.game.add.existing( this );
    }
}


export default EnemyBullets;
