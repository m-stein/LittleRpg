import { Vector2 } from './vector_2.js'

export class Grid
{
    constructor(cellSize)
    {
        this.cellSize = cellSize;
    }

    cellToPos(column, row)
    {
        return new Vector2(column * this.cellSize, row * this.cellSize);
    }

    posToCell(pos)
    {
        return [pos.x / this.cellSize, pos.y / this.cellSize];
    }
}