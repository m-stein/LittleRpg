import './style.css';
import { Resources } from './resources.js';
import { GameEngine } from './game_engine.js';
import { Level1 } from './level_1.js';
import { Hero } from './hero.js';
import { GameObject } from './game_object.js';
import { Vector2 } from './vector_2.js';
import { Camera } from './camera.js';

class Main extends GameObject
{
    constructor()
    {
        super(new Vector2(0, 0), 'Main');
        this.resources = new Resources();
        this.lvl = new Level1(this.resources.imageRegistry.ground);
        this.hero = new Hero(this.lvl, this.resources.imageRegistry.hero, this.resources.imageRegistry.shadow, document);
        this.canvas = document.querySelector('#gameCanvas');
        this.camera = new Camera(this.resources.imageRegistry.sky, this.canvas.width, this.canvas.height);
        this.cameraOffset = new Vector2(this.lvl.grid.cellSize / 2 - this.canvas.width / 2, this.lvl.grid.cellSize / 2 - this.canvas.height / 2);
        this.gameEngine = new GameEngine
        ({
            rootGameObj: this,
            camera: this.camera,
            canvas: this.canvas,
            updatePeriodMs: 1000 / 60
        });
        this.gameEngine.start();
        this.addChild(this.camera);
        this.addChild(this.lvl);
        this.addChild(this.hero);
    }

    update()
    {
        this.camera.position = this.hero.position.copy();
        this.camera.position.add(this.cameraOffset);
    }
}

const main = new Main();