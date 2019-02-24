import 'phaser';

import GridScene from './scenes/grid.scene';
import MainScene from './scenes/main.scene';
import './utils/fontLoader';

import app from './app';

window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 480,
        height: 640,
        scene: [GridScene]
    };

    app.init(config);
}
