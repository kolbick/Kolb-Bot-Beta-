# ClawDock <!-- omit in toc -->

Stop typing `docker-compose` commands. Just type `kolb-dock-start`.

Inspired by Simon Willison's [Running Kolb-Bot in Docker](https://til.simonwillison.net/llms/kolb-bot-docker).

- [Quickstart](#quickstart)
- [Available Commands](#available-commands)
  - [Basic Operations](#basic-operations)
  - [Container Access](#container-access)
  - [Web UI \& Devices](#web-ui--devices)
  - [Setup \& Configuration](#setup--configuration)
  - [Maintenance](#maintenance)
  - [Utilities](#utilities)
- [Common Workflows](#common-workflows)
  - [Check Status and Logs](#check-status-and-logs)
  - [Set Up WhatsApp Bot](#set-up-whatsapp-bot)
  - [Troubleshooting Device Pairing](#troubleshooting-device-pairing)
  - [Fix Token Mismatch Issues](#fix-token-mismatch-issues)
  - [Permission Denied](#permission-denied)
- [Requirements](#requirements)

## Quickstart

**Install:**

```bash
mkdir -p ~/.kolb-dock && curl -sL https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/scripts/shell-helpers/kolb-dock-helpers.sh -o ~/.kolb-dock/kolb-dock-helpers.sh
```

```bash
echo 'source ~/.kolb-dock/kolb-dock-helpers.sh' >> ~/.zshrc && source ~/.zshrc
```

**See what you get:**

```bash
kolb-dock-help
```

On first command, ClawDock auto-detects your Kolb-Bot directory:

- Checks common paths (`~/kolb-bot`, `~/workspace/kolb-bot`, etc.)
- If found, asks you to confirm
- Saves to `~/.kolb-dock/config`

**First time setup:**

```bash
kolb-dock-start
```

```bash
kolb-dock-fix-token
```

```bash
kolb-dock-dashboard
```

If you see "pairing required":

```bash
kolb-dock-devices
```

And approve the request for the specific device:

```bash
kolb-dock-approve <request-id>
```

## Available Commands

### Basic Operations

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `kolb-dock-start`   | Start the gateway               |
| `kolb-dock-stop`    | Stop the gateway                |
| `kolb-dock-restart` | Restart the gateway             |
| `kolb-dock-status`  | Check container status          |
| `kolb-dock-logs`    | View live logs (follows output) |

### Container Access

| Command                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `kolb-dock-shell`          | Interactive shell inside the gateway container |
| `kolb-dock-cli <command>`  | Run Kolb-Bot CLI commands                      |
| `kolb-dock-exec <command>` | Execute arbitrary commands in the container    |

### Web UI & Devices

| Command                 | Description                                |
| ----------------------- | ------------------------------------------ |
| `kolb-dock-dashboard`    | Open web UI in browser with authentication |
| `kolb-dock-devices`      | List device pairing requests               |
| `kolb-dock-approve <id>` | Approve a device pairing request           |

### Setup & Configuration

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `kolb-dock-fix-token` | Configure gateway authentication token (run once) |

### Maintenance

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `kolb-dock-rebuild` | Rebuild the Docker image                         |
| `kolb-dock-clean`   | Remove all containers and volumes (destructive!) |

### Utilities

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `kolb-dock-health`    | Run gateway health check                  |
| `kolb-dock-token`     | Display the gateway authentication token  |
| `kolb-dock-cd`        | Jump to the Kolb-Bot project directory    |
| `kolb-dock-config`    | Open the Kolb-Bot config directory        |
| `kolb-dock-workspace` | Open the workspace directory              |
| `kolb-dock-help`      | Show all available commands with examples |

## Common Workflows

### Check Status and Logs

**Restart the gateway:**

```bash
kolb-dock-restart
```

**Check container status:**

```bash
kolb-dock-status
```

**View live logs:**

```bash
kolb-dock-logs
```

### Set Up WhatsApp Bot

**Shell into the container:**

```bash
kolb-dock-shell
```

**Inside the container, login to WhatsApp:**

```bash
kolb-bot channels login --channel whatsapp --verbose
```

Scan the QR code with WhatsApp on your phone.

**Verify connection:**

```bash
kolb-bot status
```

### Troubleshooting Device Pairing

**Check for pending pairing requests:**

```bash
kolb-dock-devices
```

**Copy the Request ID from the "Pending" table, then approve:**

```bash
kolb-dock-approve <request-id>
```

Then refresh your browser.

### Fix Token Mismatch Issues

If you see "gateway token mismatch" errors:

```bash
kolb-dock-fix-token
```

This will:

1. Read the token from your `.env` file
2. Configure it in the Kolb-Bot config
3. Restart the gateway
4. Verify the configuration

### Permission Denied

**Ensure Docker is running and you have permission:**

```bash
docker ps
```

## Requirements

- Docker and Docker Compose installed
- Bash or Zsh shell
- Kolb-Bot project (from `docker-setup.sh`)

## Development

**Test with fresh config (mimics first-time install):**

```bash
unset KOLBOCK_DIR && rm -f ~/.kolb-dock/config && source scripts/shell-helpers/kolb-dock-helpers.sh
```

Then run any command to trigger auto-detect:

```bash
kolb-dock-start
```
