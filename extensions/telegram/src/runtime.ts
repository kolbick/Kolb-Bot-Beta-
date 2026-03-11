import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/telegram";

const { setRuntime: setTelegramRuntime, getRuntime: getTelegramRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Telegram runtime not initialized");
export { getTelegramRuntime, setTelegramRuntime };
