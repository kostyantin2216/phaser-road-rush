import Phaser from 'phaser';

import Road from '../components/road';
import ScoreBox from '../components/score-box';
import app from '../app';
import Events from '../events';
import GameOverScene from './game-over.scene';
import MediaManager from '../utils/media-manager';
import SoundButtons from '../ui/sound-buttons';
import RK from '../resources-keys';

export const SCENE_NAME = 'MainScene';

export default class MainScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME };

    constructor() {
        super(SCENE_NAME);
    }

    preload() { 
    }

    create() {
        this.mediaManager = new MediaManager({
            scene: this, 
            app
        });
        this.mediaManager.setBackgroundMusic(RK.BACKGROUND_MUSIC);

        this.road1 = new Road({ scene: this });
        this.road1.x = this.game.config.width * .25;
        this.road1.create();

        this.road2 = new Road({ scene: this });
        this.road2.x = this.game.config.width * .75;
        this.road2.create();

        this.road2.car.setFrame(1);

        this.scoreBox = new ScoreBox({ scene: this, emitter: app.emitter });
        this.scoreBox.x = app.game.config.width / 2;
        this.scoreBox.y = 50;

        this.soundBtns = new SoundButtons({ scene: this, app });

        app.emitter.once(Events.GAME_OVER, this.gameOver, this);
    }

    update() {
        this.road1.update();
        this.road2.update();
    }

    gameOver() {
        console.log('game over');
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.mediaManager.removeBackgroundMusic();
                this.scene.start(GameOverScene.SCENE_NAME);
            }
        })
    }
}
