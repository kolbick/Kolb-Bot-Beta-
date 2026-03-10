#!/usr/bin/env bash
# ClawDock - Docker helpers for Kolb-Bot
# Inspired by Simon Willison's "Running Kolb-Bot in Docker"
# https://til.simonwillison.net/llms/kolb-bot-docker
#
# Installation:
#   mkdir -p ~/.kolb-dock && curl -sL https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/scripts/shell-helpers/kolb-dock-helpers.sh -o ~/.kolb-dock/kolb-dock-helpers.sh
#   echo 'source ~/.kolb-dock/kolb-dock-helpers.sh' >> ~/.zshrc
#
# Usage:
#   kolb-dock-help    # Show all available commands

# =============================================================================
# Colors
# =============================================================================
_CLR_RESET='\033[0m'
_CLR_BOLD='\033[1m'
_CLR_DIM='\033[2m'
_CLR_GREEN='\033[0;32m'
_CLR_YELLOW='\033[1;33m'
_CLR_BLUE='\033[0;34m'
_CLR_MAGENTA='\033[0;35m'
_CLR_CYAN='\033[0;36m'
_CLR_RED='\033[0;31m'

# Styled command output (green + bold)
_clr_cmd() {
  echo -e "${_CLR_GREEN}${_CLR_BOLD}$1${_CLR_RESET}"
}

# Inline command for use in sentences
_cmd() {
  echo "${_CLR_GREEN}${_CLR_BOLD}$1${_CLR_RESET}"
}

# =============================================================================
# Config
# =============================================================================
KOLBOCK_CONFIG="${HOME}/.kolb-dock/config"

# Common paths to check for Kolb-Bot
KOLBOCK_COMMON_PATHS=(
  "${HOME}/kolb-bot"
  "${HOME}/workspace/kolb-bot"
  "${HOME}/projects/kolb-bot"
  "${HOME}/dev/kolb-bot"
  "${HOME}/code/kolb-bot"
  "${HOME}/src/kolb-bot"
)

_kolb-dock_filter_warnings() {
  grep -v "^WARN\|^time="
}

_kolb-dock_trim_quotes() {
  local value="$1"
  value="${value#\"}"
  value="${value%\"}"
  printf "%s" "$value"
}

_kolb-dock_read_config_dir() {
  if [[ ! -f "$KOLBOCK_CONFIG" ]]; then
    return 1
  fi
  local raw
  raw=$(sed -n 's/^KOLBOCK_DIR=//p' "$KOLBOCK_CONFIG" | head -n 1)
  if [[ -z "$raw" ]]; then
    return 1
  fi
  _kolb-dock_trim_quotes "$raw"
}

# Ensure KOLBOCK_DIR is set and valid
_kolb-dock_ensure_dir() {
  # Already set and valid?
  if [[ -n "$KOLBOCK_DIR" && -f "${KOLBOCK_DIR}/docker-compose.yml" ]]; then
    return 0
  fi

  # Try loading from config
  local config_dir
  config_dir=$(_kolb-dock_read_config_dir)
  if [[ -n "$config_dir" && -f "${config_dir}/docker-compose.yml" ]]; then
    KOLBOCK_DIR="$config_dir"
    return 0
  fi

  # Auto-detect from common paths
  local found_path=""
  for path in "${KOLBOCK_COMMON_PATHS[@]}"; do
    if [[ -f "${path}/docker-compose.yml" ]]; then
      found_path="$path"
      break
    fi
  done

  if [[ -n "$found_path" ]]; then
    echo ""
    echo "🏴‍☠️ Found Kolb-Bot at: $found_path"
    echo -n "   Use this location? [Y/n] "
    read -r response
    if [[ "$response" =~ ^[Nn] ]]; then
      echo ""
      echo "Set KOLBOCK_DIR manually:"
      echo "  export KOLBOCK_DIR=/path/to/kolb-bot"
      return 1
    fi
    KOLBOCK_DIR="$found_path"
  else
    echo ""
    echo "❌ Kolb-Bot not found in common locations."
    echo ""
    echo "Clone it first:"
    echo ""
    echo "  git clone https://github.com/kolbick/Kolb-Bot-Beta-.git ~/kolb-bot"
    echo "  cd ~/kolb-bot && ./docker-setup.sh"
    echo ""
    echo "Or set KOLBOCK_DIR if it's elsewhere:"
    echo ""
    echo "  export KOLBOCK_DIR=/path/to/kolb-bot"
    echo ""
    return 1
  fi

  # Save to config
  if [[ ! -d "${HOME}/.kolb-dock" ]]; then
    /bin/mkdir -p "${HOME}/.kolb-dock"
  fi
  echo "KOLBOCK_DIR=\"$KOLBOCK_DIR\"" > "$KOLBOCK_CONFIG"
  echo "✅ Saved to $KOLBOCK_CONFIG"
  echo ""
  return 0
}

