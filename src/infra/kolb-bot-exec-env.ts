export const KOLB_BOT_CLI_ENV_VAR = "KOLB_BOT_CLI";
export const KOLB_BOT_CLI_ENV_VALUE = "1";

export function markKolbBotExecEnv<T extends Record<string, string | undefined>>(env: T): T {
  return {
    ...env,
    [KOLB_BOT_CLI_ENV_VAR]: KOLB_BOT_CLI_ENV_VALUE,
  };
}

export function ensureKolbBotExecMarkerOnProcess(
  env: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  env[KOLB_BOT_CLI_ENV_VAR] = KOLB_BOT_CLI_ENV_VALUE;
  return env;
}
