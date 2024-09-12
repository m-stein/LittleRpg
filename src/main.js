import { Resources } from './resources.js'
import { Sprite } from './sprite.js'
import { Vector2 } from './vector2.js'
import { GameEngine } from './game_engine.js'
import './style.css'

const Direction =
{
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    NONE: 5,
}

class Main
{
    constructor()
    {
        this.resources = new Resources();
        this.gameCanvas = document.querySelector('#gameCanvas');
        this.ctx = gameCanvas.getContext("2d");
        this.skySprite = new Sprite({
            sourceImage: this.resources.imageRegistry.sky,
            frameSize: new Vector2(320, 180)
        });
        this.groundSprite = new Sprite({
            sourceImage: this.resources.imageRegistry.ground,
            frameSize: new Vector2(320, 180)
        });
        this.heroSprite = new Sprite({
            sourceImage: this.resources.imageRegistry.hero,
            frameSize: new Vector2(32, 32),
            numColumns: 3,
            numRows: 8,
            drawFrameIndex: 1,
            framePadding: new Vector2(8, 21)
        });
        this.shadowSprite = new Sprite({
            sourceImage: this.resources.imageRegistry.shadow,
            frameSize: new Vector2(32, 32),
            framePadding: new Vector2(8, 21)
        });
        this.gameEngine = new GameEngine(this);
        this.gameEngine.start();
        this.activeDirectionInputs = [];
        this.heroPosition = new Vector2(5*16, 5*16);
        document.addEventListener("keydown", this.onKeyDownEvent);
        document.addEventListener("keyup", this.onKeyUpEvent);
    }

    onKeyDownEvent = (event) =>
    {
        if (event.code === "ArrowUp" || event.code === "KeyW")
            this.activateDirectionInput(Direction.UP);
        if (event.code === "ArrowDown" || event.code === "KeyS")
            this.activateDirectionInput(Direction.DOWN);
        if (event.code === "ArrowLeft" || event.code === "KeyA")
            this.activateDirectionInput(Direction.LEFT);
        if (event.code === "ArrowRight" || event.code === "KeyD")
            this.activateDirectionInput(Direction.RIGHT);
    }
    
    onKeyUpEvent = (event) =>
    {
        if (event.code === "ArrowUp" || event.code === "KeyW")
            this.deactivateDirectionInput(Direction.UP);
        if (event.code === "ArrowDown" || event.code === "KeyS")
            this.deactivateDirectionInput(Direction.DOWN);
        if (event.code === "ArrowLeft" || event.code === "KeyA")
            this.deactivateDirectionInput(Direction.LEFT);
        if (event.code === "ArrowRight" || event.code === "KeyD")
            this.deactivateDirectionInput(Direction.RIGHT);
    }

    dominantDirectionInput()
    {
        if (this.activeDirectionInputs.length == 0)
            return Direction.NONE;

        return this.activeDirectionInputs[0]
    }

    activateDirectionInput(direction)
    {
        // add direction to front of list if it is not in the list
        if (this.activeDirectionInputs.indexOf(direction) === -1)
            this.activeDirectionInputs.unshift(direction);
    }

    deactivateDirectionInput(direction)
    {
        // remove direction from list if it is in the list
        const idx = this.activeDirectionInputs.indexOf(direction);
        if (idx === -1)
            return;

        this.activeDirectionInputs.splice(idx, 1);
    }

    update(time)
    {
        if (this.dominantDirectionInput() == Direction.UP) {
            this.heroPosition.y--;
            this.heroSprite.currFrameIndex = 6;
        }
        if (this.dominantDirectionInput() == Direction.DOWN) {
            this.heroPosition.y++;
            this.heroSprite.currFrameIndex = 0;
        }
        if (this.dominantDirectionInput() == Direction.LEFT) {
            this.heroPosition.x--;
            this.heroSprite.currFrameIndex = 9;
        }
        if (this.dominantDirectionInput() == Direction.RIGHT) {
            this.heroPosition.x++;
            this.heroSprite.currFrameIndex = 3;
        }
    }

    render()
    {
        this.skySprite.draw(this.ctx, 0, 0);
        this.groundSprite.draw(this.ctx, 0, 0);
        this.shadowSprite.draw(this.ctx, this.heroPosition.x, this.heroPosition.y);
        this.heroSprite.draw(this.ctx, this.heroPosition.x, this.heroPosition.y);
    }
}

const main = new Main();