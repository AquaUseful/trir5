export function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

export function assertType(val, type) {
    assert(typeof (type) === "string");
    assert(typeof (val) === type, "Expected type '" + type + "' but got '" + typeof (val) + "'");
}

export function assertInstanceof(obj, cls) {
    assert(obj instanceof cls, "Expected instance of '" + cls.name + "' but got '" + obj.constructor.name + "'")
}

export function assertTypeAll(arr, type) {
    assertType(type, "string");
    for (const el of arr) {
        assertType(el, type);
    }
}

export function assertInstanceofAll(arr, cls) {
    for (const el of arr) {
        assertInstanceof(el, cls);
    }
}
