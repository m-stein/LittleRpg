import { DrawingContext } from "./drawing_context";

export class GameObject
{
    constructor(position, label)
    {
        this.label = label;
        this.children = [];
        this.position = position;
    }

    addChild(child)
    {
        this.children.push(child);
    }

    updateRecursive(deltaTimeMs, level)
    {
        this.children.forEach((child) => { child.updateRecursive(deltaTimeMs, level + 1); });
        this.update(deltaTimeMs);
    }

    drawRecursive(drawingContext, level)
    {
        this.draw(drawingContext);
        drawingContext.position.add(this.position);
        this.children.forEach((child) => { child.drawRecursive(drawingContext, level + 1); });
        drawingContext.position.subtract(this.position);
    }

    update(deltaTimeMs) { /* May be overridden by an inheriting class. */ }

    draw(drawingContext) { /* May be overridden by an inheriting class. */ }
}