import Phaser from 'phaser';
import AlignGrid from '../utils/align-grid';
import app from '../app';
import { scaleToGameWidth } from '../utils/align-utils';
import PlainButton from '../ui/plain-button';
import MainScene from '../scenes/main.scene';
import Events from '../events';
import RK from '../resources-keys';


export const SCENE_NAME = 'GameOverScene';


export default class GameOverScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME; }

    constructor() {
        super(SCENE_NAME);
    }

    preload() {
    }

    create() {
        this.alignGrid = new AlignGrid({
            rows: 11,
            cols: 11,
            scene: this,
            app
        });
        //this.alignGrid.show();

        const title = this.add.image(0, 0, RK.TITLE);
        scaleToGameWidth(app, title, .8);
        this.alignGrid.placeAtIndex(38, title);

        const btnStart = new PlainButton({
            scene: this,
            key: RK.PLAY_AGAIN_BTN,
            text: 'Play Again',
            event: Events.START_GAME,
            app
        });
        this.alignGrid.placeAtIndex(82, btnStart);

        app.emitter.once(Events.START_GAME, this.startGame, this);
    }

    startGame() {
        console.log('start game', SCENE_NAME);
        app.emitter.emit(Events.RESET_GAME);
        this.scene.start(MainScene.SCENE_NAME);
    }

    update() {

    }

}
