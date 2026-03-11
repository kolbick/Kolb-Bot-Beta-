import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/zalo";

const { setRuntime: setZaloRuntime, getRuntime: getZaloRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Zalo runtime not initialized");
export { getZaloRuntime, setZaloRuntime };
