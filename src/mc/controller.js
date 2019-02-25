import app from '../app';
import Events from '../events';

export default class Controller {

    constructor(config) {
        this.emitter = config.emitter;
        this.registerEvents();
    }

    registerEvents() {
        this.emitter.on(Events.SET_SCORE, this.setScore);
        this.emitter.on(Events.INCREASE_SCORE, this.increaseScore);
        this.emitter.on(Events.TOGGLE_MUSIC, this.toggleMusic);
        this.emitter.on(Events.TOGGLE_SOUND, this.toggleSound);
    }

    setScore(score) {
        app.model.score = score;
    }

    increaseScore(points) {
        const newScore = app.model.score + points;
        app.model.score = newScore;
    }

    toggleMusic() {
        app.model.musicOn = !app.model.musicOn;
    }

    toggleSound() {
        app.model.soundOn = !app.model.soundOn;
    }

}
