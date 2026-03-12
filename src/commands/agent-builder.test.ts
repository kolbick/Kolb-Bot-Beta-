import { beforeEach, describe, expect, it, vi } from "vitest";
import { baseConfigSnapshot, createTestRuntime } from "./test-runtime-config-helpers.js";

const readConfigFileSnapshotMock = vi.hoisted(() => vi.fn());
const writeConfigFileMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

const wizardMocks = vi.hoisted(() => ({
  createClackPrompter: vi.fn(),
}));

vi.mock("../config/config.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../config/config.js")>()),
  readConfigFileSnapshot: readConfigFileSnapshotMock,
  writeConfigFile: writeConfigFileMock,
}));

vi.mock("../wizard/clack-prompter.js", () => ({
  createClackPrompter: wizardMocks.createClackPrompter,
}));

vi.mock("./onboard-channels.js", () => ({
  setupChannels: vi.fn().mockImplementation((cfg) => Promise.resolve(cfg)),
}));

vi.mock("./auth-choice-prompt.js", () => ({
  promptAuthChoiceGrouped: vi.fn().mockResolvedValue({ type: "skip" }),
}));

vi.mock("./auth-choice.js", () => ({
  applyAuthChoice: vi
    .fn()
    .mockImplementation(({ config }) => Promise.resolve({ config, agentModelOverride: undefined })),
  warnIfModelConfigLooksOff: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./onboard-helpers.js", () => ({
  ensureWorkspaceAndSessions: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../agents/auth-profiles.js", () => ({
  ensureAuthProfileStore: vi.fn().mockReturnValue({}),
}));

vi.mock("../agents/auth-profiles/paths.js", () => ({
  resolveAuthStorePath: vi.fn().mockReturnValue("/tmp/auth.json"),
}));

import { WizardCancelledError } from "../wizard/prompts.js";
import { AGENT_PRESETS, agentBuilderCommand } from "./agent-builder.js";

const runtime = createTestRuntime();

function createMockPrompter(overrides: Record<string, unknown> = {}) {
  const textResponses: string[] = [];
  let textCallIndex = 0;

  return {
    intro: vi.fn().mockResolvedValue(undefined),
    outro: vi.fn().mockResolvedValue(undefined),
    note: vi.fn().mockResolvedValue(undefined),
    select: vi.fn().mockResolvedValue("chatbot"),
    multiselect: vi.fn().mockResolvedValue([]),
    text: vi.fn().mockImplementation(() => {
      const defaults = [
        "test-agent", // agent name
        "TestBot", // identity name
        "🤖", // emoji
        "robot", // creature
        "friendly", // vibe
        "You are a helpful assistant.", // system prompt
        "/tmp/test-workspace", // workspace
      ];
      const value = textResponses[textCallIndex] ?? defaults[textCallIndex] ?? "test";
      textCallIndex++;
      return Promise.resolve(value);
    }),
    confirm: vi.fn().mockResolvedValue(false),
    progress: vi.fn().mockReturnValue({
      update: vi.fn(),
      stop: vi.fn(),
    }),
    _setTextResponses: (responses: string[]) => {
      textResponses.length = 0;
      textResponses.push(...responses);
      textCallIndex = 0;
    },
    ...overrides,
  };
}

describe("agent builder", () => {
  beforeEach(() => {
    readConfigFileSnapshotMock.mockClear();
    writeConfigFileMock.mockClear();
    wizardMocks.createClackPrompter.mockClear();
    runtime.log.mockClear();
    runtime.error.mockClear();
    runtime.exit.mockClear();
  });

  it("exits with code 1 when the wizard is cancelled", async () => {
    readConfigFileSnapshotMock.mockResolvedValue({ ...baseConfigSnapshot });
    wizardMocks.createClackPrompter.mockReturnValue({
      intro: vi.fn().mockRejectedValue(new WizardCancelledError()),
      outro: vi.fn(),
      note: vi.fn(),
      select: vi.fn(),
      text: vi.fn(),
      confirm: vi.fn(),
      progress: vi.fn(),
    });

    await agentBuilderCommand({}, runtime);

    expect(runtime.exit).toHaveBeenCalledWith(1);
    expect(writeConfigFileMock).not.toHaveBeenCalled();
  });

  it("creates an agent when the user confirms", async () => {
    readConfigFileSnapshotMock.mockResolvedValue({ ...baseConfigSnapshot });

    const mockPrompter = createMockPrompter();
    // On confirm: say no to channels, no to auth copy, no to auth setup, yes to create
    let confirmIndex = 0;
    mockPrompter.confirm.mockImplementation(() => {
      const responses = [
        false, // channels: no
        false, // auth copy: skip (might not be called)
        false, // auth: no
        true, // create: yes
      ];
      const val = responses[confirmIndex] ?? true;
      confirmIndex++;
      return Promise.resolve(val);
    });

    wizardMocks.createClackPrompter.mockReturnValue(mockPrompter);

    await agentBuilderCommand({}, runtime);

    expect(writeConfigFileMock).toHaveBeenCalled();
    expect(mockPrompter.outro).toHaveBeenCalledWith(
      expect.stringContaining("created successfully"),
    );
  });

  it("does not write config when the user declines at review", async () => {
    readConfigFileSnapshotMock.mockResolvedValue({ ...baseConfigSnapshot });

    const mockPrompter = createMockPrompter();
    // All confirms return false (including the final "create this agent?" confirm)
    mockPrompter.confirm.mockResolvedValue(false);

    wizardMocks.createClackPrompter.mockReturnValue(mockPrompter);

    await agentBuilderCommand({}, runtime);

    expect(writeConfigFileMock).not.toHaveBeenCalled();
    expect(mockPrompter.outro).toHaveBeenCalledWith(expect.stringContaining("cancelled"));
  });

  describe("AGENT_PRESETS", () => {
    it("has at least 4 presets plus custom", () => {
      expect(AGENT_PRESETS.length).toBeGreaterThanOrEqual(5);
    });

    it("has unique preset ids", () => {
      const ids = AGENT_PRESETS.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("always has 'custom' as the last preset", () => {
      expect(AGENT_PRESETS[AGENT_PRESETS.length - 1].id).toBe("custom");
    });

    it("each preset has required fields", () => {
      for (const preset of AGENT_PRESETS) {
        expect(preset.id).toBeTruthy();
        expect(preset.label).toBeTruthy();
        expect(preset.hint).toBeTruthy();
        expect(preset.description.length).toBeGreaterThan(0);
        expect(preset.identity).toBeDefined();
        expect(preset.toolProfile).toBeTruthy();
      }
    });
  });
});
