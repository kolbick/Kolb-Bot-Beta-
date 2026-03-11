# Kolb-Bot Branding Assets

This directory contains the official Kolb-Bot branding images.

## Image Files

Replace the placeholder PNGs with your final artwork:

### `kolb-bot-banner.png`
- **What:** Wide hero/banner image (pirate robot with flag on cliff)
- **Used in:** README.md header, docs/index.md, docs/ja-JP/index.md, docs/zh-CN/index.md
- **Recommended size:** 1200x630px (social preview / OG image ratio)

### `kolb-bot-logo-text.png`
- **What:** Logo with "KOLB-BOT" text on light background
- **Used in:** README.md (dark theme source), docs/index.md (dark mode)
- **Recommended size:** 500x200px, transparent background

### `kolb-bot-logo-text-dark.png`
- **What:** Logo with "KOLB-BOT" text for dark backgrounds
- **Used in:** README.md (light theme source), docs/index.md (light mode)
- **Recommended size:** 500x200px, transparent background

### `kolb-bot-icon.png`
- **What:** Square app icon (pirate robot face, rounded corners)
- **Used in:** Mintlify docs logo (docs.json), docs favicon
- **Also replace:** `ui/public/favicon.ico`, `ui/public/favicon-32.png`, `ui/public/apple-touch-icon.png`
- **Also replace:** `assets/chrome-extension/icons/icon{16,32,48,128}.png`
- **Recommended size:** 1024x1024px, then resize for each target

### `kolb-bot-mascot.png`
- **What:** Full character mascot on transparent background
- **Used in:** README.md (below banner), docs/index.md
- **Replaces:** `pixel-lobster.svg` (old lobster mascot)
- **Recommended size:** 800x1000px, transparent background

## Color Palette

The Kolb-Bot pirate theme uses:

| Token        | Hex       | Usage                    |
|-------------|-----------|--------------------------|
| Purple      | `#7B2FBE` | Primary / accent         |
| Light Purple| `#9B59B6` | Accent bright            |
| Dark Purple | `#5B1F8E` | Accent dim               |
| Gold        | `#D4A017` | Info / highlights        |
| Green       | `#2FBF71` | Success                  |
| Orange      | `#FFB020` | Warnings                 |
| Red         | `#E23D2D` | Errors                   |
| Muted       | `#8B7F99` | Secondary text           |

These are defined in `src/terminal/palette.ts` and applied via `src/terminal/theme.ts`.
The Mintlify docs colors are in `docs/docs.json`.

## Where All Branding Lives

| Location | File | Purpose |
|----------|------|---------|
| `docs/assets/` | `kolb-bot-banner.png` | Hero banner |
| `docs/assets/` | `kolb-bot-logo-text.png` | Logo (light) |
| `docs/assets/` | `kolb-bot-logo-text-dark.png` | Logo (dark) |
| `docs/assets/` | `kolb-bot-icon.png` | App icon / favicon |
| `docs/assets/` | `kolb-bot-mascot.png` | Character mascot |
| `assets/` | `avatar-placeholder.svg` | Default agent avatar |
| `assets/` | `dmg-background.png` | macOS DMG installer bg |
| `assets/chrome-extension/icons/` | `icon{16,32,48,128}.png` | Browser extension |
| `ui/public/` | `favicon.{ico,svg}`, `favicon-32.png`, `apple-touch-icon.png` | Web UI |
| `apps/macos/` | `OpenClaw.icns` | macOS app icon |
| `apps/ios/` | `AppIcon.appiconset/` | iOS app icons |
| `apps/android/` | `mipmap-*/` | Android app icons |
| `src/terminal/palette.ts` | — | CLI color palette |
| `docs/docs.json` | — | Mintlify docs theme |
