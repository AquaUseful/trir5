import { assertInstanceof, assertType } from "./types.js";
import { addVec2D, divVec2D, mulVec2D, subVec2D, Vector2D } from "./vector.js";

export class CollisionResolver {
    constructor() {
        if (this.constructor === CollisionResolver) {
            throw new Error("This is abstract class");
        }
    }

    resolve(objects) {
        throw new Error("Not implemented");
    }
}

export class EdgeCollisionResolver extends CollisionResolver {
    constructor(containerSize, energyCoef) {
        super();
        assertInstanceof(containerSize, Vector2D);
        assertType(energyCoef, "number");
        this.#containerSize = containerSize;
        this.#energyCoef = energyCoef;
    }

    resolve(objects) {
        for (let obj of objects) {
            if (obj.collider.shape.rVector.x < obj.collider.shape.radius) {
                obj.moveRelative(new Vector2D(-obj.collider.shape.rVector.x + obj.collider.shape.radius, 0));
                obj.velocity.x = -this.#energyCoef * obj.velocity.x;
            } else if (obj.collider.shape.rVector.x > (this.#containerSize.x - obj.collider.shape.radius)) {
                obj.moveRelative(new Vector2D(-((obj.collider.shape.rVector.x - this.#containerSize.x) + obj.collider.shape.radius), 0));
                obj.velocity.x = -this.#energyCoef * obj.velocity.x;
            }

            if (obj.collider.shape.rVector.y < obj.collider.shape.radius) {
                obj.moveRelative(new Vector2D(0, -obj.collider.shape.rVector.y + obj.collider.shape.radius));
                obj.velocity.y = -this.#energyCoef * obj.velocity.y;
            } else if (obj.collider.shape.rVector.y > (this.#containerSize.y - obj.collider.shape.radius)) {
                obj.moveRelative(new Vector2D(0, -((obj.collider.shape.rVector.y - this.#containerSize.y) + obj.collider.shape.radius)));
                obj.velocity.y = -this.#energyCoef * obj.velocity.y;
            }
        }
    }

    #containerSize;
    #energyCoef;
}

export class ElasticCollisionResolver extends CollisionResolver {
    resolve(objects) {
        for (let i = 0; i < objects.length; ++i) {
            for (let j = i + 1; j < objects.length; ++j) {
                if (objects[i].collider.isColliding(objects[j].collider)) {
                    let newVel1 = divVec2D(addVec2D(mulVec2D(objects[i].velocity, objects[i].mass - objects[j].mass),
                        mulVec2D(objects[j].velocity, objects[j].mass * 2)), objects[i].mass + objects[j].mass);
                    let newVel2 = divVec2D(addVec2D(mulVec2D(objects[j].velocity, objects[j].mass - objects[i].mass),
                        mulVec2D(objects[i].velocity, objects[i].mass * 2)), objects[i].mass + objects[j].mass);
                    objects[i].velocity = newVel1;
                    objects[j].velocity = newVel2;

                    let moveDirection = subVec2D(objects[i].collider.shape.rVector, objects[j].collider.shape.rVector);

                    let centerDistance = moveDirection.length();
                    let minDistance = objects[i].collider.shape.radius + objects[j].collider.shape.radius;

                    moveDirection.normalize();

                    let moveDistance = minDistance - centerDistance;
                    objects[i].moveRelative(moveDirection.mul(moveDistance));
                    //objects[j].moveRelative(moveDirection.mul(-moveDistance));

                }
            }
        }
    }
}
