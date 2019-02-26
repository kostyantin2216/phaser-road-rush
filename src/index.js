import 'phaser';

import GameOverScreen from './scenes/game-over.scene';
import TestScene from './scenes/test.scene';
import MainScene from './scenes/main.scene';
import TitleScene from './scenes/title.scene';
import LoaderScene from './scenes/loader.scene';
import fontLoader from './utils/font-loader';

import app from './app';

fontLoader({
    fontFamilies: ["Fresca","Flamenco","Indie Flower",'Anton']
});

window.onload = function() {
    let height, width;
    if (app.isMobile) {
        width = window.innerWidth;
        height = window.innerHeight;
    } else {
        width = 480;
        height = 640;
    }

    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: width,
        height: height,
        scene: [
            LoaderScene,
            TitleScene,
            MainScene,
            GameOverScreen
        ]
    };

    app.init(config);
}
