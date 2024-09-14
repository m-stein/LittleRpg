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
        drawFrameIndex,
        position
    })
    {
        this.sourceImage = sourceImage;
        this.frameSize = frameSize;
        this.framePadding = framePadding ?? new Vector2(0, 0)
        this.numColumns = numColumns ?? 1;
        this.numRows = numRows ?? 1;
        this.scaleFactor = scaleFactor ?? 1;
        this.currFrameIndex = drawFrameIndex ?? 0;
        this.position = position ?? new Vector2(0, 0);
        this.frameMap = new Map();
        this.createFrameMap();
    }

    createFrameMap()
    {
        let frameIdx = 0;
        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            for (let colIdx = 0; colIdx < this.numColumns; colIdx++) {
                const framePos = new Vector2(colIdx * this.frameSize.x, rowIdx * this.frameSize.y);
                this.frameMap.set(frameIdx, framePos);
                frameIdx++;
            }
        }
    }

    draw(ctx)
    {
        if (!this.sourceImage.isLoaded)
            return;

        const frame = this.frameMap.get(this.currFrameIndex);
        if (!frame) {
            console.warn("failed to get frame from map");
            return;
        }
        ctx.drawImage(
            this.sourceImage.image, frame.x, frame.y,
            this.frameSize.x, this.frameSize.y,
            this.position.x - this.framePadding.x,
            this.position.y - this.framePadding.y,
            this.frameSize.x * this.scaleFactor,
            this.frameSize.y * this.scaleFactor
        );
    }
}