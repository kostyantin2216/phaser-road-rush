import Constants from '../constants';

export default class Model {
    constructor(config) {
        this.emitter = config.emitter;
        this._score = 0;
    }

    set score(val) {
        this._score = val;
        console.log('new score', val);
        this.emitter.emit(Constants.SCORE_UPDATED);
    }

    get score() {
        return this._score;
    }
}
