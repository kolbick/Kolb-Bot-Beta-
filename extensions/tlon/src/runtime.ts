import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/tlon";

const { setRuntime: setTlonRuntime, getRuntime: getTlonRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Tlon runtime not initialized");
export { getTlonRuntime, setTlonRuntime };
