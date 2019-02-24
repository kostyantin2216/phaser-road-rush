import Phaser from 'phaser';
import AlignGrid from '../utils/alignGrid';
import app from '../app';

export const SCENE_NAME = 'GridScene';

export default class GridScene extends Phaser.Scene {

    constructor() {
        super(SCENE_NAME);
    }

    preload() { 

    }

    create() {
        const gridConfig = {
            rows: 5,
            cols: 5,
            scene: this,
            app
        };
        const alignGrid = new AlignGrid(gridConfig);
        alignGrid.show();
    }

    update() {

    }

}
