<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-logo-text.png" alt="Kolb-Bot" width="500">
    </picture>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-banner.png" alt="Kolb-Bot Banner" width="800">
</p>

<h3 align="center">Half human. Half AI. All pirate.</h3>
<p align="center"><em>Your personal AI assistant that actually explains what it's doing.</em></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

---

## What is Kolb-Bot?

Kolb-Bot is a personal AI assistant you can talk to through the apps you already use — WhatsApp, Telegram, Discord, Slack, iMessage, and [20+ more](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels).

Think of it like having ChatGPT, but instead of going to a website, it just shows up in your regular messages. You text it, it texts you back. Simple.

**You don't need to be a developer to use this.** Kolb-Bot was built specifically for people who aren't programmers. Every step is explained in plain language.

## Why does this exist?

Most AI tools are built for developers. They assume you know what an API is, what a terminal is, what "agentic AI" means. If you don't? Too bad.

Kolby ([@kolbick](https://github.com/kolbick)) got tired of this. He wanted AI that anyone could use — the kind that explains itself, walks you through setup, and doesn't make you feel stupid for not knowing what `npm` is.

So he built Kolb-Bot.

---

## What you need before starting

Just two things:

### 1. Node.js (version 22 or newer)

Node.js is the program that runs Kolb-Bot on your computer. Think of it like how you need a web browser to visit websites — you need Node.js to run Kolb-Bot.

**Don't have it?** Go to [nodejs.org](https://nodejs.org/) and click the big green download button. Install it like any other app. That's it.

> Not sure if you have it? Open your terminal (see below) and type `node --version`. If you see a number like `v22.x.x` or higher, you're good.

### 2. An AI model (your bot's brain)

Kolb-Bot needs an AI model to power its responses. You have options — from free to premium:

| Model / Provider | Cost | Best for | How to get it |
|---|---|---|---|
| **Gemini** (Google) | Free tier available | Great starting point, no credit card needed | [aistudio.google.com](https://aistudio.google.com/) |
| **Kimi K2.5** (Moonshot) | Very cheap | Powerful and affordable | Via [OpenRouter](https://openrouter.ai/) |
| **OpenRouter** | Pay-per-use (many free models) | Access to 100+ models through one key | [openrouter.ai](https://openrouter.ai/) |
| **Ollama** (local) | Free (runs on your computer) | Full privacy, no internet needed, but needs a decent computer | [ollama.com](https://ollama.com/) |
| **Claude** (Anthropic) | Paid API | Top-tier reasoning and writing | [console.anthropic.com](https://console.anthropic.com/) |
| **GPT-5** (OpenAI) | Paid API | Industry standard, huge ecosystem | [platform.openai.com](https://platform.openai.com/api-keys) |

**Which should I pick?**

- **Just want to try it out?** Start with **Gemini** (free) or **OpenRouter** (many free models).
- **Want the best quality and don't mind paying?** **Claude** or **GPT-5**.
- **Want full privacy, nothing leaves your computer?** **Ollama** (free, runs locally — works best with 16GB+ RAM).
- **Want top quality on a budget?** **Kimi K2.5** via OpenRouter — excellent quality at a fraction of the price.

The setup wizard will walk you through connecting whichever model you choose. You can always switch later.

> **What's an API key?** It's like a password that lets Kolb-Bot talk to the AI service. Each provider gives you one when you sign up. The setup wizard will tell you exactly where to paste it.

### What's a terminal?

A terminal is a text-based app where you type commands. Every computer has one built in:

- **Mac**: Open "Terminal" (search for it in Spotlight, or find it in Applications > Utilities)
- **Windows**: Open "PowerShell" (search for it in the Start menu) — or better yet, [install WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) for a smoother experience
- **Linux**: You probably already know this one. Look for "Terminal" in your apps

---

## Install Kolb-Bot

Open your terminal and pick one of these options. They all do the same thing.

### Option A: One-line installer (easiest)

Copy and paste this into your terminal and press Enter:

```bash
curl -fsSL https://github.com/kolbick/Kolb-Bot-Beta-/install.sh | bash
```

This handles everything — installs Node.js if you need it, installs Kolb-Bot, and starts the setup wizard.

<details>
<summary>Windows (PowerShell)</summary>

```powershell
iwr -useb https://github.com/kolbick/Kolb-Bot-Beta-/install.ps1 | iex
```
</details>

### Option B: Homebrew (if you use it)

```bash
brew install kolb-bot
kolb-bot onboard --install-daemon
```

### Option C: npm (if you already have Node.js)

```bash
npm install -g kolb-bot@latest
kolb-bot onboard --install-daemon
```

---

## First-time setup

After installing, the setup wizard starts automatically. It will:

1. **Ask which AI model you want to use** — pick from the list or paste your API key
2. **Set up your messaging channels** — connect WhatsApp, Telegram, Discord, or whichever apps you use
3. **Start the background service** — this keeps Kolb-Bot running so it can respond to your messages

Every step explains what's happening and why. If something goes wrong, it tells you how to fix it.

If the wizard didn't start automatically, run:

```bash
kolb-bot onboard --install-daemon
```

## Try it out

Once setup is done, send a message to Kolb-Bot through whichever channel you connected (WhatsApp, Telegram, etc.) — just like texting a friend.

Or test it directly in your terminal:

```bash
kolb-bot agent --message "Hey, what can you do?"
```

---

## What can Kolb-Bot do?

Here's what makes it more than just another chatbot:

- **Works in your existing apps** — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Google Chat, Microsoft Teams, and [20+ more](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels). No new app to download.
- **Runs on your computer** — Your data stays with you. Nothing goes through a middleman.
- **Works with tons of AI models** — Use free models, cheap models, local models, or premium ones. Your choice. Switch anytime.
- **Voice mode** — Talk to it out loud on Mac, iPhone, or Android. It talks back.
- **Browser control** — It can browse the web for you, fill out forms, grab information.
- **Scheduled tasks** — Set reminders, recurring messages, automated workflows.
- **Skills** — Add new abilities from [ClawHub](https://clawhub.com), a library of community-made skills. Or create your own.
- **Multi-device** — Connect your Mac, iPhone, Android, or any combination. They all stay in sync.

## Skills (add-on abilities)

Skills are like apps for your assistant — they teach it new tricks. Browse and install them from [ClawHub](https://clawhub.com):

```bash
# Install the ClawHub CLI
npm i -g clawhub

# Browse and install skills
clawhub install <skill-name>
```

The Kolb-Bot agent can also search ClawHub automatically and suggest skills when it thinks one would help.

---

## Choosing your AI model

You can change your model anytime. Here's a real-world comparison to help you decide:

### Free / Budget options

| Model | Speed | Quality | Cost | Notes |
|---|---|---|---|---|
| Gemini 2.5 Flash | Fast | Good | Free tier | Google's free option. Great for trying things out |
| Kimi K2.5 | Fast | Very good | ~$0.001/message | Excellent bang for buck via OpenRouter |
| Llama 3.3 (via Ollama) | Medium | Good | Free (local) | Runs on your machine. Needs 16GB+ RAM |
| Mistral | Fast | Good | Free tier available | Good all-rounder via OpenRouter |

### Premium options

| Model | Speed | Quality | Cost | Notes |
|---|---|---|---|---|
| Claude Opus/Sonnet | Medium | Excellent | ~$0.01-0.08/message | Best at writing, reasoning, and following instructions |
| GPT-5 | Fast | Excellent | ~$0.01-0.05/message | Great all-around, huge ecosystem |
| Gemini 2.5 Pro | Medium | Excellent | ~$0.01/message | Strong at analysis and long documents |

### Local models (100% private, free)

If you don't want any data leaving your computer, install [Ollama](https://ollama.com/) and run models locally:

```bash
# Install Ollama, then:
ollama pull llama3.3
```

Then tell Kolb-Bot to use it. Local models are slower and less capable than cloud models, but your data never leaves your machine.

> **Bottom line:** Start with Gemini (free) or OpenRouter (tons of cheap options). Upgrade to Claude or GPT-5 if you want the best quality. Use Ollama if privacy is your priority.

To change your model:

```bash
kolb-bot config set agent.model "openrouter/google/gemini-2.5-flash"
```

Full model setup guide: [Models documentation](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/models)

---

## Updating

```bash
npm update -g kolb-bot
kolb-bot doctor
```

The `doctor` command checks that everything is working correctly after an update.

Full guide: [Updating](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/updating)

## Getting help

- [Full documentation](https://docs.github.com/kolbick/Kolb-Bot-Beta-)
- [Getting started guide](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/getting-started)
- [FAQ](https://docs.github.com/kolbick/Kolb-Bot-Beta-/help/faq)
- [Troubleshooting](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/troubleshooting)
- [Discord community](https://github.com/kolbick/Kolb-Bot-Beta-)

## Chat commands

Once Kolb-Bot is connected to your messaging app, you can send these commands in any chat:

| Command | What it does |
|---|---|
| `/status` | Shows what model you're using and how much you've used |
| `/new` or `/reset` | Starts a fresh conversation (clears memory) |
| `/think high` | Makes the AI think harder (slower but smarter responses) |
| `/think off` | Turns off extended thinking (faster responses) |
| `/verbose on` | Shows more detail about what the AI is doing |
| `/usage full` | Shows cost per message (if using a paid model) |

---

## For developers

<details>
<summary>Click to expand developer documentation</summary>

### Building from source

```bash
git clone https://github.com/kolbick/Kolb-Bot-Beta-.git
cd kolb-bot
pnpm install
pnpm ui:build
pnpm build
pnpm kolb-bot onboard --install-daemon

# Dev loop (auto-reload on changes)
pnpm gateway:watch
```

### Architecture overview

```
Your phone / laptop / desktop
(WhatsApp, Telegram, Discord, etc.)
           │
           ▼
┌─────────────────────────┐
│     Kolb-Bot Gateway    │
│   (runs on your machine)│
└────────────┬────────────┘
             │
             ├── AI Model (Claude, GPT, Gemini, Ollama, etc.)
             ├── Skills (from ClawHub or custom)
             ├── Browser control
             ├── Scheduled tasks
             └── Connected devices (Mac, iPhone, Android)
```

### Security

- DMs from unknown senders require pairing approval by default
- Tools run locally on the host for the main session
- Group/channel sessions can be sandboxed in Docker
- Full guide: [Security](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security)

### Release channels

- **stable**: Tagged releases, npm `latest` tag
- **beta**: Prerelease tags (`-beta.N`), npm `beta` tag
- **dev**: Latest code on `main`

Switch: `kolb-bot update --channel stable|beta|dev`

### Full developer docs

- [Architecture](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/architecture)
- [Configuration reference](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/configuration)
- [Gateway runbook](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway)
- [Remote access](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote)
- [Docker](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/docker)
- [Platform guides](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/macos): macOS, [iOS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/ios), [Android](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/android), [Windows](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/windows), [Linux](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/linux)

</details>

---

## License

MIT — free as in freedom, simple as in Kolb-Bot.

Built by Kolby. A personal project, made with frustration and love.
