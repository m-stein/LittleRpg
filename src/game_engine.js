import { DrawingContext } from "./drawing_context";
import { Vector2 } from "./vector_2";

export class GameEngine
{
    constructor({rootGameObj, canvas, updatePeriodMs})
    {
        this.drawingContext = new DrawingContext(canvas);
        this.lastUpdateTime = 0;
        this.accumulatedTime = 0;
        this.gameUpdatePeriodMs = updatePeriodMs;
        this.rootGameObj = rootGameObj;
        this.updateCallbackId = null;
        this.started = false;
    }

    update = (time) =>
    {
        if (!this.started)
            return;

        this.accumulatedTime += (time - this.lastUpdateTime);
        this.lastUpdateTime = time;
        let rootGameObjUpdated = false;
        while (this.accumulatedTime >= this.gameUpdatePeriodMs) {
            this.accumulatedTime -= this.gameUpdatePeriodMs;
            this.rootGameObj.updateRecursive(this.gameUpdatePeriodMs, 0);
            rootGameObjUpdated = true;
        }
        if (rootGameObjUpdated) {
            this.rootGameObj.drawRecursive(this.drawingContext, 0);
        }
        this.requestUpdate();
    }

    requestUpdate()
    {
        this.updateCallbackId = requestAnimationFrame(this.update);
    }

    cancelUpdate()
    {
        cancelAnimationFrame(this.updateCallbackId);
    }

    start()
    {
        if (this.started)
            return;

        this.started = true;
        this.requestUpdate();
    }

    stop()
    {
        if (!this.started)
            return;
        
        this.started = false;
        this.cancelUpdate();
    }
}