import type { KolbBotPluginApi } from "kolb-bot/plugin-sdk/signal";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/signal";
import { signalPlugin } from "./src/channel.js";
import { setSignalRuntime } from "./src/runtime.js";

const plugin = {
  id: "signal",
  name: "Signal",
  description: "Signal channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setSignalRuntime(api.runtime);
    api.registerChannel({ plugin: signalPlugin });
  },
};

export default plugin;
