---
summary: "CLI reference for `kolb-bot reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `kolb-bot reset`

Reset local config/state (keeps the CLI installed).

```bash
kolb-bot backup create
kolb-bot reset
kolb-bot reset --dry-run
kolb-bot reset --scope config+creds+sessions --yes --non-interactive
```

Run `kolb-bot backup create` first if you want a restorable snapshot before removing local state.
