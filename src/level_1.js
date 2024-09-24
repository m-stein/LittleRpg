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
            {col: 3, numCols: 13, row: 7, numRows: 1},
            {col: 7, numCols:  4, row: 5, numRows: 1},
            {col: 4, numCols:  2, row: 4, numRows: 2},
        ];
        this.items = [];
        this.groundSprite = new Sprite
        ({
            sourceImage: resources.imageRegistry.ground,
            frameSize: new Vector2(320, 180),
            position: this.grid.cellToPos(0, 0),
        });
        this.rodSprite = new Sprite
        ({
            sourceImage: resources.imageRegistry.rod,
            frameSize: new Vector2(320, 180),
            position: this.grid.cellToPos(7, 6),
            framePadding: new Vector2(0, 5),
        });
        this.addChild(this.groundSprite);
        this.addChild(this.rodSprite);
        this.items.push(this.rodSprite)
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
}