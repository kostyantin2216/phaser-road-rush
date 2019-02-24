
export default class AlignGrid {

    constructor(config) {
        if (!config.scene) {
            console.log('align grid missing scene');
            return;
        }

        if (!config.app) {
            console.log('align grid missing app');
            return
        }

        if (!config.rows)   config.rows   = 5;
        if (!config.cols)   config.cols   = 5;
        if (!config.height) config.height = config.app.game.config.height;
        if (!config.width)  config.width  = config.app.game.config.width;
        
        this.config = config;
        this.scene  = config.scene;
        this.app    = config.app;

        this.cellWidth  = config.width / config.cols;
        this.cellHeight = config.height / config.rows;
    }

    show() { 
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);

        console.log('cw', this.cellWidth, 'ch', this.cellHeight);
        for (let i = 0; i < this.config.width; i += this.cellWidth) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }

        for (let i = 0; i < this.config.height; i+= this.cellHeight) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);
        }

        this.graphics.strokePath();
    }

}
