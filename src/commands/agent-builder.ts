/**
 * Agent Builder — a beginner-friendly, step-by-step interactive wizard
 * that guides users through creating a fully configured Kolb-Bot agent.
 *
 * Each step explains *what* it does and *why* in plain language,
 * so first-time users can build agents without reading docs first.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { resolveAgentDir, resolveAgentWorkspaceDir } from "../agents/agent-scope.js";
import { ensureAuthProfileStore } from "../agents/auth-profiles.js";
import { resolveAuthStorePath } from "../agents/auth-profiles/paths.js";
import { writeConfigFile } from "../config/config.js";
import { logConfigUpdated } from "../config/logging.js";
import { DEFAULT_AGENT_ID, normalizeAgentId } from "../routing/session-key.js";
import type { RuntimeEnv } from "../runtime.js";
import { defaultRuntime } from "../runtime.js";
import { resolveUserPath, shortenHomePath } from "../utils.js";
import { createClackPrompter } from "../wizard/clack-prompter.js";
import type { WizardPrompter } from "../wizard/prompts.js";
import { WizardCancelledError } from "../wizard/prompts.js";
import { applyAgentBindings, buildChannelBindings, describeBinding } from "./agents.bindings.js";
import { requireValidConfig } from "./agents.command-shared.js";
import { applyAgentConfig, listAgentEntries } from "./agents.config.js";
import { promptAuthChoiceGrouped } from "./auth-choice-prompt.js";
import { applyAuthChoice, warnIfModelConfigLooksOff } from "./auth-choice.js";
import { setupChannels } from "./onboard-channels.js";
import { ensureWorkspaceAndSessions } from "./onboard-helpers.js";
import type { ChannelChoice } from "./onboard-types.js";

// ---------------------------------------------------------------------------
// Preset templates — common agent archetypes beginners can pick from
// ---------------------------------------------------------------------------

export type AgentPreset = {
  id: string;
  label: string;
  hint: string;
  description: string[];
  identity: {
    name: string;
    emoji: string;
    creature: string;
    vibe: string;
  };
  skills: string[] | undefined;
  toolProfile: "minimal" | "coding" | "messaging" | "full";
  systemPromptSuggestion: string;
};

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: "chatbot",
    label: "Chatbot",
    hint: "A friendly conversational assistant",
    description: [
      "A general-purpose chat companion that can answer questions,",
      "hold conversations, and help with everyday tasks.",
      "Great starting point if you are not sure what to build.",
    ],
    identity: { name: "Assistant", emoji: "💬", creature: "helper", vibe: "friendly and helpful" },
    skills: undefined,
    toolProfile: "messaging",
    systemPromptSuggestion:
      "You are a friendly, helpful assistant. Answer questions clearly and concisely. " +
      "If you don't know something, say so honestly.",
  },
  {
    id: "coder",
    label: "Coding Assistant",
    hint: "Reads, writes, and explains code",
    description: [
      "A developer-focused agent with filesystem and exec tools.",
      "Can read files, write code, run commands, and explain",
      "programming concepts. Perfect for pair programming.",
    ],
    identity: {
      name: "CodeBot",
      emoji: "💻",
      creature: "programmer",
      vibe: "precise and technical",
    },
    skills: undefined,
    toolProfile: "coding",
    systemPromptSuggestion:
      "You are a skilled software engineer. Help the user write, debug, and understand code. " +
      "Prefer simple, readable solutions. Explain your reasoning when making changes.",
  },
  {
    id: "researcher",
    label: "Research Agent",
    hint: "Searches the web and summarizes findings",
    description: [
      "An agent focused on finding and synthesizing information.",
      "Can search the web, fetch pages, and compile results",
      "into clear summaries. Great for investigation tasks.",
    ],
    identity: {
      name: "Scholar",
      emoji: "🔍",
      creature: "researcher",
      vibe: "thorough and analytical",
    },
    skills: undefined,
    toolProfile: "full",
    systemPromptSuggestion:
      "You are a research assistant. Search for information, verify facts from multiple sources, " +
      "and present your findings in a clear, organized way with citations.",
  },
  {
    id: "ops",
    label: "DevOps / SysAdmin",
    hint: "Monitors systems and runs operations tasks",
    description: [
      "A systems-focused agent that can execute commands,",
      "monitor services, and automate operational workflows.",
      "Useful for server management and CI/CD tasks.",
    ],
    identity: { name: "OpsBot", emoji: "⚙️", creature: "operator", vibe: "reliable and careful" },
    skills: undefined,
    toolProfile: "full",
    systemPromptSuggestion:
      "You are a DevOps assistant. Help manage servers, automate tasks, and troubleshoot issues. " +
      "Always explain what commands do before running them. Be cautious with destructive operations.",
  },
  {
    id: "custom",
    label: "Custom (Start from scratch)",
    hint: "Build your own agent step by step",
    description: [
      "Start with a blank slate and configure everything yourself.",
      "You will be guided through each option with clear explanations.",
      "Recommended if you have a specific use case in mind.",
    ],
    identity: { name: "", emoji: "", creature: "", vibe: "" },
    skills: undefined,
    toolProfile: "messaging",
    systemPromptSuggestion: "",
  },
];

// ---------------------------------------------------------------------------
// Step helpers — each step shows context so beginners understand what they are doing
// ---------------------------------------------------------------------------

async function stepWelcome(prompter: WizardPrompter): Promise<void> {
  await prompter.intro("Kolb-Bot Agent Builder");
  await prompter.note(
    [
      "Welcome! This wizard will walk you through creating a new AI agent.",
      "",
      "An agent is a bot personality that can:",
      "  - Chat with you on messaging platforms (Discord, Telegram, etc.)",
      "  - Run tools (search, code, file access, web browsing)",
      "  - Remember conversations across sessions",
      "  - Have its own name, personality, and workspace",
      "",
      "Each step will explain what it does. Press Ctrl+C anytime to cancel.",
    ].join("\n"),
    "What is an agent?",
  );
}

async function stepPickPreset(prompter: WizardPrompter): Promise<AgentPreset> {
  await prompter.note(
    [
      "Presets give you a head start with sensible defaults.",
      "You can always change everything later.",
      "",
      "Pick the one closest to what you want, or choose Custom.",
    ].join("\n"),
    "Step 1: Choose a starting template",
  );

  const presetId = await prompter.select<string>({
    message: "What kind of agent do you want to build?",
    options: AGENT_PRESETS.map((p) => ({
      value: p.id,
      label: p.label,
      hint: p.hint,
    })),
  });

  const preset =
    AGENT_PRESETS.find((p) => p.id === presetId) ?? AGENT_PRESETS[AGENT_PRESETS.length - 1];

  if (preset.id !== "custom") {
    await prompter.note(preset.description.join("\n"), `${preset.label} preset`);
  }

  return preset;
}

async function stepNameAgent(
  prompter: WizardPrompter,
  preset: AgentPreset,
  existingIds: string[],
): Promise<{ name: string; agentId: string }> {
  await prompter.note(
    [
      "Your agent needs a name. This is used to identify it in commands",
      "and config. It will be normalized to lowercase with no spaces.",
      "",
      "Examples: my-helper, code-buddy, ops-agent, research-bot",
    ].join("\n"),
    "Step 2: Name your agent",
  );

  const defaultName =
    preset.id !== "custom" ? preset.identity.name.toLowerCase().replace(/\s+/g, "-") : "";

  const name = await prompter.text({
    message: "Agent name",
    placeholder: defaultName || "my-agent",
    initialValue: defaultName,
    validate: (value) => {
      if (!value?.trim()) {
        return "A name is required";
      }
      const normalized = normalizeAgentId(value);
      if (normalized === DEFAULT_AGENT_ID) {
        return `"${DEFAULT_AGENT_ID}" is reserved. Pick a different name.`;
      }
      if (existingIds.includes(normalized)) {
        return `An agent named "${normalized}" already exists. Pick a different name.`;
      }
      return undefined;
    },
  });

  const agentName = String(name ?? "").trim();
  const agentId = normalizeAgentId(agentName);

  if (agentName !== agentId) {
    await prompter.note(
      `Your name was normalized to "${agentId}" (lowercase, no spaces).`,
      "Agent ID",
    );
  }

  return { name: agentName, agentId };
}

async function stepIdentity(
  prompter: WizardPrompter,
  preset: AgentPreset,
): Promise<{ name: string; emoji: string; creature: string; vibe: string }> {
  await prompter.note(
    [
      "Give your agent a personality! These values shape how it",
      "introduces itself and how it appears in chat.",
      "",
      "  Name:     The display name shown in conversations",
      "  Emoji:    A single emoji shown next to the agent name",
      "  Creature: What kind of entity is it? (robot, wizard, etc.)",
      "  Vibe:     Its personality in a few words (warm, sarcastic, calm)",
    ].join("\n"),
    "Step 3: Agent personality",
  );

  const identityName = await prompter.text({
    message: "Display name (shown in chat)",
    placeholder: "Kolb-Bot",
    initialValue: preset.identity.name || "",
    validate: (v) => (v?.trim() ? undefined : "A display name is required"),
  });

  const emoji = await prompter.text({
    message: "Emoji (one character)",
    placeholder: "🤖",
    initialValue: preset.identity.emoji || "",
    validate: (v) => (v?.trim() ? undefined : "Pick an emoji"),
  });

  const creature = await prompter.text({
    message: "Creature type (what is this agent?)",
    placeholder: "robot, wizard, assistant, pirate...",
    initialValue: preset.identity.creature || "",
  });

  const vibe = await prompter.text({
    message: "Vibe (personality in a few words)",
    placeholder: "friendly and helpful, sharp and witty...",
    initialValue: preset.identity.vibe || "",
  });

  return {
    name: String(identityName ?? "").trim(),
    emoji: String(emoji ?? "").trim(),
    creature: String(creature ?? "").trim(),
    vibe: String(vibe ?? "").trim(),
  };
}

async function stepToolProfile(
  prompter: WizardPrompter,
  preset: AgentPreset,
): Promise<"minimal" | "coding" | "messaging" | "full"> {
  await prompter.note(
    [
      "Tool profiles control what your agent can do.",
      "You can always change this later in the config file.",
      "",
      "  minimal    - Chat only. No file access, no commands, no web.",
      "               Safest option. Good for simple Q&A bots.",
      "",
      "  messaging  - Chat + message tools. Can send/receive across channels.",
      "               Good for chatbots and notification agents.",
      "",
      "  coding     - Chat + file read/write + code execution.",
      "               For developer assistants and code review bots.",
      "",
      "  full       - Everything: files, exec, web search, web fetch,",
      "               media understanding, agent-to-agent messaging.",
      "               Most powerful but requires more trust.",
    ].join("\n"),
    "Step 4: Tool permissions",
  );

  const profile = await prompter.select<"minimal" | "coding" | "messaging" | "full">({
    message: "What tools should your agent have access to?",
    options: [
      { value: "minimal", label: "Minimal", hint: "Chat only — safest" },
      { value: "messaging", label: "Messaging", hint: "Chat + message tools" },
      { value: "coding", label: "Coding", hint: "Chat + file access + exec" },
      { value: "full", label: "Full", hint: "Everything — most powerful" },
    ],
    initialValue: preset.toolProfile,
  });

  return profile;
}

async function stepSystemPrompt(
  prompter: WizardPrompter,
  preset: AgentPreset,
  identity: { name: string; creature: string; vibe: string },
): Promise<string> {
  await prompter.note(
    [
      "The system prompt tells your agent who it is and how to behave.",
      "This is the most important part of your agent's personality.",
      "",
      "Think of it as the agent's instruction manual. It should describe:",
      "  - What the agent is (its role)",
      "  - How it should respond (tone, style)",
      "  - Any rules or boundaries",
      "",
      "You can write a simple one-liner or a detailed paragraph.",
      "The SOUL.md file in your workspace can extend this later.",
    ].join("\n"),
    "Step 5: System prompt (instructions for your agent)",
  );

  // Build a sensible default from the identity if no preset suggestion
  const suggestion =
    preset.systemPromptSuggestion ||
    (identity.name
      ? `You are ${identity.name}${identity.creature ? `, a ${identity.creature}` : ""}. ` +
        (identity.vibe ? `Your personality is ${identity.vibe}. ` : "") +
        "Help the user with their requests."
      : "You are a helpful assistant.");

  const prompt = await prompter.text({
    message: "System prompt (press Enter to accept the suggestion)",
    initialValue: suggestion,
    validate: (v) => (v?.trim() ? undefined : "A system prompt is required"),
  });

  return String(prompt ?? "").trim();
}

async function stepWorkspace(
  prompter: WizardPrompter,
  cfg: import("../config/config.js").KolbBotConfig,
  agentId: string,
): Promise<string> {
  const defaultWorkspace = resolveAgentWorkspaceDir(cfg, agentId);

  await prompter.note(
    [
      "Each agent has its own workspace — a folder where it stores:",
      "  - SOUL.md      (detailed personality and behavior rules)",
      "  - IDENTITY.md  (name, emoji, creature, vibe)",
      "  - AGENTS.md    (instructions for the agent system)",
      "  - TOOLS.md     (tool usage guidelines)",
      "  - memory/      (long-term memory files)",
      "",
      `Default location: ${shortenHomePath(defaultWorkspace)}`,
      "",
      "Press Enter to use the default, or type a custom path.",
    ].join("\n"),
    "Step 6: Workspace directory",
  );

  const input = await prompter.text({
    message: "Workspace directory",
    initialValue: defaultWorkspace,
    validate: (v) => (v?.trim() ? undefined : "A workspace directory is required"),
  });

  return resolveUserPath(String(input ?? "").trim() || defaultWorkspace);
}

async function stepChannels(
  prompter: WizardPrompter,
  cfg: import("../config/config.js").KolbBotConfig,
  runtime: RuntimeEnv,
): Promise<{
  config: import("../config/config.js").KolbBotConfig;
  selection: ChannelChoice[];
  accountIds: Partial<Record<ChannelChoice, string>>;
}> {
  await prompter.note(
    [
      "Channels are the messaging platforms your agent connects to.",
      "You can connect to Discord, Telegram, Slack, Signal, and more.",
      "",
      "This step is optional — you can add channels later with:",
      "  kolb-bot configure",
      "",
      "If you want to skip this, just press Enter without selecting any.",
    ].join("\n"),
    "Step 7: Connect messaging channels (optional)",
  );

  const wantsChannels = await prompter.confirm({
    message: "Set up messaging channels now?",
    initialValue: false,
  });

  if (!wantsChannels) {
    return { config: cfg, selection: [], accountIds: {} };
  }

  let selection: ChannelChoice[] = [];
  const accountIds: Partial<Record<ChannelChoice, string>> = {};
  const config = await setupChannels(cfg, runtime, prompter, {
    allowSignalInstall: true,
    onSelection: (value) => {
      selection = value;
    },
    promptAccountIds: true,
    onAccountId: (channel, accountId) => {
      accountIds[channel] = accountId;
    },
  });

  return { config, selection, accountIds };
}

async function stepAuth(
  prompter: WizardPrompter,
  cfg: import("../config/config.js").KolbBotConfig,
  runtime: RuntimeEnv,
  agentId: string,
  agentDir: string,
): Promise<{ config: import("../config/config.js").KolbBotConfig; agentModelOverride?: string }> {
  await prompter.note(
    [
      "Your agent needs an AI model to power its responses.",
      "This step connects it to a model provider (OpenAI, Anthropic, etc.).",
      "",
      "If you already configured auth in the main Kolb-Bot setup,",
      "you can copy those credentials instead of setting up new ones.",
      "",
      "You can always change the model later with:",
      "  kolb-bot config set agents.list[<index>].model <model-id>",
    ].join("\n"),
    "Step 8: AI model & authentication",
  );

  const wantsAuth = await prompter.confirm({
    message: "Configure the AI model/auth for this agent now?",
    initialValue: true,
  });

  if (!wantsAuth) {
    return { config: cfg };
  }

  const authStore = ensureAuthProfileStore(agentDir, {
    allowKeychainPrompt: false,
  });
  const authChoice = await promptAuthChoiceGrouped({
    prompter,
    store: authStore,
    includeSkip: true,
  });

  const authResult = await applyAuthChoice({
    authChoice,
    config: cfg,
    prompter,
    runtime,
    agentDir,
    setDefaultModel: false,
    agentId,
  });

  return {
    config: authResult.config,
    agentModelOverride: authResult.agentModelOverride,
  };
}

async function stepReview(
  prompter: WizardPrompter,
  params: {
    agentId: string;
    identity: { name: string; emoji: string; creature: string; vibe: string };
    toolProfile: string;
    workspaceDir: string;
    systemPrompt: string;
    channels: ChannelChoice[];
    hasAuth: boolean;
  },
): Promise<boolean> {
  const lines = [
    `  Agent ID:      ${params.agentId}`,
    `  Display Name:  ${params.identity.emoji} ${params.identity.name}`,
    params.identity.creature ? `  Creature:      ${params.identity.creature}` : "",
    params.identity.vibe ? `  Vibe:          ${params.identity.vibe}` : "",
    `  Tool Profile:  ${params.toolProfile}`,
    `  Workspace:     ${shortenHomePath(params.workspaceDir)}`,
    `  Auth/Model:    ${params.hasAuth ? "Configured" : "Not configured (can add later)"}`,
    params.channels.length > 0
      ? `  Channels:      ${params.channels.join(", ")}`
      : "  Channels:      None (can add later)",
    "",
    "System prompt:",
    `  ${params.systemPrompt.length > 120 ? `${params.systemPrompt.slice(0, 117)}...` : params.systemPrompt}`,
  ].filter(Boolean);

  await prompter.note(lines.join("\n"), "Review your agent");

  return prompter.confirm({
    message: "Create this agent?",
    initialValue: true,
  });
}

// ---------------------------------------------------------------------------
// Write workspace IDENTITY.md and SOUL.md
// ---------------------------------------------------------------------------

function buildIdentityMarkdown(identity: {
  name: string;
  emoji: string;
  creature: string;
  vibe: string;
}): string {
  const lines = ["# Agent Identity", ""];
  if (identity.name) {
    lines.push(`- **Name:** ${identity.name}`);
  }
  if (identity.emoji) {
    lines.push(`- **Emoji:** ${identity.emoji}`);
  }
  if (identity.creature) {
    lines.push(`- **Creature:** ${identity.creature}`);
  }
  if (identity.vibe) {
    lines.push(`- **Vibe:** ${identity.vibe}`);
  }
  lines.push("");
  return lines.join("\n");
}

function buildSoulMarkdown(
  systemPrompt: string,
  identity: {
    name: string;
    creature: string;
    vibe: string;
  },
): string {
  const lines = [
    `# ${identity.name || "Agent"} — Soul`,
    "",
    "## Core Identity",
    "",
    systemPrompt,
    "",
  ];
  if (identity.creature || identity.vibe) {
    lines.push("## Personality", "");
    if (identity.creature) {
      lines.push(`You are a **${identity.creature}**.`);
    }
    if (identity.vibe) {
      lines.push(`Your vibe is **${identity.vibe}**.`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export type AgentBuilderOptions = {
  json?: boolean;
};

export async function agentBuilderCommand(
  opts: AgentBuilderOptions = {},
  runtime: RuntimeEnv = defaultRuntime,
): Promise<void> {
  const cfg = await requireValidConfig(runtime);
  if (!cfg) {
    return;
  }

  const prompter = createClackPrompter();
  try {
    // --- Welcome ---
    await stepWelcome(prompter);

    // --- Step 1: Pick a preset ---
    const preset = await stepPickPreset(prompter);

    // --- Step 2: Name the agent ---
    const existingIds = listAgentEntries(cfg).map((e) => normalizeAgentId(e.id));
    const { name: agentName, agentId } = await stepNameAgent(prompter, preset, existingIds);

    // --- Step 3: Identity (personality) ---
    const identity = await stepIdentity(prompter, preset);

    // --- Step 4: Tool profile ---
    const toolProfile = await stepToolProfile(prompter, preset);

    // --- Step 5: System prompt ---
    const systemPrompt = await stepSystemPrompt(prompter, preset, identity);

    // --- Step 6: Workspace ---
    const workspaceDir = await stepWorkspace(prompter, cfg, agentId);
    const agentDir = resolveAgentDir(cfg, agentId);

    // --- Step 7: Channels (optional) ---
    const channelResult = await stepChannels(prompter, cfg, runtime);
    let nextConfig = channelResult.config;

    // --- Step 8: Auth / Model (optional) ---
    // Copy auth from default agent if available
    const defaultAgentId = listAgentEntries(cfg).find((e) => e.default)?.id;
    if (defaultAgentId) {
      const sourceAuth = resolveAuthStorePath(resolveAgentDir(cfg, defaultAgentId));
      const destAuth = resolveAuthStorePath(agentDir);
      const samePath =
        path.resolve(sourceAuth).toLowerCase() === path.resolve(destAuth).toLowerCase();
      if (!samePath) {
        try {
          await fs.stat(sourceAuth);
          const destExists = await fs
            .stat(destAuth)
            .then(() => true)
            .catch(() => false);
          if (!destExists) {
            const shouldCopy = await prompter.confirm({
              message: `Copy auth profiles from default agent "${defaultAgentId}"?`,
              initialValue: true,
            });
            if (shouldCopy) {
              await fs.mkdir(path.dirname(destAuth), { recursive: true });
              await fs.copyFile(sourceAuth, destAuth);
              await prompter.note(
                `Copied auth profiles from "${defaultAgentId}".`,
                "Auth profiles",
              );
            }
          }
        } catch {
          // Source auth doesn't exist — skip copy
        }
      }
    }

    const authResult = await stepAuth(prompter, nextConfig, runtime, agentId, agentDir);
    nextConfig = authResult.config;

    // --- Step 9: Review and confirm ---
    const confirmed = await stepReview(prompter, {
      agentId,
      identity,
      toolProfile,
      workspaceDir,
      systemPrompt,
      channels: channelResult.selection,
      hasAuth: Boolean(authResult.agentModelOverride),
    });

    if (!confirmed) {
      await prompter.outro("Agent creation cancelled. No changes made.");
      return;
    }

    // --- Apply config ---
    const progress = prompter.progress("Creating your agent...");

    progress.update("Saving agent config...");
    nextConfig = applyAgentConfig(nextConfig, {
      agentId,
      name: agentName,
      workspace: workspaceDir,
      agentDir,
      ...(authResult.agentModelOverride ? { model: authResult.agentModelOverride } : {}),
    });

    // Apply tool profile
    const agentsList = nextConfig.agents?.list ?? [];
    const agentIndex = agentsList.findIndex((e) => normalizeAgentId(e.id) === agentId);
    if (agentIndex >= 0) {
      agentsList[agentIndex] = {
        ...agentsList[agentIndex],
        tools: {
          ...agentsList[agentIndex].tools,
          profile: toolProfile,
        },
        identity: {
          name: identity.name,
          emoji: identity.emoji,
        },
      };
      nextConfig = {
        ...nextConfig,
        agents: {
          ...nextConfig.agents,
          list: agentsList,
        },
      };
    }

    // Apply channel bindings if any
    if (channelResult.selection.length > 0) {
      const desiredBindings = buildChannelBindings({
        agentId,
        selection: channelResult.selection,
        config: nextConfig,
        accountIds: channelResult.accountIds,
      });
      const bindingResult = applyAgentBindings(nextConfig, desiredBindings);
      nextConfig = bindingResult.config;

      if (bindingResult.conflicts.length > 0) {
        await prompter.note(
          [
            "Some channel bindings were skipped (already used by another agent):",
            ...bindingResult.conflicts.map(
              (c) => `  - ${describeBinding(c.binding)} (used by: ${c.existingAgentId})`,
            ),
          ].join("\n"),
          "Binding conflicts",
        );
      }
    }

    progress.update("Writing config file...");
    await writeConfigFile(nextConfig);
    logConfigUpdated(runtime);

    progress.update("Setting up workspace...");
    await ensureWorkspaceAndSessions(workspaceDir, runtime, {
      skipBootstrap: Boolean(nextConfig.agents?.defaults?.skipBootstrap),
      agentId,
    });

    // Write IDENTITY.md
    progress.update("Writing identity file...");
    const identityPath = path.join(workspaceDir, "IDENTITY.md");
    try {
      await fs.writeFile(identityPath, buildIdentityMarkdown(identity), {
        encoding: "utf-8",
        flag: "wx", // Don't overwrite existing
      });
    } catch (err) {
      const anyErr = err as { code?: string };
      if (anyErr.code !== "EEXIST") {
        throw err;
      }
      // File exists — that's fine, don't overwrite user changes
    }

    // Write SOUL.md
    progress.update("Writing soul file...");
    const soulPath = path.join(workspaceDir, "SOUL.md");
    try {
      await fs.writeFile(soulPath, buildSoulMarkdown(systemPrompt, identity), {
        encoding: "utf-8",
        flag: "wx",
      });
    } catch (err) {
      const anyErr = err as { code?: string };
      if (anyErr.code !== "EEXIST") {
        throw err;
      }
    }

    await warnIfModelConfigLooksOff(nextConfig, prompter, {
      agentId,
      agentDir,
    });

    progress.stop("Agent created!");

    // --- JSON output ---
    if (opts.json) {
      runtime.log(
        JSON.stringify(
          {
            agentId,
            name: agentName,
            identity,
            toolProfile,
            workspace: workspaceDir,
            agentDir,
            channels: channelResult.selection,
            systemPrompt,
          },
          null,
          2,
        ),
      );
    }

    // --- Final summary ---
    await prompter.note(
      [
        `Your agent "${identity.emoji} ${identity.name}" is ready!`,
        "",
        "What to do next:",
        `  1. Customize your agent's behavior:`,
        `     Edit ${shortenHomePath(path.join(workspaceDir, "SOUL.md"))}`,
        "",
        `  2. Run your agent:`,
        `     kolb-bot agent --agent ${agentId} --message "Hello!"`,
        "",
        `  3. Add more channels:`,
        `     kolb-bot configure`,
        "",
        `  4. List all agents:`,
        `     kolb-bot agents list`,
        "",
        `  5. Delete this agent:`,
        `     kolb-bot agents delete ${agentId}`,
      ].join("\n"),
      "Next steps",
    );

    await prompter.outro(`Agent "${agentId}" created successfully!`);
  } catch (err) {
    if (err instanceof WizardCancelledError) {
      runtime.exit(1);
      return;
    }
    throw err;
  }
}
