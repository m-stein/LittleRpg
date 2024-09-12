import { Vector2 } from './vector2.js'

export class Sprite
{
    constructor({
        sourceImage,
        frameSize,
        framePadding,
        numColumns,
        numRows,
        scaleFactor,
        drawFrameIndex
    })
    {
        this.sourceImage = sourceImage;
        this.frameSize = frameSize;
        this.framePadding = framePadding ?? new Vector2(0, 0)
        this.numColumns = numColumns ?? 1;
        this.numRows = numRows ?? 1;
        this.scaleFactor = scaleFactor ?? 1;
        this.drawFrameIndex = drawFrameIndex ?? 0;
        this.frameMap = new Map();
        this.createFrameMap();
    }

    createFrameMap()
    {
        let frameIdx = 0;
        for (let colIdx = 0; colIdx < this.numColumns; colIdx++) {
            for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
                const framePos = new Vector2(rowIdx * this.frameSize.x, colIdx * this.frameSize.y);
                this.frameMap.set(frameIdx, framePos);
                frameIdx++;
            }
        }
    }

    draw(ctx, x, y)
    {
        if (!this.sourceImage.isLoaded)
            return;

        const frame = this.frameMap.get(this.drawFrameIndex);
        if (!frame) {
            console.warn("failed to get frame from map");
            return;
        }
        ctx.drawImage(
            this.sourceImage.image, frame.x, frame.y,
            this.frameSize.x, this.frameSize.y,
            x - this.framePadding.x, y - this.framePadding.y,
            this.frameSize.x * this.scaleFactor,
            this.frameSize.y * this.scaleFactor
        );
    }
}