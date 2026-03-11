import type { ChannelPlugin, KolbBotPluginApi } from "kolb-bot/plugin-sdk/telegram";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/telegram";
import { telegramPlugin } from "./src/channel.js";
import { setTelegramRuntime } from "./src/runtime.js";

const plugin = {
  id: "telegram",
  name: "Telegram",
  description: "Telegram channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setTelegramRuntime(api.runtime);
    api.registerChannel({ plugin: telegramPlugin as ChannelPlugin });
  },
};

export default plugin;
