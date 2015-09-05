/*
 * Boot state
 * ===========================================================================
 *
 * The first state of the game, responsible for setting up some Phaser
 * features.
 */

import assets from '../data/assets';


export default class Boot extends Phaser.State {
    init()
    {
        // Point the Phaser Asset Loader to where all your assets live.
        this.load.baseURL = './assets/';

        // Initialize physics engines here.
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload()
    {
        // Load the required assets to display our splash screen, later.
        this.load.pack('boot', null, assets);
    }

    create()
    {
        // Immediately after loading the boot assets, go to the next game state.
        this.state.start('Preload');
    }
}
