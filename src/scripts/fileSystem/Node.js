/* Ad Maiorem Dei Gloriam */
// The Node class abstracts fileSystem related metadata. It is a generic for a file or a folder.
/**@abstract*/
class Node {
    /** @param {string} name @param {Node} parent */
    constructor(name, parent=null) {
        this.name = name;
        this.parent = parent;
    }

    /** @returns {string} The absolute path, of the file/folder */
    getAbsolutePath() {
        // In case we're in the root
        if (this.parent == null) return "/";

        let current = this;
        const path = [];

        while (true) {
            path.unshift(current.name);
            if (current.parent == null) break;
            current = current.parent;
        }

        return path.join("/");
    }

}

export default Node;