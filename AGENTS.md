# Clerk Compendium Maintenance Guide

This file governs maintenance of the **clerk-compendium** skill. User-facing guidance lives in `SKILL.md` and `references/`. Keep the skill portable, current, and independent from any one product repository.

## Purpose

This skill gives coding agents one progressively disclosed entry point for Clerk implementation work. It covers first-party frameworks, SDKs, APIs, authentication, sessions, users, organizations, Billing, webhooks, integrations, security, testing, deployment, and upgrades.

## File Ownership

| Path                                  | Role                                                             | Owner              |
| ------------------------------------- | ---------------------------------------------------------------- | ------------------ |
| `SKILL.md`                            | Task router, operating workflow, and universal rules             | Hand               |
| `references/*.md`                     | Complete Clerk page lists by category, with compact guidance     | `scripts/sync.mjs` |
| `scripts/sync-state.json`             | Sync state for drift detection, not an agent lookup              | `scripts/sync.mjs` |
| `scripts/sync.mjs`                    | Source discovery, classification, drift detection, and rendering | Hand               |
| `evals/*.json`                        | Trigger and workflow evaluation definitions                      | Hand               |
| `.github/workflows/sync-upstream.yml` | Scheduled refresh                                                | Hand               |
| `.gitattributes`                      | Stable LF behavior                                               | Hand               |
| `README.md`                           | Human installation and maintenance overview                      | Hand               |
| `AGENTS.md`                           | This maintenance contract                                        | Hand               |

Never edit a generated reference by hand. Change `scripts/sync.mjs` and regenerate it.

## Source Precedence

Use sources in this order:

1. The target project's installed Clerk package, exact version, exports, types, lockfile, and compiler results.
2. Canonical production documentation discovered through `https://clerk.com/docs/llms.txt`.
3. The matching released first-party SDK source or release tag for version-sensitive implementation details.
4. Commit-pinned heads of official SDK repositories for package inventory and drift detection.
5. The public `clerk/clerk-docs` repository for document organization and prompt inventory only.
6. Community integrations only when the target project actually depends on one, clearly labeled as non-first-party.

A moving default branch can contain unreleased behavior. Never let it outrank the installed package contract.

## Redistribution Boundaries

The public `clerk/clerk-docs` repository has no explicit detected license. Do not copy, lightly rewrite, or flatten its documentation or prompt bodies into this skill. Public visibility is not redistribution permission.

Generated references may contain independently authored guidance plus factual metadata such as titles, canonical URLs, paths, categories, package names, repository names, license identifiers, and content hashes. They must not contain Clerk page descriptions or bodies.

Official SDK repositories are used for factual package and implementation verification. Preserve applicable attribution if future work ever vendors licensed code. This skill's independently authored contents are published under the MIT License.

## Generated Taxonomy

Every Clerk documentation entry belongs to exactly one primary category:

- `quickstarts`
- `concepts-components`
- `auth-sessions`
- `users-organizations`
- `billing`
- `security`
- `integrations-databases`
- `operations`
- `backend-reference`
- `component-reference`
- `hook-reference`
- `object-type-reference`
- `sdk-api`

A page in a `reference` folder is filed by its kind, which the next folder names: the map from folder to category is explicit in `scripts/sync.mjs`, and a reference folder outside that map goes to `sdk-api`. Every other page is filed by topic, by ordered title and path rules. A reader can then tell from a page's URL or from the kind of symbol which reference holds it.

The Markdown references are the index an agent reads. Each one carries compact guidance and lists every page of its category by title and canonical URL, under headings that are folders of the page path. A heading starts at the first two folders. When it holds more than twelve pages, each next folder with at least three pages becomes a heading of its own. In the four kind references every next folder does, so a method sits under its resource. A `legacy` folder at any depth always gets its own heading. Pages directly under the documentation root are under `Top Level`. Within a heading, a folder's overview comes first, then pages by path, with deprecated pages last. `sdk-api` is the exception: its headings are framework roots, with `All Frameworks` for pages under no root, because it holds what each framework SDK documents for itself. It lists a page once under every root that carries it, and it carries the official repository and package tables. A page that several framework roots carry at the same path and title is one entry that gives the path below the root and names every root. The sync reads the rendered references back before writing and fails unless every indexed URL appears exactly once, under its own title, in the reference of its category. It also fails when the index holds a link its parser did not read. If a reference grows too large to scan, split it along a boundary a reader would expect and route each piece from `SKILL.md`. The sync removes a generated reference it no longer produces and refuses to touch a file in `references/` it did not generate.