# Wrapper to run docker compose commands
_kolb-dock_compose() {
  _kolb-dock_ensure_dir || return 1
  local compose_args=(-f "${KOLBOCK_DIR}/docker-compose.yml")
  if [[ -f "${KOLBOCK_DIR}/docker-compose.extra.yml" ]]; then
    compose_args+=(-f "${KOLBOCK_DIR}/docker-compose.extra.yml")
  fi
  command docker compose "${compose_args[@]}" "$@"
}

_kolb-dock_read_env_token() {
  _kolb-dock_ensure_dir || return 1
  if [[ ! -f "${KOLBOCK_DIR}/.env" ]]; then
    return 1
  fi
  local raw
  raw=$(sed -n 's/^KOLB_BOT_GATEWAY_TOKEN=//p' "${KOLBOCK_DIR}/.env" | head -n 1)
  if [[ -z "$raw" ]]; then
    return 1
  fi
  _kolb-dock_trim_quotes "$raw"
}

# Basic Operations
kolb-dock-start() {
  _kolb-dock_compose up -d kolb-bot-gateway
}

kolb-dock-stop() {
  _kolb-dock_compose down
}

kolb-dock-restart() {
  _kolb-dock_compose restart kolb-bot-gateway
}

kolb-dock-logs() {
  _kolb-dock_compose logs -f kolb-bot-gateway
}

kolb-dock-status() {
  _kolb-dock_compose ps
}

# Navigation
kolb-dock-cd() {
  _kolb-dock_ensure_dir || return 1
  cd "${KOLBOCK_DIR}"
}

kolb-dock-config() {
  cd ~/.kolb-bot
}

kolb-dock-workspace() {
  cd ~/.kolb-bot/workspace
}

# Container Access
kolb-dock-shell() {
  _kolb-dock_compose exec kolb-bot-gateway \
    bash -c 'echo "alias kolb-bot=\"./kolb-bot.mjs\"" > /tmp/.bashrc_kolb-bot && bash --rcfile /tmp/.bashrc_kolb-bot'
}

kolb-dock-exec() {
  _kolb-dock_compose exec kolb-bot-gateway "$@"
}

kolb-dock-cli() {
  _kolb-dock_compose run --rm kolb-bot-cli "$@"
}

# Maintenance
kolb-dock-rebuild() {
  _kolb-dock_compose build kolb-bot-gateway
}

kolb-dock-clean() {
  _kolb-dock_compose down -v --remove-orphans
}

# Health check
kolb-dock-health() {
  _kolb-dock_ensure_dir || return 1
  local token
  token=$(_kolb-dock_read_env_token)
  if [[ -z "$token" ]]; then
    echo "❌ Error: Could not find gateway token"
    echo "   Check: ${KOLBOCK_DIR}/.env"
    return 1
  fi
  _kolb-dock_compose exec -e "KOLB_BOT_GATEWAY_TOKEN=$token" kolb-bot-gateway \
    node dist/index.js health
}

# Show gateway token
kolb-dock-token() {
  _kolb-dock_read_env_token
}

