import * as vscode from 'vscode';
import * as command from './command';

enum CommandKind {
	Command,
}

// All commands of the extension.
const commands = [
	{ command: 'jule.version', handler: command.version, kind: CommandKind.Command },
];

// This method is called when the extension is activated.
// The extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext) {
	// Register extension commands.
	commands.forEach(pair => {
		let disposable: vscode.Disposable;
		switch (pair.kind) {
			case CommandKind.Command:
				disposable = vscode.commands.registerCommand(pair.command, pair.handler);
				break;
		}
		context.subscriptions.push(disposable);
	});

	// Register formatter support with API.
	vscode.languages.registerDocumentFormattingEditProvider('jule', { provideDocumentFormattingEdits: command.format });
}

// This method is called when the extension is deactivated.
export function deactivate() { }
