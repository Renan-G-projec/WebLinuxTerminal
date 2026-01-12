/* Ad Maiorem Dei Gloriam */

import Folder from "./Folder.js";
import Node from "./Node.js";

/** 
  * @description This static class contains 
  * util functions related with the File System, 
  * such as determing if a given string is a
  * valid path, if it's an absolute path or not, 
  * or even returning the node instance by their 
  * path.
  * @static
*/
class FileSystemUtils {

    /**
     * @description Determines if a string representing a
     * path is absolute or relative. WARNING: it *does not*
     * check if the path is valid.
     * @param {string} path
     * @returns {boolean}
    */

    static isAbsolute(path) {
        return path.startsWith("/");
    }

    /**
     * @description Determines if a string is a valid path.
     * @param {string} path An Absolute or relative Path.
     * @returns {boolean}
    */

    static isValidPath(path) {
        if (typeof path !== "string" || path.trim() === "") return false;

        const forbiddenCharacters = /[<>:"\\|?*]/;
        return !forbiddenCharacters.test(path); // Checks if have this characters and negates them.
    };

    /**
     * @description Auxiliary function that helps to,
     * given a path (absolute or relative), returns the
     * file or folder related to them.
     * @param {string} path
     * @param {Folder} root
     * @param {Folder} startDirectory
     * @returns {Node|null}
    */

    static getFileSystemNodeInstanceByPath(path, root, startDirectory) {
        if (!FileSystemUtils.isValidPath(path)) return null;

        const isAbsolute = FileSystemUtils.isAbsolute(path);
        const pathArray = path.split("/").filter(nodeName => nodeName !== "."); // Removing the "." form path as they represents the current directory.;
        let currentDirectory = startDirectory;

        if (isAbsolute) {
            currentDirectory = root;
            pathArray.shift() // Deletes the "" that is the root

            for (const element of pathArray) {
                if (!(currentDirectory instanceof Folder)) return null;

                let child = currentDirectory.getChild(element);
                if (!child) return null;
                currentDirectory = child;
            }

            return currentDirectory;
        } 
        
        if (!isAbsolute) { // Not an elif for be more readable
            currentDirectory = startDirectory;


            for (const element of pathArray) {
                if (element === "..") {
                    currentDirectory = currentDirectory.parent || root; // Short circuit in ordder to prevent the user for going backwards in the root.
                } else {
                    if (!(currentDirectory instanceof Folder)) return null;
                    let child = currentDirectory.getChild(element);
                    if (!child) return null;
                    currentDirectory = child;
                }
            }

            return currentDirectory;
            
        }

        return null;
    }

    /**
     * @description Given a path, creates recursively
     * folders, checking if they already exist at current
     * folder.
     * @param {string} path
     * @param {Folder} root
     * @param {Folder} startDirectory
     * @returns {boolean} Sucess/error.
    */

    static createDirectoriesByPath(path, root, startDirectory) {
        if (!FileSystemUtils.isValidPath(path)) return false;

        const isAbsolute = FileSystemUtils.isAbsolute(path);
        const pathArray = path.split("/").filter(nodeName => nodeName !== ".");
        let currentDirectory = isAbsolute ? root : startDirectory; // Defines the starting point only one time.


        for (let node of pathArray) {
            const child = node === ".." ? currentDirectory.parent || currentDirectory : currentDirectory.getChild(node);
            if (!child) {
                const child = new Folder(node, currentDirectory)
                currentDirectory.addChild(child);
                currentDirectory = child;
            } else {
                currentDirectory = child;
            }
        }

        return true;
    }
}

export default FileSystemUtils;