import type { KolbBotPluginApi } from "kolb-bot/plugin-sdk/msteams";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/msteams";
import { msteamsPlugin } from "./src/channel.js";
import { setMSTeamsRuntime } from "./src/runtime.js";

const plugin = {
  id: "msteams",
  name: "Microsoft Teams",
  description: "Microsoft Teams channel plugin (Bot Framework)",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setMSTeamsRuntime(api.runtime);
    api.registerChannel({ plugin: msteamsPlugin });
  },
};

export default plugin;
