import app from '../app';
import Constants from '../constants';

export default class Controller {

    constructor(emmiter) {
        this.emmiter = emmiter;
        emmiter.on(Constants.SET_SCORE, this.setScore);
        emmiter.on(Constants.INCREASE_SCORE, this.increaseScore)
    }

    setScore(score) {
        app.model.score = score;
    }

    increaseScore(points) {
        const newScore = app.model.score + points;
        app.model.score = newScore;
    }

}
