# 🏴‍☠️ Kolb-Bot — Personal AI Assistant

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-logo-text.png" alt="Kolb-Bot" width="500">
    </picture>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-banner.png" alt="Kolb-Bot Banner" width="800">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-mascot.png" alt="Kolb-Bot Mascot" width="150">
</p>

<p align="center">
  <strong>Half human. Half AI. All pirate.</strong><br>
  <em>AI made simple — because everyone deserves a smart assistant, not just developers.</em>
</p>

<p align="center">
  <a href="https://github.com/kolbick/Kolb-Bot-Beta-/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/kolbick/Kolb-Bot-Beta-/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/kolbick/Kolb-Bot-Beta-/releases"><img src="https://img.shields.io/github/v/release/kolbick/Kolb-Bot-Beta-?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://github.com/kolbick/Kolb-Bot-Beta-"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**Kolb-Bot** is a personal AI assistant that actually explains what it's doing — in plain language a beginner can follow.

Most people only know how to use ChatGPT-style chat boxes. The real power of AI (agents, tools, automations, multi-channel messaging) is locked behind jargon and complexity that scares normal humans away. Kolb-Bot was built to change that.

It runs on your own devices, answers you on the channels you already use (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, and [20+ more](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels)), and walks you through every step in simple, beginner-friendly language. No PhD in prompt engineering required.

