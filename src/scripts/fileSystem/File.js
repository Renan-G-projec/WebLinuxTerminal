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

    /** @param {string} content  @returns {void}*/
    appendContent(content) {
        this.content += "<br>" + content;
    }
}

export default File;