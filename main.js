import { Resources } from './resources'
import './style.css'

const resources = new Resources();
const gameCanvas = document.querySelector('#gameCanvas');
const ctx = gameCanvas.getContext("2d");

const draw = () => {
  const sky = resources.imageReg.sky;
  if (sky.isLoaded) {
    ctx.drawImage(sky.image, 0, 0);
  } else {
    console.log("nope");
  }
}

setInterval(() => { draw(); }, 300);