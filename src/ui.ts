import * as vscode from 'vscode';

export let juleVersionStatus: vscode.StatusBarItem | null = null;

export function setJuleVersionStatus(item: vscode.StatusBarItem): void {
	juleVersionStatus = item;
}