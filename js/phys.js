import { Shape, Circle, Square } from "./shape.js";
import { Renderable, CircleRenderable, SquareRenderable } from "./render.js";
import { assertInstanceof, assertType } from "./types.js";
import { CircleCollider, Collider, SquareCollider } from "./collider.js";
import { mulVec2D, subVec2D, Vector2D } from "./vector.js";
import { Color } from "./color.js";

export class PhysObject {
    constructor() {
        if (this.constructor === PhysObject) {
            throw new Error("This is an abstract class.");
        }
        this.#velocity = new Vector2D(0, 0);
        this.#acceleration = new Vector2D(0, 0);
    }

    set renderable(r) {
        assertInstanceof(r, Renderable);
        this.#renderable = r;
    }
    get renderable() {
        return this.#renderable;
    }

    set collider(c) {
        assertInstanceof(c, Collider);
        this.#collider = c;
    }
    get collider() {
        return this.#collider;
    }

    set velocity(vel) {
        this.#velocity = vel;
    }
    get velocity() {
        return this.#velocity;
    }

    set accleration(acc) {
        this.#acceleration = acc;
    }
    get accleration() {
        return this.#acceleration;
    }

    set mass(mass) {
        assertType(mass, "number");
        this.#mass = mass;
    }
    get mass() {
        return this.#mass;
    }

    processMovement() {
        this.#renderable.moveRelative(this.velocity);
        this.#collider.moveRelative(this.velocity);
        this.#velocity.add(this.#acceleration);
    }

    render(ctx) {
        this.#renderable.render(ctx);
    }

    isColliding(obj) {
        return this.#collider.isColliding(obj.collider);
    }

    moveAbsolute(vec) {
        this.#renderable.moveAbsolute(vec);
        this.#collider.moveAbsolute(vec);
    }

    moveRelative(vec) {
        this.#renderable.moveRelative(vec);
        this.#collider.moveRelative(vec);
    }

    #renderable;
    #collider;

    #velocity;
    #acceleration;

    #mass;
}

export class PhysCircle extends PhysObject {
    constructor(rVector, radius, mass, fillColor, borderColor) {
        super();
        this.renderable = new CircleRenderable(new Circle(rVector, radius), fillColor, borderColor);
        this.collider = new CircleCollider(new Circle(rVector, radius));
        this.mass = mass;
    }
}

export class Portal {
    constructor(entRVec, exRVec, size, entColor, exColor) {
        assertInstanceof(entRVec, Vector2D);
        assertInstanceof(exRVec, Vector2D);
        assertInstanceof(entColor, Color);
        assertInstanceof(exColor, Color);
        assertType(size, "number");

        let entShape = new Square(entRVec, size);

        this.#entRenderable = new SquareRenderable(entShape, entColor, entColor);
        this.#exRenderable = new SquareRenderable(new Square(exRVec, size), exColor, exColor);

        this.#entCollider = new SquareCollider(entShape);
    }

    process(objects) {
        let moveVector = subVec2D(this.#exRenderable.shape.rVector, this.#entRenderable.shape.rVector);
        for (let obj of objects) {
            if (this.#entCollider.isColliding(obj.collider)) {
                obj.moveRelative(moveVector.div(2));
            }
        }
    }

    render(renderElement) {
        this.#entRenderable.render(renderElement);
        this.#exRenderable.render(renderElement);
    }

    #entRenderable;
    #exRenderable;

    #entCollider;
}