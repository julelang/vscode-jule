import * as vscode from 'vscode';

// Reports whether the format on save enabled.
export function formatOnSave(): boolean {
	return vscode.workspace.getConfiguration().get<boolean>('jule.formatOnSave') ?? false;
}