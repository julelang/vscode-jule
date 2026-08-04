import * as vscode from 'vscode';
import * as chprocess from 'child_process';
import * as command from './command';
import * as ui from "./ui";

enum CommandKind {
	Command,
}

// All commands of the extension.
const commands = [
	{ command: 'jule.version', handler: command.version, kind: CommandKind.Command },
	{ command: 'jule.toggleTestFile', handler: command.toggleTestFile, kind: CommandKind.Command },
];

function registerExtensionCommands(context: vscode.ExtensionContext): void {
	commands.forEach(pair => {
		let disposable: vscode.Disposable;
		switch (pair.kind) {
			case CommandKind.Command:
				disposable = vscode.commands.registerCommand(pair.command, pair.handler);
				break;
		}
		context.subscriptions.push(disposable);
	});
}

function registerFormatterSupport(): void {
	vscode.languages.registerDocumentFormattingEditProvider('jule', { provideDocumentFormattingEdits: command.format });
	vscode.languages.registerDocumentFormattingEditProvider('julemod', { provideDocumentFormattingEdits: command.format });
}

function registerStatus(context: vscode.ExtensionContext): void {
	if (!command.checkJulec()) {
		return
	}
	chprocess.exec('julec version', (err, stdout, stderr) => {
		if (err) {
			return;
		}
		ui.setJuleVersionStatus(vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Right,
			100
		));
		ui.juleVersionStatus!.command = "jule.version";
		ui.juleVersionStatus!.text = stdout;
		context.subscriptions.push(
			ui.juleVersionStatus!,
		);
		ui.juleVersionStatus!.show();
	});
}

// This method is called when the extension is activated.
// The extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext) {
	registerExtensionCommands(context);
	registerFormatterSupport()
	registerStatus(context)
}

// This method is called when the extension is deactivated.
export function deactivate() { }
