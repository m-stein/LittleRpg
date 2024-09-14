import { Vector2 } from './vector2.js'

export class Grid
{
    constructor(cellSize)
    {
        this.cellSize = cellSize;
    }

    cell(column, row)
    {
        return new Vector2(column * this.cellSize, row * this.cellSize);
    }
}