import * as PIXI from "pixi.js";
import {Button, ButtonState} from "./Button";
import config from "../../config";
import {game} from "./Game";

class TopBar extends PIXI.Container {
    _fsButton?:Button;
    _soundButtonOff?:Button;
    _soundButtonOn?:Button;
    _pauseButton?:Button;

    _coin?: PIXI.Sprite;
    _coinScorePlate?: PIXI.Sprite;
    _coinScoreText?: PIXI.Text;

    constructor() {
        super();
    }

    init() {
        this._coinScorePlate = this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/coin_score_plate.png')));
        this._coinScorePlate.position.set(15,15);

        this._coin = this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/collect_coin_icon.png')));
        this._coin.position.set(5,5);

        this._coinScoreText = this.addChild(new PIXI.Text('0', {
            fill: "#FFFFFF",
            fontSize: 50,
            fontWeight: "bold",
            align: "left"
        }));
        this._coinScoreText.position.set(130,20);

        this._fsButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/btn_fullscreen_active.png",
            [ButtonState.DOWN]: "UI/btn_fullscreen_press.png",
            [ButtonState.OVER]: "UI/btn_fullscreen_hover.png",
            [ButtonState.DISABLED]: "UI/btn_fullscreen_active.png"
        }));
        this._fsButton.position.set(config.width - 390, 2);

        this._soundButtonOff = this.addChild(new Button({
            [ButtonState.UP]: "UI/btn_sound_0_active.png",
            [ButtonState.DOWN]: "UI/btn_sound_0_press.png",
            [ButtonState.OVER]: "UI/btn_sound_0_hover.png",
            [ButtonState.DISABLED]: "UI/btn_sound_0_active.png"
        }));
        this._soundButtonOff.position.set(config.width - 260, 2);
        this._soundButtonOff.on('click', this.toggleSound);

        this._soundButtonOn = this.addChild(new Button({
            [ButtonState.UP]: "UI/btn_sound_1_active.png",
            [ButtonState.DOWN]: "UI/btn_sound_1_press.png",
            [ButtonState.OVER]: "UI/btn_sound_1_hover.png",
            [ButtonState.DISABLED]: "UI/btn_sound_1_active.png"
        }));
        this._soundButtonOn.position.set(config.width - 260, 2);
        this._soundButtonOn.on('click', this.toggleSound);

        this._pauseButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/btn_pause_active.png",
            [ButtonState.DOWN]: "UI/btn_pause_press.png",
            [ButtonState.OVER]: "UI/btn_pause_hover.png",
            [ButtonState.DISABLED]: "UI/btn_pause_active.png"
        }));
        this._pauseButton.position.set(config.width - 130, 2);
        this._pauseButton.on('click', this.togglePause);

        this.updateView();
    }

    toggleSound = () => {
        game.soundOn = !game.soundOn;
        this.updateView();
    }

    togglePause = () => {
        if (game.paused) game.resume();
        else game.pause();
    }


    updateView = () => {
        this._soundButtonOff!.visible = !game.soundOn;
        this._soundButtonOn!.visible = game.soundOn;
    }
}

export { TopBar };