`scripts/sync-state.json` is the sync's own state. It holds the previous run's packages, repositories, and anchor hashes so the next run can report drift. The previous run's documents are read back from the references themselves, so no second copy of the index exists. Nothing routes an agent to the state file.

Required anchors are the pages the authored guidance depends on. The sync hashes each one to report a change and fails when one disappears. They do not decide what a reference lists.

The Security Rules in `SKILL.md` own the identity, authorization, secret, fail-closed, claims, and webhook-signature rules. Reference guidance carries only what is specific to its topic and never restates them. If a page can support several tasks, give it one primary category rather than duplicating it.

Known top-level documentation roots are explicit in `scripts/sync.mjs`. A new root is a review event and must fail closed until classified. A new page under a known root may be classified automatically by ordered title and path rules, but review the generated diff for category quality.

## Synchronization Contract

Run:

```text
node scripts/sync.mjs
node scripts/sync.mjs --check
```

The synchronizer must:

- Use Node.js built-ins only.
- Be deterministic, non-interactive, and idempotent.
- Accept `GITHUB_TOKEN` only as an optional GitHub rate-limit aid.
- Reject unexpected documentation hosts and malformed URLs.
- Resolve exact upstream commits before commit-pinned repository reads.
- Fail before writing when required sources are missing or a refresh would be partial.
- Report additions, removals, moves, category changes, deprecations, package changes, repository changes, and anchor hash changes.
- Write LF line endings with one final newline.
- Avoid timestamps and moving commit SHAs in generated files.
- Print exact source revisions and expose them through `GITHUB_OUTPUT`.
- Never edit `SKILL.md` or its version.

The standalone workflow records exact revisions in commit history. Generated files carry stable source links and warnings, not revision noise.

## Source Drift

When upstream changes:

- **A page appears**: Confirm its primary category is where a reader would look for it.
- **A page disappears or moves**: Confirm Clerk replaced or retired it and update required anchors if needed.
- **A top-level root appears**: Add an explicit root policy and classification rules before accepting it.
- **A framework or SDK appears**: Add it to the relevant allowlist, package mapping, trigger cases, and workflow cases when warranted.
- **A package disappears**: Verify whether it moved, merged, or was retired before accepting the removal.
- **A license changes**: Stop and reassess what metadata or code may be redistributed.
- **An anchor hash changes**: Review the canonical page for a behavioral change that should update authored guidance.
- **The index format changes**: Update the parser only after confirming the new first-party contract.

## Versioning

Bump `metadata.version` in `SKILL.md` by the release-versioning skill's rules for skills.

## Evaluation

Trigger evaluations must cover direct Clerk prompts, indirect Clerk code signals, and close non-Clerk misses. In repositories that discover project skills through generated `CLAUDE.md`, a trigger is a read of this skill's `SKILL.md`, not a native slash command.

Workflow evaluations compare fresh runs with and without the skill. Assertions should test version detection, first-party source selection, secret boundaries, authentication versus authorization, server enforcement, environment separation, webhook verification, idempotency, and runtime validation. Improve guidance only when failures reveal a general gap.

## Writing Rules

- Keep `SKILL.md` concise and route detailed work into references.
- Give every support file a direct Markdown loading condition from `SKILL.md`.
- Use quoted frontmatter strings.
- Keep guidance generic and portable. Do not mention a consuming product's stages, domains, or vocabulary.
- State positive operational rules and explain important trust boundaries.
- Use capitalized, parallel bullets in hand-authored files.
- Do not use Unicode em dashes or semicolons as sentence joiners in hand-authored prose.
- Keep planning residue and conversational context out of the skill.

## Before Finishing

- Run synchronization and `--check`.
- Run the Skill Forge validator.
- Confirm every indexed URL appears in exactly one reference. The sync enforces it and fails otherwise.
- Confirm every support file is reachable from `SKILL.md`.
- Confirm generated files contain no copied Clerk documentation or prompt bodies.
- Confirm `metadata.version` was bumped as the release-versioning skill requires.
- Confirm repeated synchronization produces no diff.
- Confirm no nested Git metadata exists.
