// Narrow plugin-sdk surface for the bundled diffs plugin.
// Keep this list additive and scoped to symbols used under extensions/diffs.

export type { KolbBotConfig } from "../config/config.js";
export { resolvePreferredKolbBotTmpDir } from "../infra/tmp-kolb-bot-dir.js";
export type {
  AnyAgentTool,
  KolbBotPluginApi,
  KolbBotPluginConfigSchema,
  PluginLogger,
} from "../plugins/types.js";
