/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `bower_components/phaser/resources/` directory, for a more complete
 * reference.
 *
 */


export default {
    // - Boot Assets ------------------------------------------------------------
    boot: [
        {
        key: 'splash-screen',
        type: 'image',
        url: 'splash-screen.png'
    },
    {
        key: 'progress-bar',
        type: 'image',
        url: 'progress-bar.png'
    }
    ],
    // - Game assets ------------------------------------------------------------
    game: [
    {
        key: 'bullet',
        type: 'image',
        url: 'images/bullet.png'
    },
    {
        key: 'player',
        type: 'image',
        url: 'images/player.png'
    },
    {
        key: 'enemyParticle',
        type: 'image',
        url: 'images/enemyParticle.png'
    },
    {
        key: 'space',
        type: 'image',
        url: 'images/space.png'
    },
    {
        //   Loads a Sprite Sheet File
        type: 'spritesheet',
        key: 'yellowEnemy',
        url: 'images/yellow_enemy.png',
        frameWidth: 50,
        frameHeight: 46,
        frameMax: 3,
        margin: 1,
        spacing: 1
    },
    {
        //   Loads a Sprite Sheet File
        type: 'spritesheet',
        key: 'redEnemy',
        url: 'images/red_enemy.png',
        frameWidth: 50,
        frameHeight: 46,
        frameMax: 3,
        margin: 1,
        spacing: 1
    },
    {
        //   Loads a Sprite Sheet File
        type: 'spritesheet',
        key: 'greenEnemy',
        url: 'images/green_enemy.png',
        frameWidth: 50,
        frameHeight: 46,
        frameMax: 3,
        margin: 1,
        spacing: 1
    },
    {
        //   Loads a JSON File
        type: 'json',
        key: 'level1',
        url: 'data/level1.json',
        overwrite: false
    },
    {
        //   Loads a JSON File
        type: 'json',
        key: 'level2',
        url: 'data/level2.json',
        overwrite: false
    },
    {
        //   Loads a JSON File
        type: 'json',
        key: 'level3',
        url: 'data/level3.json',
        overwrite: false
    }
    ],
    // - Music and Sound effects ------------------------------------------------
    audio: [
    {
        key: 'orchestra',
        type: 'audio',
        urls: [ 'audio/8bit-orchestra.ogg', 'audio/8bit-orchestra.mp3' ]
    }
    ]
};
