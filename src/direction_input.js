export const Direction = { UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4, NONE: 5 }

export class DirectionInput
{
    constructor(input)
    {
        this.activeInputs = [];
        input.addEventListener("keydown", this.onKeyDownEvent);
        input.addEventListener("keyup", this.onKeyUpEvent);
    }

    onKeyDownEvent = (event) =>
    {
        if (event.code === "ArrowUp" || event.code === "KeyW")
            this.activateInput(Direction.UP);
        if (event.code === "ArrowDown" || event.code === "KeyS")
            this.activateInput(Direction.DOWN);
        if (event.code === "ArrowLeft" || event.code === "KeyA")
            this.activateInput(Direction.LEFT);
        if (event.code === "ArrowRight" || event.code === "KeyD")
            this.activateInput(Direction.RIGHT);
    }
    
    onKeyUpEvent = (event) =>
    {
        if (event.code === "ArrowUp" || event.code === "KeyW")
            this.deactivateInput(Direction.UP);
        if (event.code === "ArrowDown" || event.code === "KeyS")
            this.deactivateInput(Direction.DOWN);
        if (event.code === "ArrowLeft" || event.code === "KeyA")
            this.deactivateInput(Direction.LEFT);
        if (event.code === "ArrowRight" || event.code === "KeyD")
            this.deactivateInput(Direction.RIGHT);
    }

    activateInput(input)
    {
        // add input to front of list if it is not in the list
        if (this.activeInputs.indexOf(input) === -1)
            this.activeInputs.unshift(input);
    }

    deactivateInput(input)
    {
        // remove input from list if it is in the list
        const idx = this.activeInputs.indexOf(input);
        if (idx === -1)
            return;

        this.activeInputs.splice(idx, 1);
    }

    activeDirection()
    {
        if (this.activeInputs.length == 0)
            return Direction.NONE;

        return this.activeInputs[0]
    }
}