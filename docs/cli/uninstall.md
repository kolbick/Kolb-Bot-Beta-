---
summary: "CLI reference for `kolb-bot uninstall` (remove gateway service + local data)"
read_when:
  - You want to remove the gateway service and/or local state
  - You want a dry-run first
title: "uninstall"
---

# `kolb-bot uninstall`

Uninstall the gateway service + local data (CLI remains).

```bash
kolb-bot backup create
kolb-bot uninstall
kolb-bot uninstall --all --yes
kolb-bot uninstall --dry-run
```

Run `kolb-bot backup create` first if you want a restorable snapshot before removing state or workspaces.
