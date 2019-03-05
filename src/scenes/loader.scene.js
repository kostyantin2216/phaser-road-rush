import Phaser from 'phaser';

import RK from '../resources-keys';
import TitleScene from './title.scene';
import ProgressBar from '../ui/progress-bar';

import app from '../app';

export const SCENE_NAME = 'LoaderScene';


export default class LoaderScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME; }

    constructor() {
        super(SCENE_NAME);
    }

    preload() {
        this.bar = new ProgressBar({
            scene: this,
            x: app.game.config.width / 2,
            y: app.game.config.height / 2,
            app
        });
        this.progressText = this.add.text(app.game.config.width / 2, app.game.config.height / 2, '0%', { 
            color: '#ffffff', 
            fontSize: app.game.config.width / 20 
        });
        this.progressText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgress, this);

        this.load.image(RK.TITLE, 'assets/images/title.png');
        this.load.image(RK.TITLE_BG, 'assets/images/titleBack.jpg');
        this.load.image(RK.START_BTN, 'assets/images/buttons/round/blue.png');
        this.load.image(RK.PLAY_AGAIN_BTN, 'assets/images/buttons/round/blue.png');
        this.load.image(RK.ROAD, 'assets/images/road.jpg');
        this.load.image(RK.LINE, 'assets/images/line.png');
        this.load.image(RK.P_CAR_1, 'assets/images/pcar1.png');
        this.load.image(RK.P_CAR_2, 'assets/images/pcar2.png');
        this.load.image(RK.CONE, 'assets/images/cone.png');
        this.load.image(RK.BARRIER, 'assets/images/barrier.png');
        this.load.image(RK.SFX_OFF, 'assets/images/sfx_off.png');
        this.load.image(RK.SFX_ON, 'assets/images/sfx_on.png');
        this.load.image(RK.MUSIC_OFF, 'assets/images/music_off.png');
        this.load.image(RK.MUSIC_ON, 'assets/images/music_on.png');
        this.load.image(RK.TOGGLE_BG, 'assets/images/toggles/green.png');
        this.load.spritesheet(RK.CARS, 'assets/images/cars.png', { 
            frameWidth: 60,
            frameHeight: 126
        });
        this.load.audio(RK.CRASH_SOUND, ['assets/audio/boom.mp3', 'assets/audio/boom.ogg']);
        this.load.audio(RK.CHANGE_LANE_SOUND, ['assets/audio/whoosh.mp3', 'assets/audio/whoosh.ogg']);
        this.load.audio(RK.BACKGROUND_MUSIC, ['assets/audio/random-race.mp3', 'assets/audio/random-race.ogg']);
    }

    create() {
        this.scene.start(TitleScene.SCENE_NAME);
    }

    update() {

    }

    onProgress(value) {
        this.bar.setPercent(value);
        this.progressText.setText(Math.floor(value * 100) + '%');
    }

}
