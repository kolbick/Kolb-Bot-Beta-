---
summary: "Get Kolb-Bot installed and run your first chat in minutes."
read_when:
  - First time setup from zero
  - You want the fastest path to a working chat
title: "Getting Started"
---

# Getting Started

You're about to set up your own personal AI assistant. This takes about 5 minutes, and we'll explain every step along the way.

<Info>
**Want to skip straight to chatting?** Run `kolb-bot dashboard` and chat in your browser — no extra setup needed. You can connect WhatsApp, Telegram, and other apps later.
Docs: [Dashboard](/web/dashboard) and [Control UI](/web/control-ui).
</Info>

## What you need first

Before you do anything else, make sure you have these two things:

1. **Node.js 22 or newer** — this is the engine that runs Kolb-Bot. Think of it like how your browser runs websites. [Download Node.js here](https://nodejs.org/) if you don't have it.
2. **An AI API key** — this is what powers the AI brain behind your assistant. You can get one from [OpenAI](https://platform.openai.com/api-keys), [Anthropic](https://console.anthropic.com/), or [other providers](/concepts/models). Don't worry — the setup wizard will walk you through this if you don't have one yet.

<Tip>
**Not sure if you have Node?** Open your terminal (on Mac: search for "Terminal" in Spotlight; on Windows: search for "PowerShell") and type `node --version`. If you see a number like `v22.x.x`, you're good. If you get an error, [download Node.js first](https://nodejs.org/).
</Tip>

## Quick setup (step by step)

<Steps>
  <Step title="Step 1: Install Kolb-Bot">
    This downloads Kolb-Bot to your computer. Copy and paste one of these commands into your terminal:

    <Tabs>
      <Tab title="macOS/Linux">
        ```bash
        curl -fsSL https://github.com/kolbick/Kolb-Bot-Beta-/install.sh | bash
        ```
        <img
  src="/assets/install-script.svg"
  alt="Install Script Process"
  className="rounded-lg"
/>
      </Tab>
      <Tab title="Windows (PowerShell)">
        ```powershell
        iwr -useb https://github.com/kolbick/Kolb-Bot-Beta-/install.ps1 | iex
        ```
      </Tab>
    </Tabs>

    <Note>
    Other install methods: [Install](/install). You can also use `npm install -g kolb-bot@latest` if you prefer npm.
    </Note>

  </Step>
  <Step title="Step 2: Run the setup wizard">
    This walks you through connecting your AI provider (like OpenAI or Anthropic) and setting up your assistant. It explains each step as you go.

    ```bash
    kolb-bot onboard --install-daemon
    ```

    The wizard will ask you questions and explain what each choice means. See [Onboarding Wizard](/start/wizard) for the full guide.

  </Step>
  <Step title="Step 3: Check that it's running">
    This tells you if your assistant is online and ready:

    ```bash
    kolb-bot gateway status
    ```

  </Step>
  <Step title="Step 4: Start chatting">
    This opens Kolb-Bot in your browser so you can start talking to your assistant:

    ```bash
    kolb-bot dashboard
    ```
  </Step>
</Steps>

<Check>
If the dashboard loads in your browser, congratulations — your personal AI assistant is live!
</Check>

## Optional checks and extras

<AccordionGroup>
  <Accordion title="Run the Gateway in the foreground">
    Useful for quick tests or troubleshooting.

    ```bash
    kolb-bot gateway --port 18789
    ```

  </Accordion>
  <Accordion title="Send a test message">
    Requires a configured channel.

    ```bash
    kolb-bot message send --target +15555550123 --message "Hello from Kolb-Bot"
    ```

  </Accordion>
</AccordionGroup>

## Useful environment variables

If you run Kolb-Bot as a service account or want custom config/state locations:

- `KOLB_BOT_HOME` sets the home directory used for internal path resolution.
- `KOLB_BOT_STATE_DIR` overrides the state directory.
- `KOLB_BOT_CONFIG_PATH` overrides the config file path.

Full environment variable reference: [Environment vars](/help/environment).

## Go deeper

<Columns>
  <Card title="Onboarding Wizard (details)" href="/start/wizard">
    Full CLI wizard reference and advanced options.
  </Card>
  <Card title="macOS app onboarding" href="/start/onboarding">
    First run flow for the macOS app.
  </Card>
</Columns>

## What you now have

- A running AI assistant (the "Gateway" — this is the brain that processes your messages)
- Your AI provider connected (this is the AI model that generates responses)
- A dashboard where you can chat — and optionally, your messaging apps connected too

## What's next?

- **Connect your messaging apps** so you can text your AI from WhatsApp, Telegram, etc.: [Channels](/channels)
- **Set up who can message your bot** (security basics): [Pairing](/channels/pairing)
- **Dive deeper** into advanced features: [Setup](/start/setup)
