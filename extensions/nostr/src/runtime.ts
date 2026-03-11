import { createPluginRuntimeStore } from "kolb-bot/plugin-sdk/compat";
import type { PluginRuntime } from "kolb-bot/plugin-sdk/nostr";

const { setRuntime: setNostrRuntime, getRuntime: getNostrRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Nostr runtime not initialized");
export { getNostrRuntime, setNostrRuntime };
