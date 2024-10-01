import { Sprite } from "./sprite";
import { Vector2 } from "./vector_2";

export class Rod extends Sprite
{
    constructor(resources, position)
    {
        super({
            sourceImage: resources.imageRegistry.rod,
            position: position,
            framePadding: new Vector2(0, 5),
        });
    }
}