[Website](https://github.com/kolbick/Kolb-Bot-Beta-) · [Docs](https://docs.github.com/kolbick/Kolb-Bot-Beta-) · [Vision](VISION.md) · [DeepWiki](https://deepwiki.com/kolbick/Kolb-Bot-Beta-) · [Getting Started](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/getting-started) · [Updating](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/updating) · [Showcase](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/showcase) · [FAQ](https://docs.github.com/kolbick/Kolb-Bot-Beta-/help/faq) · [Wizard](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/wizard) · [Nix](https://github.com/kolb-bot/nix-kolb-bot) · [Docker](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/docker) · [Discord](https://github.com/kolbick/Kolb-Bot-Beta-)

Preferred setup: run the onboarding wizard (`kolb-bot onboard`) in your terminal.
The wizard guides you step by step through setting up the gateway, workspace, channels, and skills. The CLI wizard is the recommended path and works on **macOS, Linux, and Windows (via WSL2; strongly recommended)**.
Works with npm, pnpm, or bun.
New install? Start here: [Getting started](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/getting-started)

## Models (selection + auth)

- Models config + CLI: [Models](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/models)
- Auth profile rotation (OAuth vs API keys) + fallbacks: [Model failover](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/model-failover)

## Before you start

You need two things:

1. **Node.js 22 or newer** — this is the engine that runs Kolb-Bot (like how a browser runs websites). Don't have it? The installer script below will handle it for you, or you can [download it manually](https://nodejs.org/).
2. **An AI API key** — from a provider like [OpenAI](https://platform.openai.com/api-keys), [Anthropic](https://console.anthropic.com/), or [others](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/models). This is what powers the AI brain. The setup wizard will walk you through getting one if you don't have it yet.

## Install

Pick whichever method feels most familiar. They all do the same thing — get Kolb-Bot on your machine.

**Option A: One-line installer (recommended — handles everything for you)**

```bash
# macOS / Linux / WSL2
curl -fsSL https://github.com/kolbick/Kolb-Bot-Beta-/install.sh | bash

# Windows (PowerShell)
# iwr -useb https://github.com/kolbick/Kolb-Bot-Beta-/install.ps1 | iex
```

This script installs Node if you don't have it, installs Kolb-Bot, and launches the setup wizard.

**Option B: Homebrew (macOS/Linux)**

```bash
brew install kolb-bot
kolb-bot onboard --install-daemon
```

**Option C: npm/pnpm (if you already have Node installed)**

```bash
npm install -g kolb-bot@latest
# or: pnpm add -g kolb-bot@latest

kolb-bot onboard --install-daemon
```

The setup wizard walks you through everything step by step — what each choice means, what's happening, and why. It also installs the Gateway daemon (the background service that keeps your assistant running).

## Quick start (TL;DR)

Full beginner guide (auth, pairing, channels): [Getting started](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/getting-started)

```bash
kolb-bot onboard --install-daemon

kolb-bot gateway --port 18789 --verbose

# Send a message
kolb-bot message send --to +1234567890 --message "Hello from Kolb-Bot"

# Talk to the assistant (optionally deliver back to any connected channel: WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/IRC/Microsoft Teams/Matrix/Feishu/LINE/Mattermost/Nextcloud Talk/Nostr/Synology Chat/Tlon/Twitch/Zalo/Zalo Personal/WebChat)
kolb-bot agent --message "Ship checklist" --thinking high
```

Upgrading? [Updating guide](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/updating) (and run `kolb-bot doctor`).

## Development channels

- **stable**: tagged releases (`vYYYY.M.D` or `vYYYY.M.D-<patch>`), npm dist-tag `latest`.
- **beta**: prerelease tags (`vYYYY.M.D-beta.N`), npm dist-tag `beta` (macOS app may be missing).
- **dev**: moving head of `main`, npm dist-tag `dev` (when published).

Switch channels (git + npm): `kolb-bot update --channel stable|beta|dev`.
Details: [Development channels](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/development-channels).

## From source (development)

Prefer `pnpm` for builds from source. Bun is optional for running TypeScript directly.

```bash
git clone https://github.com/kolbick/Kolb-Bot-Beta-.git
cd kolb-bot

pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build

pnpm kolb-bot onboard --install-daemon

# Dev loop (auto-reload on TS changes)
pnpm gateway:watch
```

Note: `pnpm kolb-bot ...` runs TypeScript directly (via `tsx`). `pnpm build` produces `dist/` for running via Node / the packaged `kolb-bot` binary.

## Security defaults (DM access)

Kolb-Bot connects to real messaging surfaces. Treat inbound DMs as **untrusted input**.

Full security guide: [Security](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security)

Default behavior on Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack:

- **DM pairing** (`dmPolicy="pairing"` / `channels.discord.dmPolicy="pairing"` / `channels.slack.dmPolicy="pairing"`; legacy: `channels.discord.dm.policy`, `channels.slack.dm.policy`): unknown senders receive a short pairing code and the bot does not process their message.
- Approve with: `kolb-bot pairing approve <channel> <code>` (then the sender is added to a local allowlist store).
- Public inbound DMs require an explicit opt-in: set `dmPolicy="open"` and include `"*"` in the channel allowlist (`allowFrom` / `channels.discord.allowFrom` / `channels.slack.allowFrom`; legacy: `channels.discord.dm.allowFrom`, `channels.slack.dm.allowFrom`).

Run `kolb-bot doctor` to surface risky/misconfigured DM policies.

## Highlights

- **[Local-first Gateway](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway)** — single control plane for sessions, channels, tools, and events.
- **[Multi-channel inbox](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels)** — WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, BlueBubbles (iMessage), iMessage (legacy), IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, Zalo Personal, WebChat, macOS, iOS/Android.
- **[Multi-agent routing](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/configuration)** — route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions).
- **[Voice Wake](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/voicewake) + [Talk Mode](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/talk)** — wake words on macOS/iOS and continuous voice on Android (ElevenLabs + system TTS fallback).
- **[Live Canvas](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas)** — agent-driven visual workspace with [A2UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas#canvas-a2ui).
- **[First-class tools](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools)** — browser, canvas, nodes, cron, sessions, and Discord/Slack actions.
- **[Companion apps](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/macos)** — macOS menu bar app + iOS/Android [nodes](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes).
- **[Onboarding](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/wizard) + [skills](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/skills)** — wizard-driven setup with bundled/managed/workspace skills.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=kolbick/Kolb-Bot-Beta-&type=date&legend=top-left)](https://www.star-history.com/#kolbick/Kolb-Bot-Beta-&type=date&legend=top-left)

## Everything we built so far

### Core platform

- [Gateway WS control plane](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway) with sessions, presence, config, cron, webhooks, [Control UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web), and [Canvas host](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas#canvas-a2ui).
- [CLI surface](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/agent-send): gateway, agent, send, [wizard](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/wizard), and [doctor](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/doctor).
- [Pi agent runtime](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/agent) in RPC mode with tool streaming and block streaming.
- [Session model](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/session): `main` for direct chats, group isolation, activation modes, queue modes, reply-back. Group rules: [Groups](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/groups).
- [Media pipeline](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/images): images/audio/video, transcription hooks, size caps, temp file lifecycle. Audio details: [Audio](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/audio).

### Channels

- [Channels](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels): [WhatsApp](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/whatsapp) (Baileys), [Telegram](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/telegram) (grammY), [Slack](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/slack) (Bolt), [Discord](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/discord) (discord.js), [Google Chat](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/googlechat) (Chat API), [Signal](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/signal) (signal-cli), [BlueBubbles](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/bluebubbles) (iMessage, recommended), [iMessage](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/imessage) (legacy imsg), [IRC](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/irc), [Microsoft Teams](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/msteams), [Matrix](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/matrix), [Feishu](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/feishu), [LINE](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/line), [Mattermost](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/mattermost), [Nextcloud Talk](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/nextcloud-talk), [Nostr](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/nostr), [Synology Chat](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/synology-chat), [Tlon](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/tlon), [Twitch](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/twitch), [Zalo](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/zalo), [Zalo Personal](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/zalouser), [WebChat](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web/webchat).
- [Group routing](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/group-messages): mention gating, reply tags, per-channel chunking and routing. Channel rules: [Channels](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels).

### Apps + nodes

- [macOS app](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/macos): menu bar control plane, [Voice Wake](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/voicewake)/PTT, [Talk Mode](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/talk) overlay, [WebChat](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web/webchat), debug tools, [remote gateway](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote) control.
- [iOS node](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/ios): [Canvas](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas), [Voice Wake](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/voicewake), [Talk Mode](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/talk), camera, screen recording, Bonjour + device pairing.
- [Android node](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/android): Connect tab (setup code/manual), chat sessions, voice tab, [Canvas](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas), camera/screen recording, and Android device commands (notifications/location/SMS/photos/contacts/calendar/motion/app update).
- [macOS node mode](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes): system.run/notify + canvas/camera exposure.

### Tools + automation

- [Browser control](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/browser): dedicated kolb-bot Chrome/Chromium, snapshots, actions, uploads, profiles.
- [Canvas](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas): [A2UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas#canvas-a2ui) push/reset, eval, snapshot.
- [Nodes](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes): camera snap/clip, screen record, [location.get](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/location-command), notifications.
- [Cron + wakeups](https://docs.github.com/kolbick/Kolb-Bot-Beta-/automation/cron-jobs); [webhooks](https://docs.github.com/kolbick/Kolb-Bot-Beta-/automation/webhook); [Gmail Pub/Sub](https://docs.github.com/kolbick/Kolb-Bot-Beta-/automation/gmail-pubsub).
- [Skills platform](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/skills): bundled, managed, and workspace skills with install gating + UI.

### Runtime + safety

- [Channel routing](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/channel-routing), [retry policy](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/retry), and [streaming/chunking](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/streaming).
- [Presence](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/presence), [typing indicators](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/typing-indicators), and [usage tracking](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/usage-tracking).
- [Models](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/models), [model failover](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/model-failover), and [session pruning](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/session-pruning).
- [Security](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security) and [troubleshooting](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/troubleshooting).

### Ops + packaging

- [Control UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web) + [WebChat](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web/webchat) served directly from the Gateway.
- [Tailscale Serve/Funnel](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/tailscale) or [SSH tunnels](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote) with token/password auth.
- [Nix mode](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/nix) for declarative config; [Docker](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/docker)-based installs.
- [Doctor](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/doctor) migrations, [logging](https://docs.github.com/kolbick/Kolb-Bot-Beta-/logging).

## How it works (short)

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / IRC / Microsoft Teams / Matrix / Feishu / LINE / Mattermost / Nextcloud Talk / Nostr / Synology Chat / Tlon / Twitch / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       (control plane)         │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (kolb-bot …)
               ├─ WebChat UI
               ├─ macOS app
               └─ iOS / Android nodes
```

## Key subsystems

- **[Gateway WebSocket network](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/architecture)** — single WS control plane for clients, tools, and events (plus ops: [Gateway runbook](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway)).
- **[Tailscale exposure](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/tailscale)** — Serve/Funnel for the Gateway dashboard + WS (remote access: [Remote](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote)).
- **[Browser control](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/browser)** — kolb-bot‑managed Chrome/Chromium with CDP control.
- **[Canvas + A2UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas)** — agent‑driven visual workspace (A2UI host: [Canvas/A2UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/canvas#canvas-a2ui)).
- **[Voice Wake](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/voicewake) + [Talk Mode](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes/talk)** — wake words on macOS/iOS plus continuous voice on Android.
- **[Nodes](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes)** — Canvas, camera snap/clip, screen record, `location.get`, notifications, plus macOS‑only `system.run`/`system.notify`.

## Tailscale access (Gateway dashboard)

Kolb-Bot can auto-configure Tailscale **Serve** (tailnet-only) or **Funnel** (public) while the Gateway stays bound to loopback. Configure `gateway.tailscale.mode`:

- `off`: no Tailscale automation (default).
- `serve`: tailnet-only HTTPS via `tailscale serve` (uses Tailscale identity headers by default).
- `funnel`: public HTTPS via `tailscale funnel` (requires shared password auth).

Notes:

- `gateway.bind` must stay `loopback` when Serve/Funnel is enabled (Kolb-Bot enforces this).
- Serve can be forced to require a password by setting `gateway.auth.mode: "password"` or `gateway.auth.allowTailscale: false`.
- Funnel refuses to start unless `gateway.auth.mode: "password"` is set.
- Optional: `gateway.tailscale.resetOnExit` to undo Serve/Funnel on shutdown.

Details: [Tailscale guide](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/tailscale) · [Web surfaces](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web)

## Remote Gateway (Linux is great)

It’s perfectly fine to run the Gateway on a small Linux instance. Clients (macOS app, CLI, WebChat) can connect over **Tailscale Serve/Funnel** or **SSH tunnels**, and you can still pair device nodes (macOS/iOS/Android) to execute device‑local actions when needed.

- **Gateway host** runs the exec tool and channel connections by default.
- **Device nodes** run device‑local actions (`system.run`, camera, screen recording, notifications) via `node.invoke`.
  In short: exec runs where the Gateway lives; device actions run where the device lives.

Details: [Remote access](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote) · [Nodes](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes) · [Security](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security)

## macOS permissions via the Gateway protocol

The macOS app can run in **node mode** and advertises its capabilities + permission map over the Gateway WebSocket (`node.list` / `node.describe`). Clients can then execute local actions via `node.invoke`:

- `system.run` runs a local command and returns stdout/stderr/exit code; set `needsScreenRecording: true` to require screen-recording permission (otherwise you’ll get `PERMISSION_MISSING`).
- `system.notify` posts a user notification and fails if notifications are denied.
- `canvas.*`, `camera.*`, `screen.record`, and `location.get` are also routed via `node.invoke` and follow TCC permission status.

Elevated bash (host permissions) is separate from macOS TCC:

- Use `/elevated on|off` to toggle per‑session elevated access when enabled + allowlisted.
- Gateway persists the per‑session toggle via `sessions.patch` (WS method) alongside `thinkingLevel`, `verboseLevel`, `model`, `sendPolicy`, and `groupActivation`.

Details: [Nodes](https://docs.github.com/kolbick/Kolb-Bot-Beta-/nodes) · [macOS app](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/macos) · [Gateway protocol](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/architecture)

## Agent to Agent (sessions\_\* tools)

- Use these to coordinate work across sessions without jumping between chat surfaces.
- `sessions_list` — discover active sessions (agents) and their metadata.
- `sessions_history` — fetch transcript logs for a session.
- `sessions_send` — message another session; optional reply‑back ping‑pong + announce step (`REPLY_SKIP`, `ANNOUNCE_SKIP`).

Details: [Session tools](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/session-tool)

## Skills registry (Kolb-Hub)

Kolb-Hub is a minimal skill registry. With Kolb-Hub enabled, the agent can search for skills automatically and pull in new ones as needed.

[Kolb-Hub](https://kolb-hub.com)

## Chat commands

Send these in WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat (group commands are owner-only):

- `/status` — compact session status (model + tokens, cost when available)
- `/new` or `/reset` — reset the session
- `/compact` — compact session context (summary)
- `/think <level>` — off|minimal|low|medium|high|xhigh (GPT-5.2 + Codex models only)
- `/verbose on|off`
- `/usage off|tokens|full` — per-response usage footer
- `/restart` — restart the gateway (owner-only in groups)
- `/activation mention|always` — group activation toggle (groups only)

## Apps (optional)

The Gateway alone delivers a great experience. All apps are optional and add extra features.

If you plan to build/run companion apps, follow the platform runbooks below.

### macOS (Kolb-Bot.app) (optional)

- Menu bar control for the Gateway and health.
- Voice Wake + push-to-talk overlay.
- WebChat + debug tools.
- Remote gateway control over SSH.

Note: signed builds required for macOS permissions to stick across rebuilds (see `docs/mac/permissions.md`).

### iOS node (optional)

- Pairs as a node over the Gateway WebSocket (device pairing).
- Voice trigger forwarding + Canvas surface.
- Controlled via `kolb-bot nodes …`.

Runbook: [iOS connect](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/ios).

### Android node (optional)

- Pairs as a WS node via device pairing (`kolb-bot devices ...`).
- Exposes Connect/Chat/Voice tabs plus Canvas, Camera, Screen capture, and Android device command families.
- Runbook: [Android connect](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/android).

## Agent workspace + skills

- Workspace root: `~/.kolb-bot/workspace` (configurable via `agents.defaults.workspace`).
- Injected prompt files: `AGENTS.md`, `SOUL.md`, `TOOLS.md`.
- Skills: `~/.kolb-bot/workspace/skills/<skill>/SKILL.md`.

## Configuration

Minimal `~/.kolbick/Kolb-Bot-Beta-.json` (model + defaults):

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-6",
  },
}
```

[Full configuration reference (all keys + examples).](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/configuration)

## Security model (important)

- **Default:** tools run on the host for the **main** session, so the agent has full access when it’s just you.
- **Group/channel safety:** set `agents.defaults.sandbox.mode: "non-main"` to run **non‑main sessions** (groups/channels) inside per‑session Docker sandboxes; bash then runs in Docker for those sessions.
- **Sandbox defaults:** allowlist `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; denylist `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`.

Details: [Security guide](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security) · [Docker + sandboxing](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/docker) · [Sandbox config](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/configuration)

### [WhatsApp](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/whatsapp)

- Link the device: `pnpm kolb-bot channels login` (stores creds in `~/.kolb-bot/credentials`).
- Allowlist who can talk to the assistant via `channels.whatsapp.allowFrom`.
- If `channels.whatsapp.groups` is set, it becomes a group allowlist; include `"*"` to allow all.

### [Telegram](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/telegram)

- Set `TELEGRAM_BOT_TOKEN` or `channels.telegram.botToken` (env wins).
- Optional: set `channels.telegram.groups` (with `channels.telegram.groups."*".requireMention`); when set, it is a group allowlist (include `"*"` to allow all). Also `channels.telegram.allowFrom` or `channels.telegram.webhookUrl` + `channels.telegram.webhookSecret` as needed.

```json5
{
  channels: {
    telegram: {
      botToken: "123456:ABCDEF",
    },
  },
}
```

### [Slack](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/slack)

- Set `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN` (or `channels.slack.botToken` + `channels.slack.appToken`).

### [Discord](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/discord)

- Set `DISCORD_BOT_TOKEN` or `channels.discord.token` (env wins).
- Optional: set `commands.native`, `commands.text`, or `commands.useAccessGroups`, plus `channels.discord.allowFrom`, `channels.discord.guilds`, or `channels.discord.mediaMaxMb` as needed.

```json5
{
  channels: {
    discord: {
      token: "1234abcd",
    },
  },
}
```

### [Signal](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/signal)

- Requires `signal-cli` and a `channels.signal` config section.

### [BlueBubbles (iMessage)](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/bluebubbles)

- **Recommended** iMessage integration.
- Configure `channels.bluebubbles.serverUrl` + `channels.bluebubbles.password` and a webhook (`channels.bluebubbles.webhookPath`).
- The BlueBubbles server runs on macOS; the Gateway can run on macOS or elsewhere.

### [iMessage (legacy)](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/imessage)

- Legacy macOS-only integration via `imsg` (Messages must be signed in).
- If `channels.imessage.groups` is set, it becomes a group allowlist; include `"*"` to allow all.

### [Microsoft Teams](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/msteams)

- Configure a Teams app + Bot Framework, then add a `msteams` config section.
- Allowlist who can talk via `msteams.allowFrom`; group access via `msteams.groupAllowFrom` or `msteams.groupPolicy: "open"`.

### [WebChat](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web/webchat)

- Uses the Gateway WebSocket; no separate WebChat port/config.

Browser control (optional):

```json5
{
  browser: {
    enabled: true,
    color: "#FF4500",
  },
}
```

## Docs

Use these when you’re past the onboarding flow and want the deeper reference.

- [Start with the docs index for navigation and “what’s where.”](https://docs.github.com/kolbick/Kolb-Bot-Beta-)
- [Read the architecture overview for the gateway + protocol model.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/architecture)
- [Use the full configuration reference when you need every key and example.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/configuration)
- [Run the Gateway by the book with the operational runbook.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway)
- [Learn how the Control UI/Web surfaces work and how to expose them safely.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web)
- [Understand remote access over SSH tunnels or tailnets.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote)
- [Follow the onboarding wizard flow for a guided setup.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/wizard)
- [Wire external triggers via the webhook surface.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/automation/webhook)
- [Set up Gmail Pub/Sub triggers.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/automation/gmail-pubsub)
- [Learn the macOS menu bar companion details.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/menu-bar)
- [Platform guides: Windows (WSL2)](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/windows), [Linux](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/linux), [macOS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/macos), [iOS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/ios), [Android](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/android)
- [Debug common failures with the troubleshooting guide.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/troubleshooting)
- [Review security guidance before exposing anything.](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security)

## Advanced docs (discovery + control)

- [Discovery + transports](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/discovery)
- [Bonjour/mDNS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/bonjour)
- [Gateway pairing](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/pairing)
- [Remote gateway README](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote-gateway-readme)
- [Control UI](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web/control-ui)
- [Dashboard](https://docs.github.com/kolbick/Kolb-Bot-Beta-/web/dashboard)

## Operations & troubleshooting

- [Health checks](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/health)
- [Gateway lock](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/gateway-lock)
- [Background process](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/background-process)
- [Browser troubleshooting (Linux)](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/browser-linux-troubleshooting)
- [Logging](https://docs.github.com/kolbick/Kolb-Bot-Beta-/logging)

## Deep dives

- [Agent loop](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/agent-loop)
- [Presence](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/presence)
- [TypeBox schemas](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/typebox)
- [RPC adapters](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/rpc)
- [Queue](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/queue)

## Workspace & skills

- [Skills config](https://docs.github.com/kolbick/Kolb-Bot-Beta-/tools/skills-config)
- [Default AGENTS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/AGENTS.default)
- [Templates: AGENTS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/templates/AGENTS)
- [Templates: BOOTSTRAP](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/templates/BOOTSTRAP)
- [Templates: IDENTITY](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/templates/IDENTITY)
- [Templates: SOUL](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/templates/SOUL)
- [Templates: TOOLS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/templates/TOOLS)
- [Templates: USER](https://docs.github.com/kolbick/Kolb-Bot-Beta-/reference/templates/USER)

## Platform internals

- [macOS dev setup](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/dev-setup)
- [macOS menu bar](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/menu-bar)
- [macOS voice wake](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/mac/voicewake)
- [iOS node](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/ios)
- [Android node](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/android)
- [Windows (WSL2)](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/windows)
- [Linux app](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/linux)

## Email hooks (Gmail)

- [docs.github.com/kolbick/Kolb-Bot-Beta-/gmail-pubsub](https://docs.github.com/kolbick/Kolb-Bot-Beta-/automation/gmail-pubsub)

## Why Kolb-Bot exists

Kolb-Bot was created by **Kolby** ([@kolbick](https://github.com/kolbick)) out of pure frustration.

Advanced AI is incredibly powerful — but most people only know how to use basic chat models. The real tools (agents, multi-channel messaging, automations, voice, canvas) are buried under layers of developer jargon that make normal humans feel stupid. Kolby wanted to build something that explains everything in simple, beginner-friendly language — so anyone can use AI like a pro without needing to be one.

**Half human. Half AI. All pirate.** 🏴‍☠️

- [github.com/kolbick/Kolb-Bot-Beta-](https://github.com/kolbick/Kolb-Bot-Beta-)
- [@kolb-bot](https://x.com/kolb-bot)


## License

MIT — free as in freedom, simple as in Kolb-Bot.

Built by Kolby. A personal project, made with frustration and love.
