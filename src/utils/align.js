
export default class Align {
    static scaleToGameWidth(app, obj, per) {
        obj.displayWidth = app.game.config.width * per;
        obj.scaleY = obj.scaleX;
    }

    static center(app, obj) {
        Align.centerHorizontal(app, obj);
        Align.centerVertical(app, obj);
    }

    static centerHorizontal(app, obj) {
        obj.x = app.game.width / 2;
    }
    
    static centerVertical(app, obj) {
        obj.y = app.game.height / 2;
    }
}
