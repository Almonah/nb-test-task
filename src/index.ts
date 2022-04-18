import _ from 'lodash';
import PixiApplication from "./pixi/PixiApplication";
import {game} from "./pixi/components/Game";
import config from "./config";

const rootComponent = function() {
    const element = document.createElement('div');
    element.id = "root";

    return element;
}

document.body.appendChild(rootComponent());

const pixiApp = PixiApplication.createInstance({
    autoDensity: config.autoDensity,
    backgroundColor: config.backgroundColor,
    antialias: config.antialias,
    resolution: config.resolution,
    backgroundAlpha: config.backgroundAlpha,
    width: config.width,
    height: config.height,
});

pixiApp && pixiApp.stage.addChild(game);
game.init();

document!.getElementById('root')!.appendChild(pixiApp.view);