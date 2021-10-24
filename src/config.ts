import * as vscode from "vscode";

type Config = {
  baseUrls: string[];
  browser: string;
  isUglyUrls: string;
  contentDir: string;
};

interface GetConfig {
  (key: undefined): "";
  <K extends keyof Config>(key: K): Config[K];
}

export const getConfig: GetConfig = <K extends keyof Config>(key?: K) => {
  const config = vscode.workspace.getConfiguration("hugo-quick-open");
  return key ? config[key] : config;
};
