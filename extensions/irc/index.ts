import type { ChannelPlugin, KolbBotPluginApi } from "kolb-bot/plugin-sdk/irc";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/irc";
import { ircPlugin } from "./src/channel.js";
import { setIrcRuntime } from "./src/runtime.js";

const plugin = {
  id: "irc",
  name: "IRC",
  description: "IRC channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setIrcRuntime(api.runtime);
    api.registerChannel({ plugin: ircPlugin as ChannelPlugin });
  },
};

export default plugin;
