import { PhysObject, Portal } from "./phys.js";
import { CollisionResolver, EdgeCollisionResolver } from "./resolvers.js";
import { assertInstanceof } from "./types.js";


export class Engine {
    constructor(renderElement) {
        assertInstanceof(renderElement, SVGSVGElement);
        this.#renderElement = renderElement;
        this.#physObjects = new Array();
        this.#collisionResolvers = new Array();
        this.#portals = new Array();
        this.#fps = 0;
    }

    physTick() {
        this.processMovements();
        this.resolveCollisions();
        this.processPortals();
    }

    processMovements() {
        for (let obj of this.#physObjects) {
            obj.processMovement();
        }
    }

    processPortals() {
        for (let portal of this.#portals) {
            portal.process(this.#physObjects);
        }
    }

    resolveCollisions() {
        for (let resolver of this.#collisionResolvers) {
            resolver.resolve(this.#physObjects);
        }
    }

    render() {
        for (let portal of this.#portals) {
            portal.render(this.#renderElement);
        }
        for (let obj of this.#physObjects) {
            obj.render(this.#renderElement);
        }
    }

    tick() {
        this.physTick();
        this.render();
        ++this.#renderedFrames;
        requestAnimationFrame(() => { this.tick(); })
    }

    startEngine() {
        setInterval(() => { this.updateFps(); }, 1000);
        this.tick();
    }

    addObject(object) {
        assertInstanceof(object, PhysObject);
        this.#physObjects.push(object);
    }

    addResolver(resolver) {
        assertInstanceof(resolver, CollisionResolver);
        this.#collisionResolvers.push(resolver);
    }

    addPortal(portal) {
        assertInstanceof(portal, Portal);
        this.#portals.push(portal);
    }

    updateFps() {
        this.#fps = this.#renderedFrames;
        this.#renderedFrames = 0;
    }

    get fps() {
        return this.#fps;
    }

    get renderElement() {
        return this.#renderElement;
    }

    #renderElement;
    #physObjects;
    #collisionResolvers;
    #portals;

    #renderedFrames;
    #fps;
}