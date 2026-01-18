/* Ad Maiorem Dei Gloriam */
import Folder from "./fileSystem/Folder.js";
import User from "./userRelated/User.js";
import TerminalInterface from "./terminalEngine/TerminalInterface.js";
import processCommand from "./terminalEngine/CommandEngine.js"

const root = new Folder("", null);
const user = new User(prompt("Choose a Name:"), root, root, false);

// MAIN LOOP
while (true) {
    const response = await TerminalInterface.writeLineAndTakeInput(`<span class='machine'>${user.name}@WebLinuxTerminal</span>: ~${user.currentDirectory.getAbsolutePath()} ${user.rooted?'#':'$'} `);
    TerminalInterface.writeLine(await processCommand(user, response.content));
}