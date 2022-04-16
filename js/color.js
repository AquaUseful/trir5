import { assert, assertType } from "./types.js"

export class Color {
    constructor(r, g, b, a) {
        assertType(r, "number");
        assert((r >= 0) && (r <= 255));

        assertType(g, "number");
        assert((g >= 0) && (g <= 255));

        assertType(b, "number");
        assert((b >= 0) && (b <= 255));

        assertType(a, "number");
        assert((a >= 0) && (a <= 1));

        this.#r = r;
        this.#g = g;
        this.#b = b;
        this.#a = a;
    }

    styleString() {
        return `rgba(${this.#r}, ${this.#g}, ${this.#b}, ${this.#a})`;
    }

    #r;
    #g;
    #b;
    #a;
}
