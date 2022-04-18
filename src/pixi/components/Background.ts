import * as PIXI from "pixi.js";
import {IntroPopup} from "./popups/IntroPopup";
import config from "../../config";
import {LeaderBoardPopup} from "./popups/LeaderBoardPopup";
import {TopBar} from "./TopBar";

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