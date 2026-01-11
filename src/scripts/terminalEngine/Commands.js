import FileSystemUtils from "../fileSystem/FileSystemUtils.js";
import Folder from "../fileSystem/Folder.js";
import User from "../userRelated/User.js";

const commands = {
    cd: {
        argCount: 1,
        successResponse: null,
        errorResponse: "[ERROR] - Directory not found. \n [USAGE] - cd <path>",

        /**
         * @description Runs cd Command. 
         * @param {User} user 
         * @param {string[]} args  
         * @returns {boolean} If it was sucessiful.
         */
        run: (user, args) => {
            if (!args[0]) return false;

            const destination = FileSystemUtils.getFileSystemNodeInstanceByPath(args[0], user.root, user.currentDirectory);
            if (destination && destination instanceof Folder) {
                user.currentDirectory = destination;
                return true;
            }

            return false;
        } 
    }
}

export default commands;