/* Ad Maiorem Dei Gloriam */
import Node from "./Node.js";

class File extends Node {
    constructor(name, parent) {
        super(name, parent);
        this.content = "";
    }

    /** @returns {string} Returns the file content */
    getContent() {
        return this.content;
    }

    /** @param {string} content  @returns {void}*/
    setContent(content) {
        this.content = content;
    }
}

export default File;