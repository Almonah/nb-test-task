import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import config from "../../config";
import {Ui} from "./UI";
import {Floor} from "./Floor";
import {Background} from "./Background";

const BUNNY_ORIGINAL_SCALE = .5;
const BUNNY_ORIGINAL_ROTATION = Math.PI / 30;

class Game extends PIXI.Container {
    _loader:PIXI.Loader;
    _soundOn:boolean;
    _started:boolean;
    _paused:boolean;

    _bg:Background;
    _downHillContainer:PIXI.Container;
    _floor:Floor;
    _ui:Ui;

    _jumpTimeline?:gsap.core.Timeline;

    _hitArea: PIXI.Container;

    _bunny?:PIXI.Sprite;
    _bunnyBounds?: PIXI.Rectangle;
    _stopperBounds?: PIXI.Rectangle;

    _bunnySpeed:PIXI.Point;

    _loadingText: PIXI.Text;

    _delayedFinishTween?:gsap.core.Tween;

    constructor() {
        super();
        this._soundOn = false;
        this._paused = false;
        this._started = false;
        this._bunnySpeed = new PIXI.Point(0,0);
        this._loader = new PIXI.Loader();

        this._bg = this.addChild(new Background());
        this._downHillContainer = this.addChild(new PIXI.Container());
        this._floor = this._downHillContainer.addChild(new Floor());

        this._hitArea = this.addChild(new PIXI.Container());
        this._hitArea.hitArea = new PIXI.Rectangle(0,0, config.width, config.height);
        this._hitArea.interactive = true;
        this._ui = this.addChild(new Ui());

        this._loadingText = this.addChild(new PIXI.Text('ЗАГРУЗКА', {
            fill: "#ffffff",
            fontSize: 100,
            fontWeight: "bold",
            align: "left"
        }));

        this._loadingText.position.set(
            config.width/2 - this._loadingText.width/2,
            config.height/2 - 50
        );

        this.interactive = false;
    }

    async init() {
        const filelist = await fetch("./assets/filelist.json")
            .then((res) => res.json())

        filelist.files.forEach((filePath:string) => {
            this._loader.add(filePath);
        });
        this._loader.load().onComplete.add(() => {
            this.buildComponents();
        });
    }

    buildComponents() {
        this._bg.init();
        this._ui.init();

        this._floor.init();

        this._bunny = this._downHillContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('./assets/mi_bunny_idle_03.png')));
        this._bunny.scale.set(BUNNY_ORIGINAL_SCALE);
        this._bunny.rotation = BUNNY_ORIGINAL_ROTATION;
        this._bunny.position.set(-80, 400);

        this._bunnyBounds = this._bunny.getLocalBounds();
        this._bunnyBounds.width = this._bunnyBounds.width * BUNNY_ORIGINAL_SCALE;
        this._bunnyBounds.height = this._bunnyBounds.height * BUNNY_ORIGINAL_SCALE;
        this._stopperBounds = this._floor.stopper.getLocalBounds();
        this._stopperBounds!.width = this._stopperBounds!.width/2 - 50;

        this._loadingText.visible = false;
    }

    start = () => {
        this._started = true;
        gsap.ticker.add(this.update);
        gsap.to(this._bunnySpeed, {x: 10, y: .63, onComplete: this.activateTap, duration: 1});
        this._delayedFinishTween = gsap.delayedCall(10, this.finish);
    }

    finish = () => {
        this._delayedFinishTween && this._delayedFinishTween.kill();
        this._delayedFinishTween = undefined;
        this._started = false;
        this._jumpTimeline && this._jumpTimeline.kill();
        this._jumpTimeline = undefined;
        gsap.ticker.remove(this.update);
        this.deactivateTap();
        this._bunny!.position.set(-80, 400);
        this._floor.position.set(0,0);
        this._ui.showGameEndPopup();
    }

    activateTap = () => {
        this._hitArea.on('pointertap', this.jump);
    }
    deactivateTap = () => {
        this._hitArea.off('pointertap', this.jump);
    }

    jump = () => {
        if (this._jumpTimeline || !this._started) return;
        this._jumpTimeline = gsap.timeline()
            .to(this._bunny!.position, {y: this._bunny!.position.y - 250, duration: .5, ease: "power1.out"})
            .to(this._bunny!.position, {y: this._bunny!.position.y, duration: .9, ease: "power1.in", onComplete: this.jumpComplete})
        ;
    }

    jumpComplete = () => {
        this._jumpTimeline && this._jumpTimeline.kill();
        this._jumpTimeline = undefined;
    }

    update = () => {
        if (!this._started) return;
        if (this._bunny!.x < 150) {
            this._bunny!.x += this._bunnySpeed.x;
            this._bunny!.y += this._bunnySpeed.y;
        } else {
            this._floor!.x -= this._bunnySpeed.x;
            this._floor!.y -= this._bunnySpeed.y;
            if (this._floor!.x < -this._floor.width/2) {
                this._floor.position.set(0,0);
            }
        }

        this._bunnyBounds!.x = this._bunny!.getGlobalPosition().x;
        this._bunnyBounds!.y = this._bunny!.getGlobalPosition().y;
        this._stopperBounds!.x = this._floor.stopper!.getGlobalPosition().x + this._stopperBounds!.width/2;
        this._stopperBounds!.y = this._floor.stopper!.getGlobalPosition().y + 40;
        if (this._bunnyBounds!.intersects(this._stopperBounds!)) {
            this.finish();
        }
    }

    pause = () => {
        if (!this._started) return;
        this._paused = true;
        gsap.ticker.remove(this.update);
        this._jumpTimeline && this._jumpTimeline.pause();
    }

    resume = () => {
        if (!this._started) return;
        this._paused = false;
        gsap.ticker.add(this.update);
        this._jumpTimeline && this._jumpTimeline.resume();
    }

    get soundOn():boolean {
        return this._soundOn;
    }
    set soundOn(value:boolean) {
        this._soundOn = value;
    }
    get paused():boolean {
        return this._paused;
    }
}

const game = new Game();

export { Game, game };