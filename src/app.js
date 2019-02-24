import Phaser from 'phaser';
import Model from './mc/model';
import Controller from './mc/controller';

class App {

    constructor() {
        this.emitter = null;
        this.game = null;
        this.model = null;
        this.controller 
    }

    init(config) {
        this.emitter = new Phaser.Events.EventEmitter();
        this.game = new Phaser.Game(config);
        this.controller = new Controller({ emitter: this.emitter });
        this.model = new Model({ emitter: this.emitter });
    }

    isReady() {
        return this.game !== null;
    }

}

// Singleton
export default new App();
