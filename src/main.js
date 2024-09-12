import { Resources } from './resources.js'
import { Sprite } from './sprite.js'
import { Vector2 } from './vector2.js'
import './style.css'

const resources = new Resources();
const gameCanvas = document.querySelector('#gameCanvas');
const ctx = gameCanvas.getContext("2d");

const skySprite = new Sprite({
  sourceImage: resources.imageRegistry.sky,
  frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
  sourceImage: resources.imageRegistry.ground,
  frameSize: new Vector2(320, 180)
});

const heroSprite = new Sprite({
  sourceImage: resources.imageRegistry.hero,
  frameSize: new Vector2(32, 32),
  numColumns: 3,
  numRows: 8,
  drawFrameIndex: 1
});

const draw = () => {
  skySprite.draw(ctx, 0, 0);
  groundSprite.draw(ctx, 0, 0);
  heroSprite.draw(ctx, 5*16, 5*16);
}

setInterval(() => { draw(); }, 300);