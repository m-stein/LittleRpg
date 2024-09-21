import { GameObject } from "./game_object";
import { Sprite } from "./sprite";
import { Vector2 } from "./vector_2";

export class Camera extends GameObject
{
    constructor(backgroundImg, width, height)
    {
        super(new Vector2(0, 0), 'Camera');
        this.backgroundSprite = new Sprite
        ({
            sourceImage: backgroundImg,
            frameSize: new Vector2(width, height),
            position: new Vector2(0, 0),
        });
        console.log(this.backgroundSprite.frameSize.x, this.backgroundSprite.frameSize.y);
        this.addChild(this.backgroundSprite);
    }
}