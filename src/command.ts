import * as vscode from 'vscode';
import * as chprocess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as ui from "./ui";

var julec: boolean | null = null;   // julec found
var julefmt: boolean | null = null; // julefmt found

function checkExec(exec: string): boolean {
	const pathDirs = process.env.PATH!.split(path.delimiter);
	for (const dir of pathDirs) {
		const fullPath = path.join(dir, exec + (process.platform === "win32" ? ".exe" : ""));
		if (fs.existsSync(fullPath)) {
			return true;
		}
	}
	return false;
}

export function checkJulec(): boolean {
	if (julec === null) {
		julec = checkExec('julec');
	}
	if (julec === false) {
		vscode.window.showErrorMessage('julec not found!');
	}
	return julec;
}

function checkJulefmt(): boolean {
	if (julefmt === null) {
		julefmt = checkExec('julefmt');
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
		if (ui.juleVersionStatus) {
			ui.juleVersionStatus.text = stdout;
		}
		vscode.window.showInformationMessage(`Your julec version: ${stdout}`);
	});
}

function findTestFile(file: string): string | undefined {
	const dir = path.dirname(file);
	const ext = path.extname(file);
	const base = path.basename(file, ext);
	const isTestFile = base.endsWith("_test");
	const candidates: string[] = [];
	if (isTestFile) {
		// foo_test.jule
		const normalName = base.slice(0, -5) + ext;
		// module/foo.jule
		candidates.push(
			path.join(dir, normalName)
		);
		// module/test/foo.jule
		if (path.basename(dir) === "test") {
			candidates.push(
				path.join(
					path.dirname(dir),
					normalName
				)
			);
		}
	} else {
		// foo.jule
		const testName = base + "_test" + ext;
		// module/foo_test.jule
		candidates.push(
			path.join(dir, testName)
		);
		// module/test/foo_test.jule
		candidates.push(
			path.join(
				dir,
				"test",
				testName
			)
		);
	}
	for (const candidate of candidates) {
		if (fs.existsSync(candidate)) {
			return candidate;
		}
	}
	return undefined;
}

export function toggleTestFile(): void {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const file = editor.document.uri.fsPath;
	const target = findTestFile(file);
	if (target) {
		vscode.window.showTextDocument(
			vscode.Uri.file(target)
		);
	}
}

// Formats document with julefmt, if possible.
// Designed for the vscode.languages.registerDocumentFormattingEditProvider registration.
export function format(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
	return new Promise<vscode.TextEdit[]>((resolve, reject) => {
		if (!checkJulefmt()) {
			return reject("julefmt not found");
		}
		let stdout = '';
		let stderr = '';
		// Use spawn instead of exec to avoid maxBufferExceeded error
		const p = chprocess.spawn('julefmt');
		p.stdout.setEncoding('utf8');
		p.stdout.on('data', (data) => (stdout += data));
		p.stderr.on('data', (data) => (stderr += data));
		p.on('error', (err) => {
			return reject(err);
		});
		p.on('close', (code) => {
			if (code !== 0 || stderr !== "") {
				//vscode.window.showInformationMessage(stderr);
				return reject(stderr);
			}
			// Return the complete file content in the edit.
			// VS Code will calculate minimal edits to be applied.
			const fileStart = new vscode.Position(0, 0);
			const fileEnd = document.lineAt(document.lineCount - 1).range.end;
			const textEdits: vscode.TextEdit[] = [
				new vscode.TextEdit(new vscode.Range(fileStart, fileEnd), stdout)
			];
			return resolve(textEdits);
		});
		if (p.pid) {
			p.stdin.end(document.getText());
		}
	});
}
