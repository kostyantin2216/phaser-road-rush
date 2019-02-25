import Events from '../events';

export default class Model {
    constructor(config) {
        this.emitter = config.emitter;
        this._score = 0;
        this._soundOn = true;
        this._musicOn = true;
    }

    set score(val) {
        this._score = val;
        console.log('new score', val);
        this.emitter.emit(Events.SCORE_UPDATED);
    }

    get score() {
        return this._score;
    }

    set soundOn(val) {
        this._soundOn = val;

        this.emitter.emit(Events.SOUND_CHANGED);
    }

    get soundOn() {
        return this._soundOn;
    }

    set musicOn(val) {
        this._musicOn = val;

        this.emitter.emit(Events.MUSIC_CHANGED);
    }

    get musicOn() {
        return this._musicOn;
    }
}
