import * as vscode from 'vscode';
import * as command from './command';

enum CommandKind {
	Command,
	OnSave,
}

// All commands of the extension.
const commands = [
	{ command: 'jule.version', handler: command.version, kind: CommandKind.Command },
	{ command: 'jule.format', handler: command.format, kind: CommandKind.Command },
	{ command: 'jule.formatOnSave', handler: command.formatOnSave, kind: CommandKind.OnSave },
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
			case CommandKind.OnSave:
				disposable = vscode.workspace.onDidSaveTextDocument(pair.handler);
				break;
		}
		context.subscriptions.push(disposable);
	});
}

// This method is called when the extension is deactivated.
export function deactivate() { }
