---
summary: "CLI reference for `kolb-bot tui` (terminal UI connected to the Gateway)"
read_when:
  - You want a terminal UI for the Gateway (remote-friendly)
  - You want to pass url/token/session from scripts
title: "tui"
---

# `kolb-bot tui`

Open the terminal UI connected to the Gateway.

Related:

- TUI guide: [TUI](/web/tui)

Notes:

- `tui` resolves configured gateway auth SecretRefs for token/password auth when possible (`env`/`file`/`exec` providers).
- When launched from inside a configured agent workspace directory, TUI auto-selects that agent for the session key default (unless `--session` is explicitly `agent:<id>:...`).

## Examples

```bash
kolb-bot tui
kolb-bot tui --url ws://127.0.0.1:18789 --token <token>
kolb-bot tui --session main --deliver
# when run inside an agent workspace, infers that agent automatically
kolb-bot tui --session bugfix
```
