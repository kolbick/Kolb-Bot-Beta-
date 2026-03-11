import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  findBundledPluginSource,
  findBundledPluginSourceInMap,
  resolveBundledPluginSources,
} from "./bundled-sources.js";

const discoverKolbBotPluginsMock = vi.fn();
const loadPluginManifestMock = vi.fn();

vi.mock("./discovery.js", () => ({
  discoverKolbBotPlugins: (...args: unknown[]) => discoverKolbBotPluginsMock(...args),
}));

vi.mock("./manifest.js", () => ({
  loadPluginManifest: (...args: unknown[]) => loadPluginManifestMock(...args),
}));

describe("bundled plugin sources", () => {
  beforeEach(() => {
    discoverKolbBotPluginsMock.mockReset();
    loadPluginManifestMock.mockReset();
  });

  it("resolves bundled sources keyed by plugin id", () => {
    discoverKolbBotPluginsMock.mockReturnValue({
      candidates: [
        {
          origin: "global",
          rootDir: "/global/feishu",
          packageName: "@kolb-bot/feishu",
          packageManifest: { install: { npmSpec: "@kolb-bot/feishu" } },
        },
        {
          origin: "bundled",
          rootDir: "/app/extensions/feishu",
          packageName: "@kolb-bot/feishu",
          packageManifest: { install: { npmSpec: "@kolb-bot/feishu" } },
        },
        {
          origin: "bundled",
          rootDir: "/app/extensions/feishu-dup",
          packageName: "@kolb-bot/feishu",
          packageManifest: { install: { npmSpec: "@kolb-bot/feishu" } },
        },
        {
          origin: "bundled",
          rootDir: "/app/extensions/msteams",
          packageName: "@kolb-bot/msteams",
          packageManifest: { install: { npmSpec: "@kolb-bot/msteams" } },
        },
      ],
      diagnostics: [],
    });

    loadPluginManifestMock.mockImplementation((rootDir: string) => {
      if (rootDir === "/app/extensions/feishu") {
        return { ok: true, manifest: { id: "feishu" } };
      }
      if (rootDir === "/app/extensions/msteams") {
        return { ok: true, manifest: { id: "msteams" } };
      }
      return {
        ok: false,
        error: "invalid manifest",
        manifestPath: `${rootDir}/kolb-bot.plugin.json`,
      };
    });

    const map = resolveBundledPluginSources({});

    expect(Array.from(map.keys())).toEqual(["feishu", "msteams"]);
    expect(map.get("feishu")).toEqual({
      pluginId: "feishu",
      localPath: "/app/extensions/feishu",
      npmSpec: "@kolb-bot/feishu",
    });
  });

  it("finds bundled source by npm spec", () => {
    discoverKolbBotPluginsMock.mockReturnValue({
      candidates: [
        {
          origin: "bundled",
          rootDir: "/app/extensions/feishu",
          packageName: "@kolb-bot/feishu",
          packageManifest: { install: { npmSpec: "@kolb-bot/feishu" } },
        },
      ],
      diagnostics: [],
    });
    loadPluginManifestMock.mockReturnValue({ ok: true, manifest: { id: "feishu" } });

    const resolved = findBundledPluginSource({
      lookup: { kind: "npmSpec", value: "@kolb-bot/feishu" },
    });
    const missing = findBundledPluginSource({
      lookup: { kind: "npmSpec", value: "@kolb-bot/not-found" },
    });

    expect(resolved?.pluginId).toBe("feishu");
    expect(resolved?.localPath).toBe("/app/extensions/feishu");
    expect(missing).toBeUndefined();
  });

  it("finds bundled source by plugin id", () => {
    discoverKolbBotPluginsMock.mockReturnValue({
      candidates: [
        {
          origin: "bundled",
          rootDir: "/app/extensions/diffs",
          packageName: "@kolb-bot/diffs",
          packageManifest: { install: { npmSpec: "@kolb-bot/diffs" } },
        },
      ],
      diagnostics: [],
    });
    loadPluginManifestMock.mockReturnValue({ ok: true, manifest: { id: "diffs" } });

    const resolved = findBundledPluginSource({
      lookup: { kind: "pluginId", value: "diffs" },
    });
    const missing = findBundledPluginSource({
      lookup: { kind: "pluginId", value: "not-found" },
    });

    expect(resolved?.pluginId).toBe("diffs");
    expect(resolved?.localPath).toBe("/app/extensions/diffs");
    expect(missing).toBeUndefined();
  });

  it("reuses a pre-resolved bundled map for repeated lookups", () => {
    const bundled = new Map([
      [
        "feishu",
        {
          pluginId: "feishu",
          localPath: "/app/extensions/feishu",
          npmSpec: "@kolb-bot/feishu",
        },
      ],
    ]);

    expect(
      findBundledPluginSourceInMap({
        bundled,
        lookup: { kind: "pluginId", value: "feishu" },
      }),
    ).toEqual({
      pluginId: "feishu",
      localPath: "/app/extensions/feishu",
      npmSpec: "@kolb-bot/feishu",
    });
    expect(
      findBundledPluginSourceInMap({
        bundled,
        lookup: { kind: "npmSpec", value: "@kolb-bot/feishu" },
      })?.pluginId,
    ).toBe("feishu");
  });
});
