import './style.css';
import { Direction, DirectionInput } from './direction_input.js';
import { Resources } from './resources.js';
import { Sprite } from './sprite.js';
import { Vector2 } from './vector_2.js';
import { GameEngine } from './game_engine.js';
import { LinearMovement } from './linear_movement.js';
import { floorVec2 } from './math.js';
import { Level1 } from './level_1.js';
import { TimedValue } from './timed_value.js';

class Main
{
    constructor()
    {
        this.resources = new Resources();
        this.lvl = new Level1(this.resources);
        this.directionInput = new DirectionInput(document);
        this.heroLookingDirection = Direction.DOWN;
        this.heroMovement = new LinearMovement({at: this.lvl.grid.cellToPos(6, 5), speed: 0.005});
        this.lookingFrameIdx = [];
        this.movingFrameIdx = [];
        this.lookingFrameIdx[Direction.DOWN] = new TimedValue([{ val: 1, ms: 1000 }]);
        this.lookingFrameIdx[Direction.RIGHT] = new TimedValue([{ val: 4, ms: 1000 }]);
        this.lookingFrameIdx[Direction.UP] = new TimedValue([{ val: 7, ms: 1000 }]);
        this.lookingFrameIdx[Direction.LEFT] = new TimedValue([{ val: 10, ms: 1000 }]);
        this.movingFrameIdx[Direction.DOWN] = new TimedValue([
            { val: 1, ms: 100 },
            { val: 0, ms: 100 },
            { val: 1, ms: 100 },
            { val: 2, ms: 100 }
        ]);
        this.movingFrameIdx[Direction.RIGHT] = new TimedValue([
            { val: 4, ms: 100 },
            { val: 3, ms: 100 },
            { val: 4, ms: 100 },
            { val: 5, ms: 100 }
        ]);
        this.movingFrameIdx[Direction.UP] = new TimedValue([
            { val: 7, ms: 100 },
            { val: 6, ms: 100 },
            { val: 7, ms: 100 },
            { val: 8, ms: 100 }
        ]);
        this.movingFrameIdx[Direction.LEFT] = new TimedValue([
            { val: 10, ms: 100 },
            { val:  9, ms: 100 },
            { val: 10, ms: 100 },
            { val: 11, ms: 100 }
        ]);
        this.frameIdx = this.movingFrameIdx[Direction.DOWN];
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
            canvas: document.querySelector('#gameCanvas'),
            updatePeriodMs: 1000 / 60
        });
        this.gameEngine.start();
    }

    update(deltaTimeMs)
    {
        this.heroMovement.update(deltaTimeMs);
        this.frameIdx.update(deltaTimeMs);
        
        this.heroSprite.position = floorVec2(this.heroMovement.at);
        this.shadowSprite.position = this.heroSprite.position;
        if (this.heroMovement.arrived) {
            const direction = this.directionInput.activeDirection()
            if (direction === undefined) {
                this.frameIdx = this.lookingFrameIdx[this.heroLookingDirection];
                this.frameIdx.startPhase(0);
            } else {
                let dst = this.heroMovement.at.copy();
                switch (direction) {
                case Direction.UP: dst.y -= this.lvl.grid.cellSize; break;
                case Direction.DOWN: dst.y += this.lvl.grid.cellSize; break;
                case Direction.LEFT: dst.x -= this.lvl.grid.cellSize; break;
                case Direction.RIGHT: dst.x += this.lvl.grid.cellSize; break;
                }
                this.heroLookingDirection = direction;
                if (!this.lvl.isObstacle(dst)) {
                    this.heroMovement.startMovingTowards(dst);
                }
                this.frameIdx = this.movingFrameIdx[direction];
                this.frameIdx.startPhase(0);
            }
        }
        this.heroSprite.currFrameIndex = this.frameIdx.value();
    }

    draw(drawingContext)
    {
        this.lvl.draw(drawingContext);
        this.shadowSprite.draw(drawingContext);
        this.heroSprite.draw(drawingContext, true);
    }
}

const main = new Main();