import app from '../app';
import Constants from '../constants';

export default class Controller {

    constructor(config) {
        this.emitter = config.emitter;
        this.emitter.on(Constants.SET_SCORE, this.setScore);
        this.emitter.on(Constants.INCREASE_SCORE, this.increaseScore)
    }

    setScore(score) {
        app.model.score = score;
    }

    increaseScore(points) {
        console.log('increasing points by ' + points);
        const newScore = app.model.score + points;
        app.model.score = newScore;
    }

}
