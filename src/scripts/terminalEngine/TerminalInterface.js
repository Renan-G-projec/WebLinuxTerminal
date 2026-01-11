/* Ad Maiorem Dei Gloriam */
// Static class used to print lines and request inputs with DOM API.
class TerminalInterface {

    /** 
     * @param {string} content Content to be writen. 
     * @param {string} color RGBA string. Represents the color of the font. White by default.
     * @param {string} backgroundColor RGBA string. Represents the color the background. Transparent by default. 
     * @description Writes a new Line into the console.
    */

    static writeLine(content, color="rgba(255, 255, 255, 1)", backgroundColor="rgba(0, 0, 0, 0)") {
        const terminalContent = document.getElementById("terminal-content");
        const newLine = document.createElement('p'); // Not using Unordered List to avoid extra stylesheet lines.

        newLine.innerText = content;
        newLine.style.color = color;
        newLine.style.backgroundColor = backgroundColor;

        terminalContent.appendChild(newLine);

        return newLine; // For appending HTML elements when needed.
    }

    static writeLineAndTakeInput(content, color="rgba(255, 255, 255, 1)", backgroundColor="rgba(0, 0, 0, 0)") {
        return new Promise((resolve) => {
            const newLine = this.writeLine(content, color, backgroundColor);

            const userInput = document.createElement("input");

            userInput.style.cursor = "text";
            userInput.style.textAlign = "left";
            userInput.style.color = color;
            userInput.style.backgroundColor = backgroundColor;
            userInput.style.border = "none";
            userInput.style.outline = "none";
            userInput.style.font = "inherit";

            newLine.appendChild(userInput);
            userInput.focus();

            userInput.addEventListener("keydown", (keyEvent) => {
                if (keyEvent.key == "Enter") {
                    const userInputContent = userInput.value;
                    userInput.remove();
                    newLine.innerText += " " + userInputContent; // For display the user History
                    resolve(userInputContent);
                }
            })
        })
    }
}

export default TerminalInterface;