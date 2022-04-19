import * as PIXI from "pixi.js";
import {IntroPopup} from "./popups/IntroPopup";
import config from "../../config";
import {LeaderBoardPopup} from "./popups/LeaderBoardPopup";
import {GameEndPopup} from "./popups/GameEndPopup";
import {TopBar} from "./TopBar";
import {game} from "./Game";

class Ui extends PIXI.Container {
    _introPopup:IntroPopup;
    _leaderBoardPopup:LeaderBoardPopup;
    _gameEndPopup:GameEndPopup;

    _topBar:TopBar;


    constructor() {
        super();

        this._topBar = this.addChild(new TopBar());
        this._introPopup = this.addChild(new IntroPopup());
        this._leaderBoardPopup = this.addChild(new LeaderBoardPopup());
        this._gameEndPopup = this.addChild(new GameEndPopup());
    }

    init() {
        this._introPopup.init();
        const popupScale:number = config.height/this._introPopup.height;
        this._introPopup.scale.set(popupScale);
        this._introPopup.pivot.set(0, 0);
        this._introPopup.position.set(config.width/2 - this._introPopup.width/2, 0);
        this._introPopup.leaderBoradButton!.on("pointertap", (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = false;
            this._leaderBoardPopup.visible = true;
        });
        this._introPopup.playButton!.on("pointertap", (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = false;
            this._leaderBoardPopup.visible = false;
            game.start();
        });

        this._leaderBoardPopup.init();
        this._leaderBoardPopup.scale.set(popupScale);
        this._leaderBoardPopup.pivot.set(0, 0);
        this._leaderBoardPopup.position.set(config.width/2 - this._leaderBoardPopup.width/2, 0);
        this._leaderBoardPopup.okButton!.on('pointertap', (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = true;
            this._leaderBoardPopup.visible = false;
        })

        this._gameEndPopup.init();
        this._gameEndPopup.scale.set(popupScale);
        //this._gameEndPopup.pivot.set(this._gameEndPopup.width/2, 0);
        this._gameEndPopup.position.set(config.width/2, config.height/2);
        this._gameEndPopup.okButton!.on('pointertap', (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = true;
            this._leaderBoardPopup.visible = false;
            this._gameEndPopup.visible = false;
            this._gameEndPopup.stopAnimation();
        })

        this._topBar.init();

        this._introPopup.visible = true;
        this._leaderBoardPopup.visible = false;
        this._gameEndPopup.visible = false;

        this.interactive = false;
        this.buttonMode = false;
    }

    showGameEndPopup = () => {
        this._gameEndPopup.visible = true;
        this._gameEndPopup.startAnimation();
    }

}

export { Ui };