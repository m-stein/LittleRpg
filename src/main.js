import './style.css';
import { Direction, DirectionInput } from './direction_input.js';
import { Resources } from './resources.js';
import { Sprite } from './sprite.js';
import { Vector2 } from './vector_2.js';
import { GameEngine } from './game_engine.js';
import { LinearMovement } from './linear_movement.js';
import { floorVec2 } from './math.js';
import { Level1 } from './level_1.js';

class Main
{
    constructor()
    {
        this.resources = new Resources();
        this.lvl = new Level1(this.resources);
        this.directionInput = new DirectionInput(document);
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
        this.gameEngine = new GameEngine
        ({
            game: this,
            canvasSelector: '#gameCanvas',
            updatePeriodMs: 1000 / 60
        });
        this.gameEngine.start();
    }

    update(deltaTimeMs)
    {
        this.heroMovement.update(deltaTimeMs);
        this.heroSprite.position = floorVec2(this.heroMovement.at);
        this.shadowSprite.position = this.heroSprite.position;
        if (this.heroMovement.arrived) {
            let dst = this.heroMovement.at.copy();
            let dstChanged = false;
            const direction = this.directionInput.activeDirection()
            if (direction== Direction.UP) {
                dst.y -= this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 6;
                dstChanged = true;
            }
            if (direction == Direction.DOWN) {
                dst.y += this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 0;
                dstChanged = true;
            }
            if (direction == Direction.LEFT) {
                dst.x -= this.lvl.grid.cellSize;
                this.heroSprite.currFrameIndex = 9;
                dstChanged = true;
            }
            if (direction == Direction.RIGHT) {
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