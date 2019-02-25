import Phaser from 'phaser';
import app from '../app';

import PlainButton from '../ui/plain-button';

export const SCENE_NAME = 'TestScene';

export default class TestScene extends Phaser.Scene {

    static get SCENE_NAME() { return SCENE_NAME };

    constructor() {
        super(SCENE_NAME);
    }

    preload() { 
        this.load.image('button1', 'assets/images/buttons/round/blue.png');
        this.load.image('button2', 'assets/images/buttons/round/red.png');
    }

    create() {
        const button1 = new PlainButton({
            scene: this,
            key: 'button1',
            text: 'Destroy',
            x: 240,
            y: 100,
            event: 'button_pressed',
            params: 'self_destruct',
            textConfig: {
                color: 'red',
                fontSize: 40
            },
            app
        });

        const button2 = new PlainButton({
            scene: this,
            key: 'button2',
            text: 'Fire',
            x: 240,
            y: 300,
            event: 'button_pressed',
            params: 'fire_lazer',
            textConfig: {
                color: 'blue',
                fontSize: 20
            },
            app
        });

        app.emitter.on('button_pressed', this.buttonPressed, this);
    }

    update() {

    }

    buttonPressed(params) {
        console.log('button pressed!', params);
    }

}
