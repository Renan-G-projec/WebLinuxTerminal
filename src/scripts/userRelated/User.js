/* Ad Maiorem Dei Gloriam */
import Folder from "../fileSystem/Folder.js";

class User {
    /**
     * @param {string} name 
     * @param {Folder} startDirectory 
     * @param {Folder} root
     * @param {boolean} rooted
     */
    constructor(name, startDirectory, root, rooted) {
        this.name = name;
        this.currentDirectory = startDirectory;
        this.root = root;
        this.rooted = rooted;
    }
}

export default User;