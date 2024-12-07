import * as vscode from 'vscode';
import * as chprocess from 'child_process';

var julec: boolean | null = null;   // julec found

function checkJulec(): boolean {
	if (julec === null) {
		try {
			chprocess.execSync('julec');
			julec = true;
		} catch {
			julec = false;
		}
	}
	if (julec === false)
		vscode.window.showErrorMessage('JuleC not found');
	return julec;
}

export function version(): void {
	if (!checkJulec())
		return;
	chprocess.exec('julec version', (err, stdout, stderr) => {
		if (err) {
			vscode.window.showErrorMessage('Jule version could not read!');
			return;
		}
		vscode.window.showInformationMessage('Your julec version: ' + stdout);
	});
}