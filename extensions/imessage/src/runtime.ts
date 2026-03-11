import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/imessage";

const { setRuntime: setIMessageRuntime, getRuntime: getIMessageRuntime } =
  createPluginRuntimeStore<PluginRuntime>("iMessage runtime not initialized");
export { getIMessageRuntime, setIMessageRuntime };
