import * as vscode from 'vscode';
import * as command from './command';

// All commands of the extension.
const commands = [
	{command: 'jule.version', handler: command.version},
];

// This method is called when the extension is activated.
// The extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext) {
	// Register extension commands.
	commands.forEach(pair => {
		const disposable = vscode.commands.registerCommand(pair.command, pair.handler);
		context.subscriptions.push(disposable);
	});
}

// This method is called when the extension is deactivated.
export function deactivate() {}
