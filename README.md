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

## Complete beginner guide (start here if you've never used a terminal)

This section walks you through everything from absolute zero. If you've never opened a terminal, never typed a command, never installed anything this way — this is for you. No step is too obvious to include.

### Step 0: Understanding what we're about to do

Here's the big picture of what's going to happen:

1. You'll open a **terminal** (a text window where you type commands)
2. You'll install **Node.js** (a program your computer needs to run Kolb-Bot)
3. You'll install **Kolb-Bot** itself
4. You'll run the **setup wizard** (it asks you questions and sets everything up)
5. You'll connect a **messaging app** (WhatsApp, Telegram, Discord, etc.)
6. You'll start talking to your AI assistant

Each step is explained below with the exact commands to type.

### Step 1: Open a terminal

A **terminal** (also called "command line" or "command prompt") is a text-based app where you type instructions for your computer. Instead of clicking buttons, you type words and press Enter. Every computer has one built in.

**On a Mac:**
1. Press `Cmd + Space` on your keyboard (this opens Spotlight search)
2. Type the word `Terminal`
3. Click "Terminal" when it appears
4. A window with a dark or light background will open — that's your terminal

**On Windows:**
1. Click the Start button (bottom-left corner of your screen) or press the Windows key
2. Type `PowerShell`
3. Click "Windows PowerShell" when it appears
4. A blue window will open — that's your terminal

