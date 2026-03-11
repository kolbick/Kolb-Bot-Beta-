import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/slack";

const { setRuntime: setSlackRuntime, getRuntime: getSlackRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Slack runtime not initialized");
export { getSlackRuntime, setSlackRuntime };
