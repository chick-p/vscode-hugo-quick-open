import * as vscode from "vscode";
import * as path from "path";
import * as open from "open";

import { getConfig } from "./config";

function getContentPath(dir: string) {
  const contentDir = getConfig("contentDir");
  const regexp = new RegExp(`(?<=${contentDir})`);
  const dirs = dir.split(regexp);
  if (dir.length >= 2) {
    dirs.shift();
    return dirs.join("").split(path.sep).join("/");
  }
  return "";
}

function buildPath(contentPath: string, filename: string) {
  if (getConfig("isUglyUrls")) {
    if (filename === "_index") {
      return `${contentPath}.html`;
    }
    return `${contentPath}/${filename}.html`;
  }
  if (filename === "_index") {
    return `${contentPath}/`;
  }
  return `${contentPath}/${filename}/`;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function buildUrls(params: { dir: string; filename: string }) {
  const { dir, filename } = params;
  const baseUrls = getConfig("baseUrls");
  const contentPath = getContentPath(dir);
  const urlPath = buildPath(contentPath, filename);
  return baseUrls.map((baseUrl) => `${baseUrl}${urlPath}`);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function previewPage(url: string) {
  const browser = getConfig("browser");
  vscode.window.showInformationMessage(`Open ${url}`);
  await open(url, { app: { name: getCollectBrowserName(browser) } });
}

function getCollectBrowserName(brower: string) {
  if (brower === "chrome") {
    const platform = process.platform;
    return platform === "darwin" || platform === "linux"
      ? "google chrome"
      : "chrome";
  }
  return brower;
}
