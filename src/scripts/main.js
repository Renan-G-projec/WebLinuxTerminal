import Folder from "./fileSystem/Folder.js";
import User from "./userRelated/User.js";
import TerminalInterface from "./terminalEngine/TerminalInterface.js";
import processCommand from "./terminalEngine/CommandEngine.js"

const root = new Folder("", null);
const user = new User(prompt("Choose a Name:"), root, false);

const testFolder = new Folder("Teste", root);
root.addChild(testFolder);

// MAIN LOOP
while (true) {
    const response = await TerminalInterface.writeLineAndTakeInput(`${user.name}@WebLinuxTerminal: ~${user.currentDirectory.getAbsolutePath()} ${user.rooted?'#':'$'} `);
    TerminalInterface.writeLine(processCommand(user, response));
}