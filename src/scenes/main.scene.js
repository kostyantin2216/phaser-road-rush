import Phaser from 'phaser';

import Road from '../components/road';
import ScoreBox from '../components/score-box';
import app from '../app';
import AlignGrid from '../utils/align-grid';
import Events from '../events';
import GameOverScene from './game-over.scene';
import MediaManager from '../utils/media-manager';
import PlainButton from '../ui/plain-button';
import { scaleToGameWidth } from '../utils/align-utils';

export const SCENE_NAME = 'MainScene';

export default class MainScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME };

    constructor() {
        super(SCENE_NAME);
    }

    preload() { 
        this.load.image('buttonMusic', 'assets/images/buttons/round/yellow.png');
        this.load.image('buttonSound', 'assets/images/buttons/round/orange.png');
        this.load.image('road', 'assets/images/road.jpg');
        this.load.image('line', 'assets/images/line.png');
        this.load.image('pcar1', 'assets/images/pcar1.png');
        this.load.image('pcar2', 'assets/images/pcar2.png');
        this.load.image('cone', 'assets/images/cone.png');
        this.load.image('barrier', 'assets/images/barrier.png');
        this.load.spritesheet('cars', 'assets/images/cars.png', { 
            frameWidth: 60,
            frameHeight: 126
        });
        this.load.audio('crashSound', ['assets/audio/meow.mp3', 'assets/audio/meow.ogg']);
        this.load.audio('backgroundMusic', ['assets/audio/background.mp3', 'assets/audio/background.ogg']);
    }

    create() {
        this.mediaManager = new MediaManager({
            scene: this, 
            app
        });
        this.mediaManager.setBackgroundMusic('backgroundMusic');

        this.road = new Road({ scene: this });
        this.road.x = this.game.config.width / 2;
        this.road.makeLines();
        this.road.makeObstacle();

        this.scoreBox = new ScoreBox({ scene: this, emitter: app.emitter });

        const btnTextConfig = { color: 'black' };
        this.btnToggleMusic = new PlainButton({
            scene: this,
            key: 'buttonMusic',
            event: Events.TOGGLE_MUSIC,
            textConfig: btnTextConfig,
            app
        });
        scaleToGameWidth(app, this.btnToggleMusic.back, 0.25);
        this.musicChanged();

        this.btnToggleSound = new PlainButton({
            scene: this,
            key: 'buttonSound',
            event: Events.TOGGLE_SOUND,
            textConfig: btnTextConfig,
            app
        });
        scaleToGameWidth(app, this.btnToggleSound.back, 0.25);
        this.soundChanged();

        this.alignGrid = new AlignGrid({
           scene: this,
           rows: 5,
           cols: 5,
           app
        });
        // this.alignGrid.show();
        this.alignGrid.placeAtIndex(0, this.scoreBox)
        this.alignGrid.placeAtIndex(20, this.btnToggleMusic);
        this.alignGrid.placeAtIndex(24, this.btnToggleSound);

        app.emitter.on(Events.MUSIC_CHANGED, this.musicChanged, this);
        app.emitter.on(Events.SOUND_CHANGED, this.soundChanged, this);
        app.emitter.once(Events.GAME_OVER, this.gameOver, this);
    }

    musicChanged() {
        this.btnToggleMusic.text = 'Music ' + (app.model.musicOn ? 'on' : 'off' );
    }

    soundChanged() {
        this.btnToggleSound.text = 'Sound ' + (app.model.soundOn ? 'on' : 'off');
    }

    update() {
        this.road.moveLines();
        this.road.moveObstacle();
    }

    gameOver() {
        console.log('game over');
        this.mediaManager.removeBackgroundMusic();
        this.scene.start(GameOverScene.SCENE_NAME);
    }
}
