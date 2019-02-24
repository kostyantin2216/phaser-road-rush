import Phaser from 'phaser';
import app from '../app';
import Align from '../utils/align';
import Collision from '../utils/collision';
import Constants from '../constants';

const OBSTACLES = [
    { key: 'pcar1', speed: 10, scale: 10 },
    { key: 'pcar2', speed: 10, scale: 10 },
    { key: 'cone', speed: 20, scale: 5 },
    { key: 'barrier', speed: 20, scale: 8 }
];

export default class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;

        this.back = this.scene.add.image(0, 0, 'road');
        this.add(this.back);
        this.scene.add.existing(this);

        Align.scaleToGameWidth(app, this.back, .5);

        this.setSize(this.back.displayWidth, app.game.config.height);

        this.count = 0;
        this.vSpace = 0;
        this.lineGroup = this.scene.add.group();

        this.car = this.scene.add.sprite(this.displayWidth / 4, app.game.config.height * .9, 'cars');
        Align.scaleToGameWidth(app, this.car, .12);
        this.add(this.car);

        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this);
    }

    changeLanes() {
        const width = this.displayWidth / 4;
        this.car.x = this.car.x > 0 ? -width : width;
    }

    makeObstacle() {
        const index = Math.floor(Math.random() * 4);
        const obstacle = OBSTACLES[index];

        const width = this.displayWidth / 4;
        const scale = obstacle.scale / 100;
        const lane = (Math.random() * 100) > 50 ? width : -width;

        this.obstacle = this.scene.add.sprite(lane, 0, obstacle.key);
        this.obstacle.speed = obstacle.speed;

        Align.scaleToGameWidth(app, this.obstacle, scale);
        this.add(this.obstacle);
    }

    moveObstacle() {
        this.obstacle.y += this.vSpace / this.obstacle.speed;

        if (Collision.hasCollision(this.car, this.obstacle)) {
            app.emitter.emit(Constants.INCREASE_SCORE, 1);
            this.car.alpha = .5;
        } else {
            this.car.alpha = 1;
        }
        
        if (this.obstacle.y > app.game.config.height) {
            this.obstacle.destroy();
            this.makeObstacle();
        }
    }

    makeLines() {
        this.vSpace = this.displayHeight / 10;
        for (let i = 0; i < 30; i++) {
            const line = this.scene.add.image(this.x, (this.vSpace * i) - 50, 'line');
            line.setScale(.7);
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }

    moveLines() {
        this.lineGroup.children.iterate((child) => {
            child.y += this.vSpace / 20;
        });
        this.count++;
        if (this.count === 20) {
            this.count = 0;
            this.lineGroup.children.iterate((child) => {
                child.y = child.oy;
            });
        }
    }
}
