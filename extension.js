// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const jsonlint = require('jsonlint-mod');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "jsonlinter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.jsonLinter', function () {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if(!editor){
            this._statusBarItem.hide();
            return;
        }

        let doc = editor.document;

        var outputChannel = vscode.window.createOutputChannel('JSONLinter');

        try {
            var lint = jsonlint.parse(doc.getText());
            outputChannel.show();
            outputChannel.append('Valid JSON');
        } catch(e) {
            outputChannel.show();
            outputChannel.append(e.message);
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;