import * as PIXI from "pixi.js";

export let pixiApplication:PixiApplication;

class PixiApplication extends PIXI.Application {
    private _callbacks: Function[];
    private paused: boolean;

    constructor(options: PIXI.IApplicationOptions) {
        super(options);
        this._callbacks = [];
        this.paused = false;

        //@ts-ignore
        window.app = this;
    }

    static createInstance(options: PIXI.IApplicationOptions):PixiApplication {
        if (!pixiApplication) {
            pixiApplication = new PixiApplication(options);
        }
        return pixiApplication;
    }

    pause() {
        if (this.paused) {
            return;
        }
        this.paused = true;
        //gsap.globalTimeline.pause();
        //this._pausedTweens = [... this._pausedTweens, ...this._pauseAllActiveTweens()];
        //sound.pause();
    }

    resume() {
        if (!this.paused) {
            return;
        }
        this.paused = false;
        this._callbacks.forEach((callback) => {
            callback();
        });
        this._callbacks.length = 0;
    }

    proceed(callback: Function) {
        if (this.paused) {
            this._callbacks.push(callback);
        } else {
            callback();
        }
    }
}

export default PixiApplication;
