export class GameEngine
{
    constructor({game, canvasSelector, updatePeriodMs})
    {
        this.canvas = document.querySelector(canvasSelector);
        this.drawingContext = this.canvas.getContext("2d");
        this.lastUpdateTime = 0;
        this.accumulatedTime = 0;
        this.gameUpdatePeriodMs = updatePeriodMs;
        this.game = game;
        this.updateCallbackId = null;
        this.started = false;
    }

    update = (time) =>
    {
        if (!this.started)
            return;

        this.accumulatedTime += (time - this.lastUpdateTime);
        this.lastUpdateTime = time;
        let gameUpdated = false;
        while (this.accumulatedTime >= this.gameUpdatePeriodMs) {
            this.accumulatedTime -= this.gameUpdatePeriodMs;
            this.game.update(this.gameUpdatePeriodMs);
            gameUpdated = true;
        }
        if (gameUpdated)
            this.game.draw(this.drawingContext);

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