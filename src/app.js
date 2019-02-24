import Phaser from 'phaser';
import Model from './mc/model';

class App {

    constructor() {
        this.emitter = null;
        this.game = null;
        this.model = null;
    }

    init(config) {
        this.emitter = new Phaser.Events.EventEmitter();
        this.game = new Phaser.Game(config);
        this.model = new Model({ emitter: this.emitter });
    }

    isReady() {
        return this.game !== null;
    }

}

// Singleton
export default new App();
