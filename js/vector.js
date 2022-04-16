import { assertType } from "./types.js"

export class Vector2D {
    constructor(x, y) {
        assertType(x, "number");
        assertType(y, "number");
        this.#x = x;
        this.#y = y;
    }

    set x(x) {
        this.#x = x;
    }
    get x() {
        return this.#x;
    }

    set y(y) {
        this.#y = y;
    }
    get y() {
        return this.#y;
    }

    add(vector) {
        this.#x += vector.x;
        this.#y += vector.y;
        return this;
    }

    sub(vector) {
        this.#x -= vector.x;
        this.#y -= vector.y
        return this;
    }

    mul(scalar) {
        this.#x *= scalar;
        this.#y *= scalar;
        return this;
    }

    div(scalar) {
        this.#x /= scalar;
        this.#y /= scalar;
        return this;
    }

    dot(vector) {
        return this.#x * vector.x + this.#y * vector.y;
    }

    length() {
        return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
    }

    normalize() {
        this.#x /= this.length();
        this.#y /= this.length();
        return this;
    }

    #x = 0;
    #y = 0;
}

export function addVec2D(vector1, vector2) {
    return new Vector2D(vector1.x + vector2.x, vector1.y + vector2.y);
}

export function subVec2D(vector1, vector2) {
    return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y);
}

export function mulVec2D(vector, scalar) {
    return new Vector2D(vector.x * scalar, vector.y * scalar);
}

export function divVec2D(vector, scalar) {
    return new Vector2D(vector.x / scalar, vector.y / scalar);
}
