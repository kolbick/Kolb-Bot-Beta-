---
summary: "Community plugins: quality bar, hosting requirements, and PR submission path"
read_when:
  - You want to publish a third-party Kolb-Bot plugin
  - You want to propose a plugin for docs listing
title: "Community plugins"
---

# Community plugins

This page tracks high-quality **community-maintained plugins** for Kolb-Bot.

We accept PRs that add community plugins here when they meet the quality bar.

## Required for listing

- Plugin package is published on npmjs (installable via `kolb-bot plugins install <npm-spec>`).
- Source code is hosted on GitHub (public repository).
- Repository includes setup/use docs and an issue tracker.
- Plugin has a clear maintenance signal (active maintainer, recent updates, or responsive issue handling).

## How to submit

Open a PR that adds your plugin to this page with:

- Plugin name
- npm package name
- GitHub repository URL
- One-line description
- Install command

## Review bar

We prefer plugins that are useful, documented, and safe to operate.
Low-effort wrappers, unclear ownership, or unmaintained packages may be declined.

## Candidate format

Use this format when adding entries:

- **Plugin Name** — short description
  npm: `@scope/package`
  repo: `https://github.com/org/repo`
  install: `kolb-bot plugins install @scope/package`

## Listed plugins

- **WeChat** — Connect Kolb-Bot to WeChat personal accounts via WeChatPadPro (iPad protocol). Supports text, image, and file exchange with keyword-triggered conversations.
  npm: `@icesword760/kolb-bot-wechat`
  repo: `https://github.com/icesword0760/kolb-bot-wechat`
  install: `kolb-bot plugins install @icesword760/kolb-bot-wechat`
