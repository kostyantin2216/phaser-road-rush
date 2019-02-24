import Phaser from 'phaser';

import Road from '../components/road';
import ScoreBox from '../components/scoreBox';
import app from '../app';

export default class SceneMain extends Phaser.Scene {

    static get NAME() { return 'SceneMain'; }

    constructor() {
        super(SceneMain.NAME);
    }

    preload() { 
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
    }

    create() {
        app.emitter = new Phaser.Events.EventEmitter();

        this.road = new Road({ scene: this })
        this.road.x = this.game.config.width / 2;
        this.road.makeLines();
        this.road.makeObstacle();

        this.scoreBox = new ScoreBox({ scene: this, emitter: app.emitter });
        this.scoreBox.x = this.game.config.width / 2;
        this.scoreBox.y = 50;
    }

    update() {
        this.road.moveLines();
        this.road.moveObstacle();
    }
}
