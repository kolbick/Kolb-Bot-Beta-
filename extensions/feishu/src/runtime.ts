import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/feishu";

const { setRuntime: setFeishuRuntime, getRuntime: getFeishuRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Feishu runtime not initialized");
export { getFeishuRuntime, setFeishuRuntime };
