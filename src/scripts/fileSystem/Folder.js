import Node from "./Node.js";

class Folder extends Node {
    constructor(name, parent) {
        super(name, parent);
        this.children = new Map();
    }

    /** @param {Node} child */
    addChild(child) {
        this.children.set(child.name, child);
    }
}