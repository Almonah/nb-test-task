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
        this._introPopup.scale.set(config.height/this._introPopup.height);
        this._introPopup.pivot.set(0, 0);
        this._introPopup.position.set(config.width/2 - this._introPopup.width/2, 0);
        this._introPopup.leaderBoradButton!.on("click", (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = false;
            this._leaderBoardPopup.visible = true;
        });
        this._introPopup.playButton!.on("click", (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = false;
            this._leaderBoardPopup.visible = false;
            game.start();
        });

        this._leaderBoardPopup.init();
        this._leaderBoardPopup.scale.set(config.height/this._leaderBoardPopup.height);
        this._leaderBoardPopup.pivot.set(0, 0);
        this._leaderBoardPopup.position.set(config.width/2 - this._leaderBoardPopup.width/2, 0);
        this._leaderBoardPopup.okButton!.on('click', (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = true;
            this._leaderBoardPopup.visible = false;
        })

        this._gameEndPopup.init();
        this._gameEndPopup.scale.set(config.height/this._gameEndPopup.height);
        this._gameEndPopup.pivot.set(0, 0);
        this._gameEndPopup.position.set(config.width/2 - this._gameEndPopup.width/2, 0);
        this._gameEndPopup.okButton!.on('click', (event:PIXI.InteractionEvent) => {
            this._introPopup.visible = true;
            this._leaderBoardPopup.visible = false;
            this._gameEndPopup.visible = false;
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
    }

}

export { Ui };