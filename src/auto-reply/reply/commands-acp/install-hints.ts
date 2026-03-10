import { existsSync } from "node:fs";
import path from "node:path";
import type { KolbBotConfig } from "../../../config/config.js";

export function resolveConfiguredAcpBackendId(cfg: KolbBotConfig): string {
  return cfg.acp?.backend?.trim() || "acpx";
}

export function resolveAcpInstallCommandHint(cfg: KolbBotConfig): string {
  const configured = cfg.acp?.runtime?.installCommand?.trim();
  if (configured) {
    return configured;
  }
  const backendId = resolveConfiguredAcpBackendId(cfg).toLowerCase();
  if (backendId === "acpx") {
    const localPath = path.resolve(process.cwd(), "extensions/acpx");
    if (existsSync(localPath)) {
      return `kolb-bot plugins install ${localPath}`;
    }
    return "kolb-bot plugins install acpx";
  }
  return `Install and enable the plugin that provides ACP backend "${backendId}".`;
}
