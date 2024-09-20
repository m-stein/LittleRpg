import './style.css';
import { Resources } from './resources.js';
import { GameEngine } from './game_engine.js';
import { Level1 } from './level_1.js';
import { Hero } from './hero.js';
import { GameObject } from './game_object.js';
import { Vector2 } from './vector_2.js';

class Main extends GameObject
{
    constructor()
    {
        super(new Vector2(0, 0), 'Main');
        this.resources = new Resources();
        this.lvl = new Level1(this.resources.imageRegistry.sky, this.resources.imageRegistry.ground);
        this.hero = new Hero(this.lvl, this.resources.imageRegistry.hero, this.resources.imageRegistry.shadow, document);
        this.gameEngine = new GameEngine
        ({
            rootGameObj: this,
            canvas: document.querySelector('#gameCanvas'),
            updatePeriodMs: 1000 / 60
        });
        this.gameEngine.start();
        this.addChild(this.lvl);
        this.addChild(this.hero);
    }
}

const main = new Main();