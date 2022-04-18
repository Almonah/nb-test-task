import * as PIXI from "pixi.js";

export let pixiApplication:PixiApplication;

class PixiApplication extends PIXI.Application {
    private _callbacks: Function[];
    private paused: boolean;

    constructor(options: PIXI.IApplicationOptions) {
        super(options);
        this._callbacks = [];
        this.paused = false;
    }

    static createInstance(options: PIXI.IApplicationOptions):PixiApplication {
        if (!pixiApplication) {
            pixiApplication = new PixiApplication(options);
        }
        return pixiApplication;
    }
}

export default PixiApplication;
