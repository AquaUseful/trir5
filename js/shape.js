import { assertInstanceof, assertType } from "./types.js"
import { Vector2D } from "./vector.js"

export class Shape {
    constructor() {
        if (this.constructor === Shape) {
            throw new Error("This is an abstract class");
        }
    }

    set rVector(vec) {
        assertInstanceof(vec, Vector2D);
        this.#rVector = vec;
    }
    get rVector() {
        return this.#rVector;
    }

    moveRelative(vec) {
        this.#rVector.add(vec);
    }

    moveAbsolute(vec) {
        this.#rVector = vec;
    }

    #rVector;
}

export class Circle extends Shape {
    constructor(rVector, radius) {
        super();
        assertInstanceof(rVector, Vector2D);
        assertType(radius, "number");
        this.rVector = rVector;
        this.#radius = radius;
    }

    set radius(radius) {
        assertType(radius, "number");
        this.#radius = radius;
    }
    get radius() {
        return this.#radius;
    }

    #radius;
}

export class Square extends Shape {
    constructor(rVector, size) {
        super();
        assertInstanceof(rVector, Vector2D);
        assertType(size, "number");
        this.rVector = rVector;
        this.#size = size;
    }

    set size(size) {
        assertType(size, "number");
        this.#size = size;
    }
    get size() {
        return this.#size;
    }

    #size;
}