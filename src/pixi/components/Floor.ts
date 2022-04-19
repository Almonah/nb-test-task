import * as PIXI from "pixi.js";
import config from "../../config";


class Floor extends PIXI.Container {
    _floorContainer?:PIXI.Container;
    _floor1?:PIXI.Sprite;
    _floor2?:PIXI.Sprite;
    _stopper?:PIXI.Sprite;

    constructor() {
        super();
    }

    init() {
        this._floorContainer = this.addChild(new PIXI.Container());

        this._floor1 = this._floorContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('Environment/floor.png')));
        this._floor2 = this._floorContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('Environment/floor.png')));

        this._floor2.position.set(this._floor1.width, 0);

        this._stopper = this.addChild(new PIXI.Sprite(PIXI.Texture.from('Environment/stopper_idle.png')));

        this._stopper.position.set(this._floor1.width, config.height*4/5 - this._stopper.height + 10);

        this._floorContainer.position.set(0, config.height*4/5);
        this._floorContainer.scale.set(1.2);
        //this._floor1.rotation = Math.PI / 50;

        /*this._floor2 = this.addChild(new PIXI.Sprite(PIXI.Texture.from('Environment/floor.png')));
        this._floor2.position.set(0, config.height*4/5);*/

        //this.scale.set(1.2);
        this.rotation = Math.PI / 50;
    }

    get stopper(): PIXI.Sprite {
        return this._stopper!;
    }

}

export { Floor };