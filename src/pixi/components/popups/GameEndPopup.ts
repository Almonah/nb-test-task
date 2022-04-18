import * as PIXI from "pixi.js";
import {Button, ButtonState} from "../Button";

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

    constructor() {
        super();
    }

    init() {
        this._bg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/info_plate_big.png")));
        this._titleBg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/header_info_plate.png")));
        this._titleBg.pivot.set(
            this._titleBg.width / 2,
            0
        );
        this._titleBg.position.set(this._bg.width / 2, 5);

        this._headerInfoText = this.addChild(new PIXI.Text('Твои очки:', {
            fill: "#042C5D",
            fontSize: 50,
            fontWeight: "bold",
            align: "left"
        }));
        this._headerInfoText.position.set(
            this._bg.width/2 - this._headerInfoText.width/2,
            10
        );

        this._totalPointsText = this.addChild(new PIXI.Text('48', {
            fill: "#1AC604",
            fontSize: 140,
            fontWeight: "bold",
            align: "left"
        }));
        this._totalPointsText.position.set(
            this._bg.width/2 - this._totalPointsText.width/2,
            180
        );

        this._coinsText = this.addChild(new PIXI.Text('0', {
            fill: "#89B8FF",
            fontSize: 80,
            fontWeight: "bold",
            align: "left"
        }));
        this._coinsText.position.set(
            this._bg.width/2 - this._coinsText.width/2,
            380
        );

        this._metersText = this.addChild(new PIXI.Text('48 м', {
            fill: "#EF9E1C",
            fontSize: 80,
            fontWeight: "bold",
            align: "left"
        }));
        this._metersText.position.set(
            this._bg.width/2 - this._metersText.width/2,
            580
        );

        this._coin = this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/collect_coin_icon.png')));
        this._coin.position.set(
            100,
            380
        );

        this._flag = this.addChild(new PIXI.Sprite(PIXI.Texture.from('UI/collect_distance_icon.png')));
        this._flag.position.set(
            90,
            570
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
        this._okButton.position.set(this._bg.width/2, this._bg.height*9.05/10);
    }

    get okButton():Button | undefined {
        return this._okButton;
    }

}

export { GameEndPopup };