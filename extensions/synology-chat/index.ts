import type { KolbBotPluginApi } from "kolb-bot/plugin-sdk/synology-chat";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/synology-chat";
import { createSynologyChatPlugin } from "./src/channel.js";
import { setSynologyRuntime } from "./src/runtime.js";

const plugin = {
  id: "synology-chat",
  name: "Synology Chat",
  description: "Native Synology Chat channel plugin for Kolb-Bot",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setSynologyRuntime(api.runtime);
    api.registerChannel({ plugin: createSynologyChatPlugin() });
  },
};

export default plugin;
