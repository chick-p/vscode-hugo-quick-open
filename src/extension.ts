import * as vscode from "vscode";
import * as path from "path";
import { previewPage, buildUrls } from "./page";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "com.github.chick-p.hugo-quick-open.menu",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const { dir, name: filename, ext } = path.parse(editor.document.fileName);
      if (ext !== ".md") {
        vscode.window.showErrorMessage(
          `${filename}${ext} is not Markdown file.`
        );
        return;
      }
      const urls = buildUrls({ dir, filename });
      vscode.window
        .showQuickPick(urls, {
          placeHolder: "Please select a URL.",
        })
        .then(
          (url) => {
            if (url) {
              previewPage(url);
            }
          },
          (err) => {
            console.error(err);
          }
        );
    }
  );
  context.subscriptions.push(command);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-empty-function
export function deactivate() {}
