import type { KolbBotPluginApi } from "kolb-bot/plugin-sdk/whatsapp";
import { emptyPluginConfigSchema } from "kolb-bot/plugin-sdk/whatsapp";
import { whatsappPlugin } from "./src/channel.js";
import { setWhatsAppRuntime } from "./src/runtime.js";

const plugin = {
  id: "whatsapp",
  name: "WhatsApp",
  description: "WhatsApp channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: KolbBotPluginApi) {
    setWhatsAppRuntime(api.runtime);
    api.registerChannel({ plugin: whatsappPlugin });
  },
};

export default plugin;
