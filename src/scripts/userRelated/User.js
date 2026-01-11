import Folder from "../fileSystem/Folder.js";

class User {
    /**
     * @param {string} name 
     * @param {Folder} startDirectory 
     * @param {boolean} rooted
     */
    constructor(name, startDirectory, rooted) {
        this.name = name;
        this.currentDirectory = startDirectory;
        this.rooted = rooted;
    }
}

export default User;