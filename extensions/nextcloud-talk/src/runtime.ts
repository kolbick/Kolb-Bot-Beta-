import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/nextcloud-talk";

const { setRuntime: setNextcloudTalkRuntime, getRuntime: getNextcloudTalkRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Nextcloud Talk runtime not initialized");
export { getNextcloudTalkRuntime, setNextcloudTalkRuntime };
