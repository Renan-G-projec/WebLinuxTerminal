/* Ad Maiorem Dei Gloriam */
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
        return this.children.get(child);
    }

    /** @returns {string[]} */
    listAllChildren() {
        const childrenArray = Array.from(this.children.values());
        return childrenArray.map((children) => {
            let fileOrFolder = (children instanceof Folder) ? "folder" : "file";
            return `<span class='ls-${fileOrFolder}'>${children.name}${fileOrFolder === "folder" ? "/" : ""}</span>`;
        });
    }
}

export default Folder;