import * as PIXI from "pixi.js";
import {Button, ButtonState} from "../Button";

class IntroPopup extends PIXI.Container {
    _bg?:PIXI.Sprite;
    _titleBg?:PIXI.Sprite;
    _inputBg?:PIXI.Sprite;
    _leadBoardButton?:Button;
    _playButton?:Button;
    _miButton?:Button;

    _headerInfoText?:PIXI.Text;
    _recordLabelText?:PIXI.Text;
    _recordValueText?:PIXI.Text;
    _inputText?:PIXI.Text;

    constructor() {
        super();
    }

    init() {
        this._bg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/info_plate_big.png")));
        this._titleBg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/header_info_plate.png")));
        this._titleBg.pivot.set(
            this._titleBg.width/2,
            0
        );
        this._titleBg.position.set(this._bg.width/2, 5);

        this._inputBg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/user_name_bar.png")));
        this._inputBg.pivot.set(
            this._inputBg.width/2,
            0
        );
        this._inputBg.position.set(this._bg.width/2, this._bg.height*5/9);

        this._leadBoardButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/leadboard_button_active.png",
            [ButtonState.DOWN]: "UI/leadboard_button_press.png",
            [ButtonState.OVER]: "UI/leadboard_button_hover.png",
            [ButtonState.DISABLED]: "UI/leadboard_button_active.png"
        }));
        this._leadBoardButton.pivot.set(
            this._leadBoardButton.width/2,
            this._leadBoardButton.height/2
        );
        this._leadBoardButton.position.set(this._bg.width*2/7, this._bg.height*6.5/8);

        this._playButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/play_button_active.png",
            [ButtonState.DOWN]: "UI/play_button_press.png",
            [ButtonState.OVER]: "UI/play_button_hover.png",
            [ButtonState.DISABLED]: "UI/play_button_active.png"
        }));
        this._playButton.pivot.set(
            this._playButton.width/2,
            this._playButton.height/2
        );
        this._playButton.position.set(this._bg.width*5/7, this._bg.height*6.5/8);

        this._miButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/login_button_active.png",
            [ButtonState.DOWN]: "UI/login_button_press.png",
            [ButtonState.OVER]: "UI/login_button_hover.png",
            [ButtonState.DISABLED]: "UI/login_button_active.png"
        }));
        this._miButton.pivot.set(
            this._miButton.width/2,
            this._miButton.height/2
        );
        this._miButton.position.set(this._bg.width/2, this._bg.height*2/5);

        this._headerInfoText = this.addChild(new PIXI.Text('Твои рекорды:', {
            fill: "#042C5D",
            fontSize: 50,
            fontWeight: "bold",
            align: "left"
        }));
        this._headerInfoText.position.set(
            this._bg.width/2 - this._headerInfoText.width/2,
            10
        );

        this._recordLabelText = this.addChild(new PIXI.Text('Рекорд:', {
            fill: "#21FF12",
            fontSize: 54,
            fontWeight: "bold",
            align: "left"
        }));
        this._recordLabelText.position.set(
            this._bg.width/2 - this._recordLabelText.width/2,
            100
        );

        this._recordValueText = this.addChild(new PIXI.Text('191', {
            fill: "#21FF12",
            fontSize: 54,
            fontWeight: "bold",
            align: "left"
        }));
        this._recordValueText.position.set(
            this._bg.width/2 - this._recordValueText.width/2,
            170
        );

        this._inputText = this.addChild(new PIXI.Text('Guest_12347', {
            fill: "#FFFFFF",
            fontSize: 54,
            fontWeight: "bold",
            align: "left"
        }));
        this._inputText.position.set(
            this._inputBg.x - this._inputText.width + 60,
            this._inputBg.y + 24
        );

    }

    get playButton():Button | undefined {
        return this._playButton;
    }

    get leaderBoradButton():Button | undefined {
        return this._leadBoardButton;
    }

    get miButton():Button | undefined {
        return this._miButton;
    }

}

export { IntroPopup };