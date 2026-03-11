import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/whatsapp";

const { setRuntime: setWhatsAppRuntime, getRuntime: getWhatsAppRuntime } =
  createPluginRuntimeStore<PluginRuntime>("WhatsApp runtime not initialized");
export { getWhatsAppRuntime, setWhatsAppRuntime };
