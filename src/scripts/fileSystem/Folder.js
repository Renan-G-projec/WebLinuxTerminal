import Node from "./Node.js";

class Folder extends Node {
    constructor(name, parent) {
        super(name, parent);
        this.children = new Map();
    }

    /** @param {Node} child */
    addChild(child) {
        this.children.set(child.name, child); // Creating 2 nodes with the same name should be trated out the engine.
    }

    /** @param {string} child */
    getChild(child) {
        return this.children.get(child); // Again, error treating should happen on the TerminalEngine.
    }

    /** @returns {string[]} */
    listAllChildren() {
        return Array.from(this.children.keys());
    }
}

export default Folder;