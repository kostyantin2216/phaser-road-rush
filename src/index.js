import 'phaser';

import SceneMain from './scenes/main.scene';
import './utils/fontLoader';

import app from './app';

window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 480,
        height: 640,
        scene: [SceneMain]
    };

    app.init(config);
}
