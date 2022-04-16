import { assertInstanceof, assertType } from "./types.js"
import { Circle, Shape, Square } from "./shape.js"
import { Color } from "./color.js"



export class Renderable {
    constructor(shape, fillColor, borderColor) {
        if (this.constructor === Renderable) {
            throw new Error("This is abstract class");
        }
        assertInstanceof(shape, Shape);
        assertInstanceof(fillColor, Color);
        assertInstanceof(borderColor, Color);
        this.#shape = shape;
        this.#fillColor = fillColor;
        this.#borderColor = borderColor;
        this.#firstFrame = true;
    }

    set shape(shape) {
        assertInstanceof(shape, Shape);
        this.#shape = shape;
    }
    get shape() {
        return this.#shape;
    }

    set fillColor(color) {
        assertInstanceof(color, Color);
        this.#fillColor = color;
    }
    get fillColor() {
        return this.#fillColor;
    }

    set borderColor(color) {
        assertInstanceof(color, Color);
        this.#borderColor = color;
    }
    get borderColor() {
        return this.#borderColor;
    }

    set firstFrame(x) {
        assertType(x, "boolean");
        this.#firstFrame = x;
    }
    get firstFrame() {
        return this.#firstFrame;
    }

    set renderElement(element) {
        this.#renderElement = element;
    }
    get renderElement() {
        return this.#renderElement;
    }

    render(ctx) {
        throw new Error("Not implemented");
    }

    moveRelative(vec) {
        this.#shape.moveRelative(vec);
    }
    moveAbsolute(vec) {
        this.#shape.moveAbsolute(vec);
    }

    #shape;
    #fillColor;
    #borderColor;
    #firstFrame;
    #renderElement;
}

export class CircleRenderable extends Renderable {
    constructor(shape, fillColor, borderColor) {
        assertInstanceof(shape, Circle);
        super(shape, fillColor, borderColor);
    }

    render(element) {
        if (this.firstFrame) {
            this.renderElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            element.appendChild(this.renderElement);
            this.firstFrame = false;
        }
        this.renderElement.setAttribute("cx", this.shape.rVector.x);
        this.renderElement.setAttribute("cy", this.shape.rVector.y);
        this.renderElement.setAttribute("r", this.shape.radius);
        this.renderElement.setAttribute("fill", this.fillColor.styleString());
        this.renderElement.setAttribute("stroke", this.borderColor.styleString());
    }
}

export class SquareRenderable extends Renderable {
    constructor(shape, fillColor, borderColor) {
        assertInstanceof(shape, Square);
        super(shape, fillColor, borderColor);
    }

    render(element) {
        if (this.firstFrame) {
            this.renderElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            element.appendChild(this.renderElement);
            this.firstFrame = false;
        }
        this.renderElement.setAttribute("x", this.shape.rVector.x);
        this.renderElement.setAttribute("y", this.shape.rVector.y);
        this.renderElement.setAttribute("width", this.shape.size);
        this.renderElement.setAttribute("height", this.shape.size);
        this.renderElement.setAttribute("fill", this.fillColor.styleString());
        this.renderElement.setAttribute("stroke", this.borderColor.styleString());
    }
}