> **Even better on Windows:** For the smoothest experience, install WSL2 (Windows Subsystem for Linux). It gives you a Linux terminal inside Windows. [Here's Microsoft's guide to install it](https://learn.microsoft.com/en-us/windows/wsl/install) — you just run `wsl --install` in PowerShell and restart your computer.

**On Linux:**
1. Look for "Terminal" in your applications menu, or press `Ctrl + Alt + T`

**What you'll see:** A blinking cursor waiting for you to type something. It might show your username, computer name, or a `$` or `>` symbol. That's normal — it means the terminal is ready.

### Step 2: Learn how to use the terminal (the basics)

Before we install anything, here are the only things you need to know:

**How to run a command:**
1. Type (or paste) the command exactly as shown
2. Press `Enter` on your keyboard
3. Wait for it to finish (you'll see the blinking cursor come back)

**How to copy and paste into the terminal:**
- **Mac terminal:** `Cmd + V` to paste (same as everywhere else)
- **Windows PowerShell:** Right-click to paste
- **Linux terminal:** `Ctrl + Shift + V` to paste (note the extra Shift!)

**How to stop something that's running:** Press `Ctrl + C`. This is your "cancel" button.

**What "output" means:** After you run a command, the terminal will print text below it. That's the "output" — it's the computer telling you what happened. Sometimes it's a lot of text. That's fine. Look for words like "success," "done," or "installed" to know it worked.

**What errors look like:** If something goes wrong, you'll usually see the word "error" or "ERR" in red. Don't panic — the error message usually tells you what went wrong.

### Step 3: Install Node.js

**Node.js** is a program that your computer needs in order to run Kolb-Bot. Think of it like how you need a web browser to visit websites — you need Node.js to run Kolb-Bot. You only install it once.

**Check if you already have it** — type this and press Enter:

```bash
node --version
```

- If you see something like `v22.12.0` — you're good, skip to Step 4
- If you see "command not found" or an error — you need to install it

**To install Node.js:**

1. Go to [nodejs.org](https://nodejs.org/) in your web browser
2. Click the big green button that says "LTS" (this stands for Long Term Support — it's the stable version)
3. A file will download. Open it and follow the installer (click "Next" / "Continue" / "Agree" through each screen — the defaults are fine)
4. **Close your terminal and open a new one** (this is important — the terminal needs to restart to recognize Node.js)
5. Type `node --version` again to confirm it worked

> **What version do I need?** Version 22 or higher. The number after the `v` should start with 22 or higher (like `v22.12.0`). If it says `v18` or `v20`, go back to nodejs.org and install the latest version.

### Step 4: Install Kolb-Bot

Now for the fun part. You have three options — pick whichever one sounds easiest to you. They all do the exact same thing.

**Option A: One-line installer (recommended for beginners)**

Copy this entire line, paste it into your terminal, and press Enter:

```bash
curl -fsSL https://github.com/kolbick/Kolb-Bot-Beta-/install.sh | bash
```

What this does, word by word:
- `curl` — a built-in tool that downloads files from the internet
- `-fsSL` — flags that tell curl to follow redirects and stay quiet about progress
- `https://...` — the web address of the install script
- `|` — this "pipe" symbol sends what was downloaded into the next command
- `bash` — runs the downloaded script

This handles everything automatically — it checks if Node.js is installed, installs Kolb-Bot, and starts the setup wizard.

<details>
<summary>Windows (PowerShell) — click to expand</summary>

If you're using PowerShell (not WSL2), paste this instead:

```powershell
iwr -useb https://github.com/kolbick/Kolb-Bot-Beta-/install.ps1 | iex
```

What this does:
- `iwr` — PowerShell's tool for downloading files from the internet (short for Invoke-WebRequest)
- `-useb` — tells it to treat the download as a simple string
- `https://...` — the web address of the Windows install script
- `|` — sends the downloaded script to the next command
- `iex` — runs the script (short for Invoke-Expression)
</details>

**Option B: npm install (if you already installed Node.js in Step 3)**

```bash
npm install -g kolb-bot@latest
```

What this does, word by word:
- `npm` — Node Package Manager, a tool that comes with Node.js for installing programs
- `install` — tells npm to install something
- `-g` — means "global" — installs it so you can use it from anywhere, not just one folder
- `kolb-bot@latest` — the name of the program to install (`@latest` means get the newest version)

Then start the setup wizard:

```bash
kolb-bot onboard --install-daemon
```

What this does:
- `kolb-bot` — runs the Kolb-Bot program
- `onboard` — starts the setup wizard that walks you through first-time configuration
- `--install-daemon` — also installs the background service (the "daemon") that keeps Kolb-Bot running even when you close the terminal

**Option C: Homebrew (Mac/Linux only — if you already use Homebrew)**

```bash
brew install kolb-bot
kolb-bot onboard --install-daemon
```

> **What's Homebrew?** It's a package manager for Mac/Linux. If you don't know what that is, use Option A or B instead. You don't need Homebrew.

### Step 5: Run the setup wizard

If you used Option A (the one-line installer), the setup wizard starts automatically. If you used Option B or C, run:

```bash
kolb-bot onboard --install-daemon
```

The wizard will ask you questions. Here's what to expect:

**Question 1: "Which AI model do you want to use?"**

This is choosing the "brain" for your assistant. You'll see a list of options. Here's what they mean:

| Option | What it is | Cost | Best for |
|---|---|---|---|
| **Gemini** (Google) | Google's AI | Free tier available, no credit card needed | Trying Kolb-Bot for the first time |
| **OpenRouter** | A service that connects to 100+ different AIs | Pay-per-use, many free models | Flexibility, trying different models |
| **Kimi K2.5** (Moonshot) | A powerful and very cheap AI | ~$0.001 per message | Great quality on a budget |
| **Ollama** | Runs AI directly on your computer | Completely free | Privacy (nothing leaves your machine) — needs 16GB+ RAM |
| **Claude** (Anthropic) | One of the best AIs available | ~$0.01-0.08 per message | Top quality reasoning and writing |
| **GPT-5** (OpenAI) | OpenAI's latest model | ~$0.01-0.05 per message | Great all-around quality |

**Recommendation:** If you just want to try it out, pick **Gemini** (free, no credit card). You can always switch later.

**What's an API key?** When you pick a model, the wizard will ask you to paste an "API key." This is like a password that lets Kolb-Bot talk to the AI service. Here's how to get one:

1. The wizard will show you a link to the provider's website
2. Go to that website and create a free account
3. Find the "API Keys" section (the wizard tells you where)
4. Click "Create new key" or "Generate key"
5. Copy the key (it looks like a long string of random letters and numbers)
6. Paste it into the terminal when the wizard asks

**Question 2: "Which messaging channels do you want to connect?"**

This is where you pick which apps you want to talk to Kolb-Bot through. The wizard walks you through connecting each one. Popular choices:

- **WhatsApp** — scan a QR code with your phone
- **Telegram** — create a bot through Telegram's BotFather (the wizard explains how)
- **Discord** — create a bot in Discord's developer portal (the wizard explains how)

You can connect multiple channels. You can also add more later.

**Question 3: Background service**

The wizard will set up a "background service" (also called a "daemon"). This is a program that runs quietly in the background so Kolb-Bot can respond to your messages even when the terminal is closed. Just say yes when it asks.

### Step 6: Talk to your bot

Once setup is done, you're ready to go! You have two ways to talk to Kolb-Bot:

**Through your messaging app (the main way):**

Just send a message in whichever app you connected — WhatsApp, Telegram, Discord, etc. — like you're texting a friend. Kolb-Bot will reply.

**Through the terminal (for quick tests):**

```bash
kolb-bot agent --message "Hey, what can you do?"
```

What this does:
- `kolb-bot` — runs Kolb-Bot
- `agent` — talks to the AI agent directly
- `--message "..."` — the message you want to send (put your text inside the quotes)

### Step 7: Common commands you'll use

Here's a reference card of every command you might need. You don't need to memorize these — just come back here when you need one.

**Checking on Kolb-Bot:**

```bash
# See if Kolb-Bot is running and everything is connected
kolb-bot status

# See detailed info about every connection (channels, models, etc.)
kolb-bot status --all

# Check for problems and get suggestions to fix them
kolb-bot doctor
```

> **What do the `#` lines mean?** Lines starting with `#` are "comments" — the terminal ignores them. They're just notes for you. Only type the lines that don't start with `#`.

**Starting and stopping:**

```bash
# Start Kolb-Bot's background service
kolb-bot gateway start

# Stop it
kolb-bot gateway stop

# Restart it (useful after changing settings)
kolb-bot gateway restart

# Check if it's running
kolb-bot gateway status
```

> **What's a "gateway"?** The gateway is the core of Kolb-Bot — it's the program that receives your messages, sends them to the AI, and sends the response back. When people say "start Kolb-Bot" they mean "start the gateway."

**Changing settings:**

```bash
# Change which AI model Kolb-Bot uses
kolb-bot config set agent.model "openrouter/google/gemini-2.5-flash"

# See your current settings
kolb-bot config get

# Re-run the setup wizard from the beginning
kolb-bot onboard --install-daemon
```

What the `config set` command does:
- `kolb-bot config` — opens Kolb-Bot's settings
- `set` — means "change a setting"
- `agent.model` — the specific setting to change (in this case, which AI model to use)
- `"openrouter/google/gemini-2.5-flash"` — the new value (in quotes)

**Updating Kolb-Bot:**

```bash
# Download and install the latest version
npm update -g kolb-bot

# After updating, check that everything still works
kolb-bot doctor
```

**Sending a message from the terminal:**

```bash
# Send a message directly (without going through WhatsApp/Telegram/etc.)
kolb-bot agent --message "What's the weather like?"

# Start an interactive conversation in the terminal
kolb-bot agent
```

**Installing skills (add-on abilities):**

```bash
# Install the ClawHub CLI (one time only)
npm install -g clawhub

# Search for skills
clawhub search "weather"

# Install a skill
clawhub install <skill-name>
```

> **What are skills?** Skills are like apps for your assistant — they teach it new tricks. [ClawHub](https://clawhub.com) is where community members share skills they've built.

### Troubleshooting for beginners

**"command not found: kolb-bot"**
- Kolb-Bot didn't install correctly, or your terminal doesn't know where to find it
- Try closing your terminal completely and opening a new one
- Then try running `kolb-bot --version` — if it still doesn't work, re-run the install command from Step 4

**"command not found: node" or "command not found: npm"**
- Node.js isn't installed, or your terminal doesn't know where to find it
- Go back to Step 3 and install Node.js
- Remember to close and reopen your terminal after installing

**"permission denied" or "EACCES"**
- Your computer is blocking the install because it needs higher permissions
- On Mac/Linux, add `sudo` before the command: `sudo npm install -g kolb-bot@latest`
- It will ask for your computer's password (the one you use to log in). When you type it, you won't see any characters — that's normal, just type it and press Enter

**"ECONNREFUSED" or "network error"**
- Your computer can't reach the internet, or a firewall is blocking the connection
- Check your internet connection
- If you're on a work/school network, you might need to connect to a different network

**The bot isn't responding to my messages:**
- Run `kolb-bot status` to check if it's running
- Run `kolb-bot doctor` to diagnose problems
- Make sure the gateway is running: `kolb-bot gateway start`
- Check that your messaging channel is connected: `kolb-bot channels status`

**I want to start over completely:**
- Re-run the setup wizard: `kolb-bot onboard --install-daemon`
- This won't delete anything — it just walks you through setup again

---

## What you need before starting (quick reference)

Just two things:

### 1. Node.js (version 22 or newer)

Node.js is the program that runs Kolb-Bot on your computer. Think of it like how you need a web browser to visit websites — you need Node.js to run Kolb-Bot.

**Don't have it?** Go to [nodejs.org](https://nodejs.org/) and click the big green download button. Install it like any other app. That's it.

> Not sure if you have it? Open your terminal (see above) and type `node --version`. If you see a number like `v22.x.x` or higher, you're good.

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

---

## Quick install (for people who don't need hand-holding)

```bash
# Option A: One-line installer (easiest)
curl -fsSL https://github.com/kolbick/Kolb-Bot-Beta-/install.sh | bash

# Option B: Homebrew
brew install kolb-bot && kolb-bot onboard --install-daemon

# Option C: npm
npm install -g kolb-bot@latest && kolb-bot onboard --install-daemon
```

<details>
<summary>Windows (PowerShell)</summary>

```powershell
iwr -useb https://github.com/kolbick/Kolb-Bot-Beta-/install.ps1 | iex
```
</details>

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