# Fix token configuration (run this once after setup)
kolb-dock-fix-token() {
  _kolb-dock_ensure_dir || return 1

  echo "🔧 Configuring gateway token..."
  local token
  token=$(kolb-dock-token)
  if [[ -z "$token" ]]; then
    echo "❌ Error: Could not find gateway token"
    echo "   Check: ${KOLBOCK_DIR}/.env"
    return 1
  fi

  echo "📝 Setting token: ${token:0:20}..."

  _kolb-dock_compose exec -e "TOKEN=$token" kolb-bot-gateway \
    bash -c './kolb-bot.mjs config set gateway.remote.token "$TOKEN" && ./kolb-bot.mjs config set gateway.auth.token "$TOKEN"' 2>&1 | _kolb-dock_filter_warnings

  echo "🔍 Verifying token was saved..."
  local saved_token
  saved_token=$(_kolb-dock_compose exec kolb-bot-gateway \
    bash -c "./kolb-bot.mjs config get gateway.remote.token 2>/dev/null" 2>&1 | _kolb-dock_filter_warnings | tr -d '\r\n' | head -c 64)

  if [[ "$saved_token" == "$token" ]]; then
    echo "✅ Token saved correctly!"
  else
    echo "⚠️  Token mismatch detected"
    echo "   Expected: ${token:0:20}..."
    echo "   Got: ${saved_token:0:20}..."
  fi

  echo "🔄 Restarting gateway..."
  _kolb-dock_compose restart kolb-bot-gateway 2>&1 | _kolb-dock_filter_warnings

  echo "⏳ Waiting for gateway to start..."
  sleep 5

  echo "✅ Configuration complete!"
  echo -e "   Try: $(_cmd kolb-dock-devices)"
}

# Open dashboard in browser
kolb-dock-dashboard() {
  _kolb-dock_ensure_dir || return 1

  echo "🏴‍☠️ Getting dashboard URL..."
  local output exit_status url
  output=$(_kolb-dock_compose run --rm kolb-bot-cli dashboard --no-open 2>&1)
  exit_status=$?
  url=$(printf "%s\n" "$output" | _kolb-dock_filter_warnings | grep -o 'http[s]\?://[^[:space:]]*' | head -n 1)
  if [[ $exit_status -ne 0 ]]; then
    echo "❌ Failed to get dashboard URL"
    echo -e "   Try restarting: $(_cmd kolb-dock-restart)"
    return 1
  fi

  if [[ -n "$url" ]]; then
    echo "✅ Opening: $url"
    open "$url" 2>/dev/null || xdg-open "$url" 2>/dev/null || echo "   Please open manually: $url"
    echo ""
    echo -e "${_CLR_CYAN}💡 If you see 'pairing required' error:${_CLR_RESET}"
    echo -e "   1. Run: $(_cmd kolb-dock-devices)"
    echo "   2. Copy the Request ID from the Pending table"
    echo -e "   3. Run: $(_cmd 'kolb-dock-approve <request-id>')"
  else
    echo "❌ Failed to get dashboard URL"
    echo -e "   Try restarting: $(_cmd kolb-dock-restart)"
  fi
}

# List device pairings
kolb-dock-devices() {
  _kolb-dock_ensure_dir || return 1

  echo "🔍 Checking device pairings..."
  local output exit_status
  output=$(_kolb-dock_compose exec kolb-bot-gateway node dist/index.js devices list 2>&1)
  exit_status=$?
  printf "%s\n" "$output" | _kolb-dock_filter_warnings
  if [ $exit_status -ne 0 ]; then
    echo ""
    echo -e "${_CLR_CYAN}💡 If you see token errors above:${_CLR_RESET}"
    echo -e "   1. Verify token is set: $(_cmd kolb-dock-token)"
    echo "   2. Try manual config inside container:"
    echo -e "      $(_cmd kolb-dock-shell)"
    echo -e "      $(_cmd 'kolb-bot config get gateway.remote.token')"
    return 1
  fi

  echo ""
  echo -e "${_CLR_CYAN}💡 To approve a pairing request:${_CLR_RESET}"
  echo -e "   $(_cmd 'kolb-dock-approve <request-id>')"
}

# Approve device pairing request
kolb-dock-approve() {
  _kolb-dock_ensure_dir || return 1

  if [[ -z "$1" ]]; then
    echo -e "❌ Usage: $(_cmd 'kolb-dock-approve <request-id>')"
    echo ""
    echo -e "${_CLR_CYAN}💡 How to approve a device:${_CLR_RESET}"
    echo -e "   1. Run: $(_cmd kolb-dock-devices)"
    echo "   2. Find the Request ID in the Pending table (long UUID)"
    echo -e "   3. Run: $(_cmd 'kolb-dock-approve <that-request-id>')"
    echo ""
    echo "Example:"
    echo -e "   $(_cmd 'kolb-dock-approve 6f9db1bd-a1cc-4d3f-b643-2c195262464e')"
    return 1
  fi

  echo "✅ Approving device: $1"
  _kolb-dock_compose exec kolb-bot-gateway \
    node dist/index.js devices approve "$1" 2>&1 | _kolb-dock_filter_warnings

  echo ""
  echo "✅ Device approved! Refresh your browser."
}

