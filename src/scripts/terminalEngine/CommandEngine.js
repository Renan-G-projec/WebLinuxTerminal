/* Ad Maiorem Dei Gloriam */

import commands from "./Commands.js";
import User from "../userRelated/User.js";

/** 
 * @description Given a string, runs the command
 * and returns the message
 * @param {User} user
 * @param {string} command 
 * @returns {string} The success/Error Message
*/
async function processCommand(user, command) {
    const processedCommand = command.trim();
    const args = processedCommand.split(" ");

    const cmd = commands[args.shift()]; // The 1st argument should always be the command itself
    if (!cmd) {
        return "<span class='error'>[ERROR] - Command Not Found</span>";
    }
    const success = await cmd.run(user, args);
    if (success) {
        return cmd.successResponse;
    } else {
        return cmd.errorResponse;
    }
}

export default processCommand;