import * as PIXI from "pixi.js";

export let pixiApplication:PixiApplication;

class PixiApplication extends PIXI.Application {

    constructor(options: PIXI.IApplicationOptions) {
        super(options);
    }

    static createInstance(options: PIXI.IApplicationOptions):PixiApplication {
        if (!pixiApplication) {
            pixiApplication = new PixiApplication(options);
        }
        return pixiApplication;
    }
}

export default PixiApplication;
