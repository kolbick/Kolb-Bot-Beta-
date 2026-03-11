import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/matrix";

const { setRuntime: setMatrixRuntime, getRuntime: getMatrixRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Matrix runtime not initialized");
export { getMatrixRuntime, setMatrixRuntime };
