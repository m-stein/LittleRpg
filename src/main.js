import { Resources } from './resources.js';
import { Sprite } from './sprite.js';
import { Vector2 } from './vector_2.js';
import { GameEngine } from './game_engine.js';
import { LinearMovement } from './linear_movement.js';
import { floorVec2 } from './math.js';
import { Level1 } from './level_1.js';
import './style.css';

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
        this.lvl = new Level1(this.resources);
        this.heroMovement = new LinearMovement({at: this.lvl.grid.cellToPos(6, 5), speed: 0.005});
        this.heroSprite = new Sprite
        ({
            sourceImage: this.resources.imageRegistry.hero,
            frameSize: new Vector2(32, 32),
            numColumns: 3,
            numRows: 8,
            drawFrameIndex: 1,
            framePadding: new Vector2(8, 21),
            position: this.heroMovement.at,
        });
        this.shadowSprite = new Sprite
        ({
            sourceImage: this.resources.imageRegistry.shadow,
            frameSize: new Vector2(32, 32),
            framePadding: new Vector2(8, 21),
            position: this.heroSprite.position,
        });
        this.activeDirectionInputs = [];
        document.addEventListener("keydown", this.onKeyDownEvent);
        document.addEventListener("keyup", this.onKeyUpEvent);
        this.gameEngine = new GameEngine
        ({
            game: this,
            canvasSelector: '#gameCanvas',
            updatePeriodMs: 1000 / 60
        });
        this.gameEngine.start();
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

    update(deltaTimeMs)
    {
        this.heroMovement.update(deltaTimeMs);
        this.heroSprite.position = floorVec2(this.heroMovement.at);
        this.shadowSprite.position = this.heroSprite.position;
        if (this.heroMovement.arrived) {
            let dst = this.heroMovement.at.copy();
            let dstChanged = false;
            if (this.dominantDirectionInput() == Direction.UP) {
                dst.y -= this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 6;
                dstChanged = true;
            }
            if (this.dominantDirectionInput() == Direction.DOWN) {
                dst.y += this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 0;
                dstChanged = true;
            }
            if (this.dominantDirectionInput() == Direction.LEFT) {
                dst.x -= this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 9;
                dstChanged = true;
            }
            if (this.dominantDirectionInput() == Direction.RIGHT) {
                dst.x += this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 3;
                dstChanged = true;
            }
            if (dstChanged && !this.lvl.isObstacle(dst))
                this.heroMovement.startMovingTowards(dst);
        }
    }

    draw(drawingContext)
    {
        this.lvl.draw(drawingContext);
        this.shadowSprite.draw(drawingContext);
        this.heroSprite.draw(drawingContext);
    }
}

const main = new Main();