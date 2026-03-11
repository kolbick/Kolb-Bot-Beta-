---
name: kolb-hub
description: Use the Kolb-Hub CLI to search, install, update, and publish agent skills from kolb-hub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed kolb-hub CLI.
metadata:
  {
    "kolb-bot":
      {
        "requires": { "bins": ["kolb-hub"] },
        "install":
          [
            {
              "id": "node",
              "kind": "node",
              "package": "kolb-hub",
              "bins": ["kolb-hub"],
              "label": "Install Kolb-Hub CLI (npm)",
            },
          ],
      },
  }
---

# Kolb-Hub CLI

Install

```bash
npm i -g kolb-hub
```

Auth (publish)

```bash
kolb-hub login
kolb-hub whoami
```

Search

```bash
kolb-hub search "postgres backups"
```

Install

```bash
kolb-hub install my-skill
kolb-hub install my-skill --version 1.2.3
```

Update (hash-based match + upgrade)

```bash
kolb-hub update my-skill
kolb-hub update my-skill --version 1.2.3
kolb-hub update --all
kolb-hub update my-skill --force
kolb-hub update --all --no-input --force
```

List

```bash
kolb-hub list
```

Publish

```bash
kolb-hub publish ./my-skill --slug my-skill --name "My Skill" --version 1.2.0 --changelog "Fixes + docs"
```

Notes

- Default registry: https://kolb-hub.com (override with KOLB_HUB_REGISTRY or --registry)
- Default workdir: cwd (falls back to Kolb-Bot workspace); install dir: ./skills (override with --workdir / --dir / KOLB_HUB_WORKDIR)
- Update command hashes local files, resolves matching version, and upgrades to latest unless --version is set
