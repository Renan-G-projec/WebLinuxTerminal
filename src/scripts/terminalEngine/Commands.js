/* Ad Maiorem Dei Gloriam */
import FileSystemUtils from "../fileSystem/FileSystemUtils.js";
import Folder from "../fileSystem/Folder.js";
import User from "../userRelated/User.js";

/*
    HOW TO ADD A COMMAND
    1. Create another object inside the `commands` object with the new commands's name.
    2. Add a default success response with the attribute `successResponse`.
    3. Add a default error response with the attribute `errorResponse`.
    4. Add a run() method that receives the user instance and the arguments `run(user, args)`.
*/
const commands = {
    cd: {
        argCount: 1,
        successResponse: null,
        errorResponse: "<span class='error'>[ERROR] - Directory not found. <br>[USAGE] - cd &lt;path&gt;.</span>",

        /**
         * @description Runs cd (change directory) Command. 
         * @param {User} user 
         * @param {string[]} args  
         * @returns {boolean} If it was sucessful.
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
        errorResponse: "<span class='error'>[ERROR] - Directory already exists or invalid directory name.</span>",

        /**
         * @description Runs mkdir (make directory) Command. 
         * @param {User} user 
         * @param {string[]} args  
         * @returns {boolean} If it was sucessful.
        */
        run(user, args) {
            for (const arg of args) {
                if (!FileSystemUtils.isValidPath(arg)) return false;
                FileSystemUtils.createDirectoriesByPath(arg, user.root, user.currentDirectory);
            }

            return true;
        }
    },
    ls: {
        successResponse: "",
        errorResponse: "",

        /**
         * @description Runs ls (list) Command. 
         * @param {User} user 
         * @param {string[]} args  
         * @returns {boolean} If it was sucessful.
        */
        run(user, args) {
            if (args.length == 0 || !args) {
                this.successResponse = user.currentDirectory.listAllChildren().join("  ")
                return true;
            } else {
                const wishedPath = args[0]; 
                if (!FileSystemUtils.isValidPath(wishedPath)) {
                    this.errorResponse = "<span class='error'>[ERROR] - Invalid Path</span>";
                    return false
                };

                const wishedDir = FileSystemUtils.getFileSystemNodeInstanceByPath(wishedPath, user.root, user.currentDirectory);
                if (!wishedDir) {
                    this.errorResponse = "<span class='error'>[ERROR] - Directory not found</span>";
                    return false;
                };

                this.successResponse = wishedDir.listAllChildren().join("  ");
                return true;
            }
        }
    },
    touch: {
        successResponse: null,
        errorResponse: "",

        /**
         * @description Runs touch command.
         * @param {User} user
         * @param {string[]} args
         * @returns {boolean} If it was successful
        */

        run(user, args) {
            if (!args || args.length == 0) {
                this.errorResponse = "<span class='error'>[ERROR] - At least 1 argument Required. <br> [USAGE] - touch <path></span>";
                return false;
            } else {
                for (const arg of args) {
                    const success = FileSystemUtils.createFileByPath(arg, user.root, user.currentDirectory);
                    if (!success) {
                        this.errorResponse = "<span class='error'>[ERROR] - Invalid path(s).</span>";
                        return false
                    }
                }
            }

            return true;
        }
    }
}

export default commands;