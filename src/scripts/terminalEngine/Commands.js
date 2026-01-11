import FileSystemUtils from "../fileSystem/FileSystemUtils.js";
import Folder from "../fileSystem/Folder.js";
import User from "../userRelated/User.js";

const commands = {
    cd: {
        argCount: 1,
        successResponse: null,
        errorResponse: "[ERROR] - Directory not found. \n [USAGE] - cd <path>",

        /**
         * @description Runs cd (change directory) Command. 
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
    },
    mkdir: {
        successResponse: null,
        errorResponse: "[ERROR] -> Directory already exists.",

        /**
         * @description Runs mkdir (make directory) Command. 
         * @param {User} user 
         * @param {string[]} args  
         * @returns {boolean} If it was sucessiful.
        */
        run(user, args) {
            for (const arg of args) {
                if (!FileSystemUtils.isValidPath(arg)) return false;
                if (arg.includes("/")) {
                    // TO-DO: Make the command check for a compose path. So, if the folder does not exist, it creates.
                } else {
                    const folder = new Folder(arg, user.currentDirectory);
                    user.currentDirectory.addChild(folder);
                }
            }

            return true;
        }
    },
    ls: {
        successResponse: "",
        errorResponse: "[ERROR] - Directory not found",

        /**
         * @description Runs ls (list) Command. 
         * @param {User} user 
         * @param {string[]} args  
         * @returns {boolean} If it was sucessiful.
        */
        run(user, args) {
            if (args.length == 0 || !args) {
                this.successResponse = user.currentDirectory.listAllChildren().join("  ")
                return true;
            }
            // TO-DO: implement a way to the user provide a path. Like: ls .. or even ls ./folder/otherFolder etc.
            return false;
        }
    }
}

export default commands;