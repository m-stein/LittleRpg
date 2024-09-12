import { Resources } from './resources.js'
import { Sprite } from './sprite.js'
import { Vector2 } from './vector2.js'
import { GameEngine } from './game_engine.js'
import './style.css'

class Main
{
    constructor()
    {
        this.resources = new Resources();
        this.gameCanvas = document.querySelector('#gameCanvas');
        this.ctx = gameCanvas.getContext("2d");
        this.skySprite = new Sprite({
            sourceImage: this.resources.imageRegistry.sky,
            frameSize: new Vector2(320, 180)
        });
        this.groundSprite = new Sprite({
            sourceImage: this.resources.imageRegistry.ground,
            frameSize: new Vector2(320, 180)
        });
        this.heroSprite = new Sprite({
            sourceImage: this.resources.imageRegistry.hero,
            frameSize: new Vector2(32, 32),
            numColumns: 3,
            numRows: 8,
            drawFrameIndex: 1,
            framePadding: new Vector2(8, 21)
        });
        this.shadowSprite = new Sprite({
            sourceImage: this.resources.imageRegistry.shadow,
            frameSize: new Vector2(32, 32),
            framePadding: new Vector2(8, 21)
        });
        this.gameEngine = new GameEngine(this);
        this.gameEngine.start();
    }

    update(time)
    {
    }

    render()
    {
        this.skySprite.draw(this.ctx, 0, 0);
        this.groundSprite.draw(this.ctx, 0, 0);
        this.shadowSprite.draw(this.ctx, 6*16, 5*16);
        this.heroSprite.draw(this.ctx, 6*16, 5*16);
    }
}

const main = new Main();