import { Shape, Circle, Square } from "./shape.js";
import { assertInstanceof } from "./types.js";
import { subVec2D } from "./vector.js";

export class Collider {
    constructor(shape) {
        if (this.construcor === Collider) {
            throw new Error("This is an abstract class");
        }
        assertInstanceof(shape, Shape);
        this.#shape = shape;
    }

    set shape(shape) {
        assertInstanceof(shape, Shape);
        this.#shape = shape;
    }
    get shape() {
        return this.#shape;
    }

    isColliding(collider) {
        throw new Error("Not implemented");
    }

    moveRelative(vec) {
        this.#shape.moveRelative(vec);
    }
    moveAbsolute(vec) {
        this.#shape.moveAbsolute(vec);
    }

    #shape;
}

export class CircleCollider extends Collider {
    constructor(shape) {
        assertInstanceof(shape, Circle);
        super(shape);
    }

    isColliding(collider) {
        let centerDistance = subVec2D(this.shape.rVector, collider.shape.rVector).length();
        return (centerDistance < (this.shape.radius + collider.shape.radius));
    }
}

export class SquareCollider extends Collider {
    constructor(shape) {
        assertInstanceof(shape, Square);
        super(shape);
    }

    isColliding(collider) {
        return ((collider.shape.rVector.x > this.shape.rVector.x + collider.shape.radius) && (collider.shape.rVector.x < this.shape.rVector.x + this.shape.size - collider.shape.radius) &&
            (collider.shape.rVector.y > this.shape.rVector.y + collider.shape.radius) && (collider.shape.rVector.y < this.shape.rVector.y + this.shape.size - collider.shape.radius))
    }
}
