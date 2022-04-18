import * as PIXI from "pixi.js";
import {Button, ButtonState} from "../Button";
import {range} from 'lodash';

enum LeaderBoardState {
    ALL_TIME,
    MONTH,
    WEEK
};

const ModeTitleMap:Record<LeaderBoardState, string> = {
    [LeaderBoardState.ALL_TIME]: "Всё время",
    [LeaderBoardState.MONTH]: "Месяц",
    [LeaderBoardState.WEEK]: "Неделя",
};

class LeaderBoardPopup extends PIXI.Container {
    _bg?:PIXI.Sprite;
    _titleBg?:PIXI.Sprite;
    _leftButton?:Button;
    _rightButton?:Button;
    _okButton?:Button;

    _headerInfoText?:PIXI.Text;
    _stateLabelText?:PIXI.Text;

    _highLeaders:Array<PIXI.Container>;
    _midLeaders:Array<PIXI.Container>;

    _currentMode: LeaderBoardState;

    constructor() {
        super();

        this._currentMode = LeaderBoardState.ALL_TIME;

        this._highLeaders = [];
        this._midLeaders = [];
    }

    init() {


        this._bg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/info_plate_big.png")));
        this._titleBg = this.addChild(new PIXI.Sprite(PIXI.Texture.from("UI/header_info_plate.png")));
        this._titleBg.pivot.set(
            this._titleBg.width/2,
            0
        );
        this._titleBg.position.set(this._bg.width/2, 5);

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

        this._leftButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/arrow_btn_active.png",
            [ButtonState.DOWN]: "UI/arrow_btn_press.png",
            [ButtonState.OVER]: "UI/arrow_btn_hover.png",
            [ButtonState.DISABLED]: "UI/arrow_btn_active.png"
        }));
        this._leftButton.pivot.set(
            this._leftButton.width/2,
            this._leftButton.height/2
        );
        this._leftButton.scale.x = -1;
        this._leftButton.position.set(this._bg.width*1/7, this._bg.height*1/7);
        this._leftButton.on('click', (event:PIXI.InteractionEvent) => {
            this.prevMode();
        })

        this._rightButton = this.addChild(new Button({
            [ButtonState.UP]: "UI/arrow_btn_active.png",
            [ButtonState.DOWN]: "UI/arrow_btn_press.png",
            [ButtonState.OVER]: "UI/arrow_btn_hover.png",
            [ButtonState.DISABLED]: "UI/arrow_btn_active.png"
        }));
        this._rightButton.pivot.set(
            this._rightButton.width/2,
            this._rightButton.height/2
        );
        this._rightButton.position.set(this._bg.width*6/7, this._bg.height*1/7);
        this._rightButton.on('click', (event:PIXI.InteractionEvent) => {
            this.nextMode();
        })


        this._headerInfoText = this.addChild(new PIXI.Text('Таблица рекордов:', {
            fill: "#042C5D",
            fontSize: 50,
            fontWeight: "bold",
            align: "left"
        }));

        this._headerInfoText.position.set(
            this._bg.width/2 - this._headerInfoText.width/2,
            10
        );

        this._stateLabelText = this.addChild(new PIXI.Text(`${ModeTitleMap[this._currentMode]}`, {
            fill: "#FC5108",
            fontSize: 50,
            fontWeight: "bold",
            align: "left"
        }));

        this._stateLabelText.position.set(
            this._bg.width/2 - this._stateLabelText.width/2,
            this._bg.height*1/7 - 25
        );

        range(0,3).forEach((index) => {
            this._highLeaders![index] = this.addChild(new PIXI.Container());
            const placeTitle = this._highLeaders![index].addChild(new PIXI.Sprite(PIXI.Texture.from(`UI/place_${index + 1}.png`)));
            const placeScore = this._highLeaders![index].addChild(new PIXI.Sprite(PIXI.Texture.from(`UI/highleader_scores_plate.png`)));
            placeScore.position.set(placeTitle.width + 20, 15);
            this._highLeaders![index].position.set(25, this._bg!.height*(1.2 + index * 0.6)/7);
        })

        range(0,8).forEach((index) => {
            this._midLeaders![index] = this.addChild(new PIXI.Container());
            const placeLabel = this._midLeaders![index].addChild(new PIXI.Text(`${index + 3}`, {
                fill: "#FFFFFF",
                fontSize: 30,
                fontWeight: "bold",
                align: "center"
            }));
            placeLabel.pivot.set(placeLabel.width/2, 0);
            placeLabel.position.set(30, 4);
            const placeTitle = this._midLeaders![index].addChild(new PIXI.Sprite(PIXI.Texture.from(`UI/midleader_name_plate.png`)));
            placeTitle.position.set(66, 0);
            const placeScore = this._midLeaders![index].addChild(new PIXI.Sprite(PIXI.Texture.from(`UI/midleader_scores_plate.png`)));
            placeScore.position.set(placeTitle.width + 100, 0);
            this._midLeaders![index].position.set(25, this._bg!.height*(3 + index * 0.36)/7);
        })
    }

    nextMode = () => {
        if (this._currentMode === 2) this._currentMode = 0;
        else this._currentMode++;
        this.updateMode();
    }

    prevMode = () => {
        if (this._currentMode === 0) this._currentMode = 2;
        else this._currentMode--;
        this.updateMode();
    }

    updateMode = () => {
        this._stateLabelText!.text = `${ModeTitleMap[this._currentMode]}`;
        this._stateLabelText!.position.set(
            this._bg!.width/2 - this._stateLabelText!.width/2,
            this._bg!.height*1/7 - 25
        );
    }

    get okButton():Button | undefined {
        return this._okButton;
    }
}

export { LeaderBoardPopup };