# Show all available kolb-dock helper commands
kolb-dock-help() {
  echo -e "\n${_CLR_BOLD}${_CLR_CYAN}🏴‍☠️ ClawDock - Docker Helpers for Kolb-Bot${_CLR_RESET}\n"

  echo -e "${_CLR_BOLD}${_CLR_MAGENTA}⚡ Basic Operations${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-start)       ${_CLR_DIM}Start the gateway${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-stop)        ${_CLR_DIM}Stop the gateway${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-restart)     ${_CLR_DIM}Restart the gateway${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-status)      ${_CLR_DIM}Check container status${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-logs)        ${_CLR_DIM}View live logs (follows)${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_MAGENTA}🐚 Container Access${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-shell)       ${_CLR_DIM}Shell into container (kolb-bot alias ready)${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-cli)         ${_CLR_DIM}Run CLI commands (e.g., kolb-dock-cli status)${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-exec) ${_CLR_CYAN}<cmd>${_CLR_RESET}  ${_CLR_DIM}Execute command in gateway container${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_MAGENTA}🌐 Web UI & Devices${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-dashboard)   ${_CLR_DIM}Open web UI in browser ${_CLR_CYAN}(auto-guides you)${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-devices)     ${_CLR_DIM}List device pairings ${_CLR_CYAN}(auto-guides you)${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-approve) ${_CLR_CYAN}<id>${_CLR_RESET} ${_CLR_DIM}Approve device pairing ${_CLR_CYAN}(with examples)${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_MAGENTA}⚙️  Setup & Configuration${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-fix-token)   ${_CLR_DIM}Configure gateway token ${_CLR_CYAN}(run once)${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_MAGENTA}🔧 Maintenance${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-rebuild)     ${_CLR_DIM}Rebuild Docker image${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-clean)       ${_CLR_RED}⚠️  Remove containers & volumes (nuclear)${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_MAGENTA}🛠️  Utilities${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-health)      ${_CLR_DIM}Run health check${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-token)       ${_CLR_DIM}Show gateway auth token${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-cd)          ${_CLR_DIM}Jump to kolb-bot project directory${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-config)      ${_CLR_DIM}Open config directory (~/.kolb-bot)${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-workspace)   ${_CLR_DIM}Open workspace directory${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${_CLR_RESET}"
  echo -e "${_CLR_BOLD}${_CLR_GREEN}🚀 First Time Setup${_CLR_RESET}"
  echo -e "${_CLR_CYAN}  1.${_CLR_RESET} $(_cmd kolb-dock-start)          ${_CLR_DIM}# Start the gateway${_CLR_RESET}"
  echo -e "${_CLR_CYAN}  2.${_CLR_RESET} $(_cmd kolb-dock-fix-token)      ${_CLR_DIM}# Configure token${_CLR_RESET}"
  echo -e "${_CLR_CYAN}  3.${_CLR_RESET} $(_cmd kolb-dock-dashboard)      ${_CLR_DIM}# Open web UI${_CLR_RESET}"
  echo -e "${_CLR_CYAN}  4.${_CLR_RESET} $(_cmd kolb-dock-devices)        ${_CLR_DIM}# If pairing needed${_CLR_RESET}"
  echo -e "${_CLR_CYAN}  5.${_CLR_RESET} $(_cmd kolb-dock-approve) ${_CLR_CYAN}<id>${_CLR_RESET}   ${_CLR_DIM}# Approve pairing${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_GREEN}💬 WhatsApp Setup${_CLR_RESET}"
  echo -e "  $(_cmd kolb-dock-shell)"
  echo -e "    ${_CLR_BLUE}>${_CLR_RESET} $(_cmd 'kolb-bot channels login --channel whatsapp')"
  echo -e "    ${_CLR_BLUE}>${_CLR_RESET} $(_cmd 'kolb-bot status')"
  echo ""

  echo -e "${_CLR_BOLD}${_CLR_CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${_CLR_RESET}"
  echo ""

  echo -e "${_CLR_CYAN}💡 All commands guide you through next steps!${_CLR_RESET}"
  echo -e "${_CLR_BLUE}📚 Docs: ${_CLR_RESET}${_CLR_CYAN}https://docs.github.com/kolbick/Kolb-Bot-Beta-${_CLR_RESET}"
  echo ""
}
