import type { KolbBotConfig } from "../config/config.js";
import { loadKolbBotPlugins } from "../plugins/loader.js";
import { resolveUserPath } from "../utils.js";

export function ensureRuntimePluginsLoaded(params: {
  config?: KolbBotConfig;
  workspaceDir?: string | null;
}): void {
  const workspaceDir =
    typeof params.workspaceDir === "string" && params.workspaceDir.trim()
      ? resolveUserPath(params.workspaceDir)
      : undefined;

  loadKolbBotPlugins({
    config: params.config,
    workspaceDir,
  });
}
