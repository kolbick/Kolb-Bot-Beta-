import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/googlechat";

const { setRuntime: setGoogleChatRuntime, getRuntime: getGoogleChatRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Google Chat runtime not initialized");
export { getGoogleChatRuntime, setGoogleChatRuntime };
