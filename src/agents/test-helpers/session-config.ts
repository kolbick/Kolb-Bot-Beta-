import type { KolbBotConfig } from "../../config/config.js";

export function createPerSenderSessionConfig(
  overrides: Partial<NonNullable<KolbBotConfig["session"]>> = {},
): NonNullable<KolbBotConfig["session"]> {
  return {
    mainKey: "main",
    scope: "per-sender",
    ...overrides,
  };
}
