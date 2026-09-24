# Clerk Compendium

A portable Agent Skill for current Clerk implementation work across first-party frameworks, SDKs, APIs, authentication, organizations, Billing, webhooks, security, testing, deployment, and upgrades. The main skill routes agents into focused generated references backed by Clerk's official documentation index and SDK repositories.

## Layout

| Path                                  | Purpose                                                |
| ------------------------------------- | ------------------------------------------------------ |
| `SKILL.md`                            | Agent-facing workflow and reference router             |
| `references/`                         | Generated focused catalogs and complete source index   |
| `scripts/sync.mjs`                    | Deterministic first-party source synchronization       |
| `AGENTS.md`                           | Maintenance and source contract                        |
| `evals/`                              | Trigger and workflow evaluation cases                  |
| `.github/workflows/sync-upstream.yml` | Scheduled first-party source refresh                     |

## Sources and Redistribution

The synchronizer discovers canonical pages through `https://clerk.com/docs/llms.txt` and inventories official Clerk SDK repositories. What the skill may store from those sources is set in [AGENTS.md](AGENTS.md#redistribution-boundaries).

## Refresh

From the skill directory:

```text
node scripts/sync.mjs
node scripts/sync.mjs --check
```

Node.js 18 or newer is required. `GITHUB_TOKEN` is optional and raises GitHub API limits.

Validate from the consuming repository root:

```text
node .agents/skills/skill-forge/scripts/validate.mjs .agents/skills/clerk-compendium
```

## Install

```text
git submodule add https://github.com/LeeorNahum/clerk-compendium-skill.git .agents/skills/clerk-compendium
```

Clerk Compendium is available under the MIT License.
