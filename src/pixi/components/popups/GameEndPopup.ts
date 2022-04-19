import * as PIXI from "pixi.js";
import {Button, ButtonState} from "../Button";
import {gsap} from "gsap";
import config from "../../../config";

const STARS_CONFIG = [
    {x: -config.width/2.5, y:-config.height/2.5},
    {x: -config.width/2.5 - 30, y:-config.height/7},
    {x: -config.width/2.5 - 30, y:config.height/7},
    {x: -config.width/2.5, y:config.height/2.5},
    {x: config.width/2.5, y:-config.height/2.5},
    {x: config.width/2.5 + 30, y:-config.height/7},
    {x: config.width/2.5 + 30, y:config.height/7},
    {x: config.width/2.5, y:config.height/2.5},
]

class GameEndPopup extends PIXI.Container {
    _bg?:PIXI.Sprite;
    _titleBg?:PIXI.Sprite;
    _okButton?:Button;

    _headerInfoText?:PIXI.Text;

    _totalPointsText?:PIXI.Text;
    _coinsText?:PIXI.Text;
    _metersText?:PIXI.Text;

    _coin?:PIXI.Sprite;
    _flag?:PIXI.Sprite;

    _rays?:PIXI.Sprite;
    _stars?:PIXI.Sprite[];

    _animationTimeline?: gsap.core.Timeline;
    _raysTween?: gsap.core.Tween;
    _startTweens?: gsap.core.Tween[];

    constructor() {
        super();
    }

    init() {
        this._rays = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/rays.png")));
        this._rays.pivot.set(this._rays.width/2, this._rays.height/2);


        this._bg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/info_plate_big.png")));
        this._bg.pivot.set(this._bg.width/2, this._bg.height/2);
        this._bg.position.set(0, 0);
        this._rays.position.set(0, 0);


        this._titleBg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/header_info_plate.png")));
        this._titleBg.pivot.set(
            this._titleBg.width / 2,
            0
        );
        this._titleBg.position.set(0, -this._bg.height/2 + 5);

        this._headerInfoText = this.addChild(new PIXI.Text('Твои очки:', {
            fill: "#042C5D",
            fontSize: 50,
            fontWeight: "bold",
            align: "left"
        }));
        this._headerInfoText.position.set(
            0 - this._headerInfoText.width/2,
            -this._bg.height/2 + 10
        );

        this._totalPointsText = this.addChild(new PIXI.Text('48', {
            fill: "#1AC604",
            fontSize: 140,
            fontWeight: "bold",
            align: "left"
        }));
        this._totalPointsText.position.set(
            - this._totalPointsText.width/2,
            -this._bg.height/2 + 180
        );

        this._coinsText = this.addChild(new PIXI.Text('0', {
            fill: "#89B8FF",
            fontSize: 80,
            fontWeight: "bold",
            align: "left"
        }));
        this._coinsText.position.set(
            -this._coinsText.width/2,
            -this._bg.height/2 + 380
        );

        this._metersText = this.addChild(new PIXI.Text('48 м', {
            fill: "#EF9E1C",
            fontSize: 80,
            fontWeight: "bold",
            align: "left"
        }));
        this._metersText.position.set(
            - this._metersText.width/2,
            -this._bg.height/2 + 580
        );

        this._coin = this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/collect_coin_icon.png')));
        this._coin.position.set(
            -this._bg.width/2 + 100,
            -this._bg.height/2 + 380
        );

        this._flag = this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/collect_distance_icon.png')));
        this._flag.position.set(
            -this._bg.width/2 + 90,
            -this._bg.height/2 + 570
        );

        this._okButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/ok_button_active.png",
            [ButtonState.DOWN]: "UI/ok_button_press.png",
            [ButtonState.OVER]: "UI/ok_button_hover.png",
            [ButtonState.DISABLED]: "UI/ok_button_active.png"
        }));
        this._okButton.pivot.set(
            this._okButton.width/2,
            this._okButton.height/2
        );
        this._okButton.position.set(0, this._bg.height/2 - this._okButton.height + 15);

        this._animationTimeline = gsap.timeline({repeat:-1});
        this._animationTimeline.add(gsap.to(this._rays!, {rotation: Math.PI * 2, duration: 10, ease: "none"}), 0);
        this._animationTimeline.add(gsap.to(this._rays!.scale, {x: .8, y: .8, duration: 5, ease: "none"}), 0);
        this._animationTimeline.add(gsap.to(this._rays!.scale, {x: 1, y: 1, duration: 5, ease: "none"}), 5);


        this._stars = [];

        STARS_CONFIG.forEach((config, index) => {
            this._stars!.push(this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/star.png'))));
            this._stars![index].pivot.set(this._stars![index].width/2, this._stars![index].height/2);
            this._stars![index].position.set(config.x, config.y);
            this._stars![index].scale.set(.7 + Math.random() * .5);

            this._animationTimeline!.add(gsap.to(this._stars![index], {rotation: -Math.PI/4 + Math.random() * Math.PI/4, duration: 5, ease: "none"}), 0);
            this._animationTimeline!.add(gsap.to(this._stars![index], {rotation: 0, duration: 5, ease: "none"}), 5);
        })
        this.stopAnimation();
    }

    startAnimation() {
        this._animationTimeline!.resume();
    }

    stopAnimation() {
        this._animationTimeline!.pause();
    }

    get okButton():Button | undefined {
        return this._okButton;
    }

    get width():number {
        return this._bg ? this._bg!.width : this.width ;
    }

}

export { GameEndPopup };