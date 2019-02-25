import Phaser from 'phaser';
import Model from './mc/model';
import Controller from './mc/controller';

class App {

    constructor() {
        this.emitter = null;
        this.game = null;
        this.model = null;
        this.controller = null;
        this._isMobile = navigator.userAgent.indexOf('Mobile') > -1 || navigator.userAgent.indexOf('Tablet') > -1;
    }

    init(config) {
        this.emitter = new Phaser.Events.EventEmitter();
        this.game = new Phaser.Game(config);
        this.controller = new Controller({ emitter: this.emitter });
        this.model = new Model({ emitter: this.emitter });
    }

    get isReady() {
        return this.game !== null;
    }

    get isMobile() {
        return this._isMobile;
    }

    reset() {
        this.emitter.removeAllListeners();
        this.controller.registerEvents();
        this.model.score = 0;
    }

}

// Singleton
export default new App();
