import Phaser from 'phaser';
import app from '../app';
import Events from '../events';
import RK from '../resources-keys';

import { scaleToGameWidth } from '../utils/align-utils';
import { hasCollision } from '../utils/collision-utils';

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

        this.back = this.scene.add.image(0, 0, RK.ROAD);
        this.add(this.back);
        this.scene.add.existing(this);

        scaleToGameWidth(app, this.back, .5);

        this.setSize(this.back.displayWidth, app.game.config.height);

        this.count = 0;
        this.vSpace = 0;
        this.lineGroup = this.scene.add.group();

        this.car = this.scene.add.sprite(this.displayWidth / 4, app.game.config.height * .9, RK.CARS);
        scaleToGameWidth(app, this.car, .12);
        this.add(this.car);

        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this);
    }

    changeLanes() {
        if (app.model.gameOver) return;

        const width = this.displayWidth / 4;
        this.car.x = this.car.x > 0 ? -width : width;
        app.emitter.emit(Events.PLAY_SOUND, RK.CHANGE_LANE_SOUND);
    }

    create() {
        this.createLines();
        this.createObstacle();
    }

    update() {
        this.updateLines();
        this.updateObstacle();
    }

    createObstacle() {
        const index = Math.floor(Math.random() * 4);
        const obstacle = OBSTACLES[index];

        const width = this.displayWidth / 4;
        const scale = obstacle.scale / 100;
        const lane = (Math.random() * 100) > 50 ? width : -width;

        this.obstacle = this.scene.add.sprite(lane, 0, obstacle.key);
        this.obstacle.speed = obstacle.speed;

        scaleToGameWidth(app, this.obstacle, scale);
        this.add(this.obstacle);
    }

    updateObstacle() {
        if (app.model.gameOver) return;

        this.obstacle.y += (this.vSpace / this.obstacle.speed) * app.model.speed;

        if (hasCollision(this.car, this.obstacle)) {
            app.emitter.emit(Events.PLAY_SOUND, RK.CRASH_SOUND);
            this.scene.tweens.add({
                targets: this.car,
                duration: 1000,
                y: app.game.config.height,
                angle: -270
            });
            app.emitter.emit(Events.GAME_OVER);
        } else if (this.obstacle.y > app.game.config.height) {
            app.emitter.emit(Events.INCREASE_SCORE, 1);
            this.obstacle.destroy();
            this.createObstacle();
        }
    }

    createLines() {
        this.vSpace = this.displayHeight / 5;
        for (let i = 0; i < 20; i++) {
            const line = this.scene.add.image(this.x, (this.vSpace * i) - 50, RK.LINE);
           // line.setScale(.7);
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }

    updateLines() {
        if (app.model.gameOver) return;
        
        let printed = false;
        this.lineGroup.children.iterate((child) => {
            child.y += (this.vSpace / 20) * app.model.speed;
            if (!printed) {
                console.log(child.y);
                printed = true;
            }
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
