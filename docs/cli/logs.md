---
summary: "CLI reference for `kolb-bot logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `kolb-bot logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
kolb-bot logs
kolb-bot logs --follow
kolb-bot logs --json
kolb-bot logs --limit 500
kolb-bot logs --local-time
kolb-bot logs --follow --local-time
```

Use `--local-time` to render timestamps in your local timezone.
