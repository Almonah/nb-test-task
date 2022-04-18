import * as PIXI from 'pixi.js';
enum ButtonState {
    UP = 'normal',
    DOWN = 'pressed',
    OVER = 'selected',
    DISABLED = 'disabled',
}

class Button extends PIXI.Container {
    static TYPE = 'Button';

    private _hitArea;
    private _pressed: boolean;
    private _state: ButtonState = ButtonState.UP;
    private _states:Record<ButtonState, PIXI.Container>;

    constructor(sprites:Record<ButtonState, string>) {
        super();

        this._states = {
            [ButtonState.UP]: this.addChild(new PIXI.Container()),
            [ButtonState.OVER]: this.addChild(new PIXI.Container()),
            [ButtonState.DOWN]: this.addChild(new PIXI.Container()),
            [ButtonState.DISABLED]: this.addChild(new PIXI.Container()),
        };

        this._states[ButtonState.UP].addChild(new PIXI.Sprite(PIXI.Texture.from(sprites[ButtonState.UP])));
        this._states[ButtonState.OVER].addChild(new PIXI.Sprite(PIXI.Texture.from(sprites[ButtonState.OVER])));
        this._states[ButtonState.DOWN].addChild(new PIXI.Sprite(PIXI.Texture.from(sprites[ButtonState.DOWN])));
        this._states[ButtonState.DISABLED].addChild(new PIXI.Sprite(PIXI.Texture.from(sprites[ButtonState.DISABLED])));

        this._pressed = false;
        this.enabled = true;
        this.buttonMode = true;
        this.interactive = true;
        this.state = ButtonState.UP;

        this._hitArea = new PIXI.Rectangle(this._states[ButtonState.UP].x, this._states[ButtonState.UP].y, this._states[ButtonState.UP].width, this._states[ButtonState.UP].height);
    }

    pointerdown(event:PIXI.InteractionEvent) {
        this.state = ButtonState.DOWN;
        this._pressed = true;
    }

    pointerout(event:PIXI.InteractionEvent) {
        this.state = this._pressed ? ButtonState.OVER : ButtonState.UP;
    }

    pointerover(event:PIXI.InteractionEvent) {
        if(event.data.originalEvent)
        {
            let buttons;
            if ("buttons" in event.data.originalEvent) {
                buttons = event.data.originalEvent.buttons !== undefined ? event.data.originalEvent.buttons : event.data.originalEvent.which === 0 ? 0 : 1 << (event.data.originalEvent.which - 1);
            }

            this.state = this._pressed ? ButtonState.DOWN : buttons ? ButtonState.UP : ButtonState.OVER;
        }
        else
        {
            this.state = this._pressed ? ButtonState.DOWN : ButtonState.UP;
        }
    }

    pointerup(event:PIXI.InteractionEvent) {
        this._pressed   = false;
        this.state      = ButtonState.OVER;
    }

    pointerupoutside() {
        this._pressed = false;
        this.state = ButtonState.UP;
    }

    get state():ButtonState {
        return this._state;
    }

    set state(value: ButtonState) {
        this._state = value;
        this._states[ButtonState.UP].visible       = value==ButtonState.UP;
        this._states[ButtonState.OVER].visible     = value==ButtonState.OVER;
        this._states[ButtonState.DOWN].visible     = value==ButtonState.DOWN;
        this._states[ButtonState.DISABLED].visible = value==ButtonState.DISABLED;
    }

    get enabled():boolean {
        return this.interactive;
    }

    set enabled(value: boolean) {
        if(this.interactive!=value)
        {
            this.interactive = value;
            /*if(value)
            {
                if(this.handleMouse())
                {
                    this.state = Button.OVER;
                    if(this._tooltip)
                    {
                        this._tooltip.visible = true;
                        this._tooltip.movie.play(0);
                    }
                }
                else
                {
                    this.state = Button.UP;
                }
            }
            else
            {
                this.state = Button.DISABLED;
                this._pressed = false;
                if(this._tooltip)
                {
                    this._tooltip.visible = false;
                }
            }*/
        }
    }

}

export { Button, ButtonState };
