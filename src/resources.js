export class Resources
{
    constructor()
    {
        this.imageRegistry = {
            sky: { src: "/sprites/sky.png" },
            ground: { src: "/sprites/ground.png" },
            hero: { src: "/sprites/hero.png" },
            rod: { src: "/sprites/rod.png" },
            shadow: { src: "/sprites/shadow.png" },
            spritesheet: { src: "/sprites/spritesheet.png" },
        };
        Object.values(this.imageRegistry).forEach(entry => {
            entry.image = new Image();
            entry.isLoaded = false;
            entry.image.onload = () => { entry.isLoaded = true; };
            entry.image.src = entry.src;
        });
    }
};