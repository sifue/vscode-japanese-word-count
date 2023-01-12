// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { WordCountController } from './WordCountController';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let controller = new WordCountController();
	const command1 = vscode.commands.registerCommand('japanese-word-count.wordcount', () => {
		controller.update(/* force = */true);
	});
	const command2 = vscode.commands.registerCommand('japanese-word-count.wordcountActivate', () => {
		controller.activate();
	});
	const command3 = vscode.commands.registerCommand('japanese-word-count.wordcountDeactivate', () => {
		controller.deactivate();
	});

    context.subscriptions.push(command1);
    context.subscriptions.push(command2);
    context.subscriptions.push(command3);
    context.subscriptions.push(controller);
}

// This method is called when your extension is deactivated
export function deactivate() {}
