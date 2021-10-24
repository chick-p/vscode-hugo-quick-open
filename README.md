# HUGO Quick Open

A [Visual Studio Code extension](https://code.visualstudio.com/) that open a page on HUGO server.

## Features

- Open page in browser  
  Open the command palette `Ctrl/Cmd` + `Shift` + `p` and type `hugo preview`. Select base URL.

## Usage

Run the following command:

```shell
code --install-extension vscode-hugo-quick-open-0.0.1.vsix
```

Build yourself with the following command:

```shell
yarn install
npx vsce package
code --install-extension vscode-hugo-quick-open-0.0.1.vsix
```

## Options

```json
// A list of base URLs
"hugo-preview.baseUrls": [
  "http://localhost:1313"
],
// Browser
"hugo-preview.browser": "chrome",
// Ugly URLs. See https://gohugo.io/content-management/urls/#ugly-urls
"hugo-preview.isUglyUrls": false,
// The directory from where Hugo reads content files.
"hugo-preview.contentDir": "content",
```
