import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/zalouser";

const { setRuntime: setZalouserRuntime, getRuntime: getZalouserRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Zalouser runtime not initialized");
export { getZalouserRuntime, setZalouserRuntime };
