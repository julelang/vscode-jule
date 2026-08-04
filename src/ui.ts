import * as vscode from 'vscode';

export let juleVersionStatus: vscode.StatusBarItem | undefined = undefined;

export function setJuleVersionStatus(item: vscode.StatusBarItem): void {
	juleVersionStatus = item;
}