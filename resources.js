export class Resources
{
    constructor()
    {
        this.imageReg = {
            sky: { src: "/sprites/sky.png" },
            ground: { src: "/sprites/ground.png" },
            heroSheet: { src: "/sprites/heroSheet.png" },
            rod: { src: "/sprites/rod.png" },
            shadow: { src: "/sprites/shadow.png" },
            spritesheet: { src: "/sprites/spritesheet.png" },
        };
        Object.values(this.imageReg).forEach(entry => {
            entry.image = new Image();
            entry.isLoaded = false;
            entry.image.onload = () => { entry.isLoaded = true; };
            entry.image.src = entry.src;
        });
    }
};