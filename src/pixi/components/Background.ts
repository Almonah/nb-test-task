import * as PIXI from "pixi.js";
import config from "../../config";

class Background extends PIXI.Container {
    _bg?:PIXI.Sprite;

    constructor() {
        super();
    }

    init() {
        this._bg = this.addChild(new PIXI.Sprite(PIXI.Texture.from('Environment/back_rocks.png')));
        this._bg.position.set(0, config.height*1/5);
    }
}

export { Background };