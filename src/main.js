import './style.css';
import { Resources } from './resources.js';
import { GameEngine } from './game_engine.js';
import { Level1 } from './level_1.js';
import { Hero } from './hero.js';

class Main
{
    constructor()
    {
        this.resources = new Resources();
        this.lvl = new Level1(this.resources.imageRegistry.sky, this.resources.imageRegistry.ground);
        this.hero = new Hero(this.lvl, this.resources.imageRegistry.hero, this.resources.imageRegistry.shadow, document);
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
        this.hero.update(deltaTimeMs);
    }

    draw(drawingContext)
    {
        this.lvl.draw(drawingContext);
        this.hero.draw(drawingContext);
    }
}

const main = new Main();