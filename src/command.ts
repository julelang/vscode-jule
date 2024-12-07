import * as vscode from 'vscode';
import * as chprocess from 'child_process';
import * as path from 'path';

var julec: boolean | null = null;   // julec found
var julefmt: boolean | null = null; // julefmt found

function checkExec(exec: string): boolean {
	try {
		chprocess.execSync(exec);
		return true;
	} catch {
		return false;
	}
}

function checkJulec(): boolean {
	if (julec === null) {
		julec = checkExec('julec')
	}
	if (julec === false) {
		vscode.window.showErrorMessage('julec not found!');
	}
	return julec;
}

function checkJulefmt(): boolean {
	if (julefmt === null) {
		julefmt = checkExec('julefmt')
	}
	if (julefmt === false) {
		vscode.window.showErrorMessage('julefmt not found!');
	}
	return julefmt;
}

export function version(): void {
	if (!checkJulec()) {
		return;
	}
	chprocess.exec('julec version', (err, stdout, stderr) => {
		if (err) {
			vscode.window.showErrorMessage('Jule version could not read!');
			return;
		}
		vscode.window.showInformationMessage(`Your julec version: ${stdout}`);
	});
}

function formatFile(file: string): void {
	chprocess.exec(`julefmt ${file}`, (err, stdout, stderr) => {
		if (err) {
			vscode.window.showErrorMessage(`Source code could not be formatted: ${file}`);
			return;
		}
		if (stdout !== "") {
			// julefmt writed some output, show it.
			vscode.window.showInformationMessage(stdout);
		}
	})
}

export function format(): void {
	if (checkJulefmt()) {
		if (vscode.window.activeTextEditor === null || vscode.window.activeTextEditor === undefined) {
			vscode.window.showErrorMessage('Source code could not be formatted: no active editor.');
		} else {
			formatFile(vscode.window.activeTextEditor.document.fileName);
		}
	}
}

export function formatOnSave(document: vscode.TextDocument): void {
	// Return immediately if document is not Jule source code.
	if (document.languageId !== "jule") {
		return;
	}
	if (checkJulefmt()) {
		formatFile(document.fileName);
	}
}