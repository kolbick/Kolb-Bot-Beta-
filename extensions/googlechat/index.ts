import type { KolbBotPluginApi } from "kolb-bot/plugin-sdk/googlechat";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/googlechat";
import { googlechatDock, googlechatPlugin } from "./src/channel.js";
import { setGoogleChatRuntime } from "./src/runtime.js";

const plugin = {
  id: "googlechat",
  name: "Google Chat",
  description: "Kolb-Bot Google Chat channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setGoogleChatRuntime(api.runtime);
    api.registerChannel({ plugin: googlechatPlugin, dock: googlechatDock });
  },
};

export default plugin;
