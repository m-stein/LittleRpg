import { GameObject } from "./game_object.js";
import { Grid } from "./grid.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./vector_2.js";

export class Level1 extends GameObject
{
    constructor(resources)
    {
        super(new Vector2(0, 0), 'Level1');
        this.grid = new Grid(16);
        this.obstacles = [

            // island borders
            {col: 2, numCols: 1, row: 3, numRows: 4},
            {col: 3, numCols: 4, row: 2, numRows: 1},
            {col: 7, numCols: 8, row: 1, numRows: 1},
            {col: 15, numCols: 1, row: 2, numRows: 1},
            {col: 16, numCols: 1, row: 3, numRows: 4},
            {col: 3, numCols: 13, row: 7, numRows: 1},

            {col: 7, numCols:  4, row: 5, numRows: 1}, // water
            {col: 4, numCols:  2, row: 4, numRows: 2}, // hills
            {col: 8, numCols:  2, row: 3, numRows: 1}, // hills
            {col: 14, numCols:  1, row: 1, numRows: 2}, // tree
            {col: 13, numCols:  1, row: 3, numRows: 2}, // tree
            {col: 4, numCols:  1, row: 2, numRows: 2}, // tree
            {col: 14, numCols:  1, row: 4, numRows: 1}, // house
            {col: 12, numCols:  3, row: 6, numRows: 1}, // stones
        ];
        this.groundSprite = new Sprite
        ({
            sourceImage: resources.imageRegistry.ground,
            frameSize: new Vector2(320, 180),
            position: this.grid.cellToPos(0, 0),
        });
        this.items = [
            new Sprite({
                sourceImage: resources.imageRegistry.rod,
                frameSize: new Vector2(16, 16),
                position: this.grid.cellToPos(7, 6),
                framePadding: new Vector2(0, 5),
            }),
            new Sprite({
                sourceImage: resources.imageRegistry.rod,
                frameSize: new Vector2(16, 16),
                position: this.grid.cellToPos(12, 5),
                framePadding: new Vector2(0, 5),
            }),
        ];
        this.addChild(this.groundSprite);
        this.items.forEach((item) => { this.addChild(item); });
        this.markObstacles = false;
    }

    initialHeroPosition()
    {
        return this.grid.cellToPos(6, 5);
    }

    withItemAt(position, fn)
    {
        this.items.forEach((item) =>
        {
            if (item.position.equals(position)) {
                fn(item);
            }
        });
    }

    isObstacle(position)
    {
        let [col, row] = this.grid.posToCell(position);
        for (const obst of this.obstacles)
            if (row >= obst.row && row < obst.row + obst.numRows &&
                col >= obst.col && col < obst.col + obst.numCols)
                return true;

        return false;
    }

    update(deltaTimeMs) { this.updateChildren(deltaTimeMs); }

    drawObstacleMarks(drawingContext)
    {
        const globalAlpha = drawingContext.canvasContext.globalAlpha;
        const fillStyle = drawingContext.canvasContext.fillStyle
        drawingContext.canvasContext.globalAlpha = 0.3;
        drawingContext.canvasContext.fillStyle = 'red';
        this.obstacles.forEach((obstacle) => {
            const pos = this.grid.cellToPos(obstacle.col, obstacle.row);
            drawingContext.canvasContext.fillRect(
                pos.x, pos.y, obstacle.numCols * this.grid.cellSize, obstacle.numRows * this.grid.cellSize);
        });
        drawingContext.canvasContext.globalAlpha = globalAlpha;
        drawingContext.canvasContext.fillStyle = fillStyle;
    }

    draw(drawingContext)
    {
        this.drawChildren(drawingContext);
        if (this.markObstacles) {
            this.drawObstacleMarks(drawingContext);
        }
    }
}