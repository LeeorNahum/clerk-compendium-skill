---
name: "clerk-compendium"
description: "Use when building, integrating, securing, testing, migrating, or troubleshooting Clerk authentication and user management across supported web, backend, and mobile frameworks: adding or reviewing Clerk SDK code, configuring sign-in or sign-up, sessions, users, organizations, roles and permissions, webhooks, Billing, machine authentication, environment or deployment settings, database integrations, or Clerk testing and upgrades. Also use when a repository contains @clerk/* or an official Clerk SDK and the user asks about route protection, tenant access, subscription gating, user sync, or auth failures without naming Clerk."
metadata:
  author: "Leeor Nahum"
  version: "1.0.1"
---

# Clerk Compendium

Use Clerk through the target project's real framework and installed SDK contract. Inspect before prescribing setup, load only the reference that owns the current task, and verify access at the server boundary rather than treating successful UI rendering as completion.

## Start With the Repository

Before changing code:

1. Identify the framework, router mode, rendering model, runtime, package manager, and deployment target.
2. Find every installed Clerk package or official language SDK and record its exact version.
3. Inspect existing providers, middleware, proxies, server helpers, environment contracts, webhook handlers, tests, and provider configuration notes.
4. Preserve a working integration unless the user requested migration or replacement.
5. Choose the focused reference below. Search the complete source index only when the focused reference does not expose the exact page, symbol, object, or resource.

The installed package, its exports and types, and the target compiler are the immediate code contract. Current documentation describes Clerk's current recommendation, but it can target a newer release. Confirm version-sensitive imports and helpers against the installed package or matching released source before using them.

## Reference Loading

- Read [quickstarts](references/quickstarts.md) when adding Clerk or repairing framework provider, middleware, request-context, or root integration wiring.
- Read [concepts and components](references/concepts-components.md) when choosing Clerk architecture, prebuilt components, custom flows, appearance, localization, or account-management surfaces.
- Read [authentication and sessions](references/auth-sessions.md) for sign-in, sign-up, sessions, tokens, claims, MFA, passkeys, social connections, reverification, or machine authentication.
- Read [users and organizations](references/users-organizations.md) for users, metadata, organizations, memberships, invitations, active organization context, domains, roles, or permissions.
- Read [Billing](references/billing.md) for Clerk plans, features, subscriptions, trials, entitlements, Billing components, Billing webhooks, or server-side feature gates.
- Read [security](references/security.md) when protecting routes or resources, reviewing trust boundaries, rotating keys, preventing abuse, or validating security posture.
- Read [integrations and databases](references/integrations-databases.md) for webhooks, database synchronization, external backends, OAuth integrations, or third-party services.
- Read [operations](references/operations.md) for environment variables, instances, domains, redirects, deployment, testing, troubleshooting, Dashboard configuration, or SDK upgrades.
- Read [SDK and API reference](references/sdk-api.md) for exact packages, imports, helpers, methods, types, or API resources.
- Search [the complete source index](references/source-index.json) when an exact current Clerk document is not present in the focused reference. Search it by title, URL fragment, framework, category, tag, or kind rather than loading the entire file.

## Implementation Workflow

1. **Classify the boundary.** Identify what runs in the browser, application server, edge runtime, mobile client, background worker, or external webhook sender.
2. **Establish identity.** Use the framework-native Clerk integration to derive verified session or machine identity in the runtime that executes the protected operation.
3. **Authorize the operation.** Check the required user, organization membership, role, permission, resource ownership, or Billing entitlement where Security Rules require it.
4. **Keep secrets server-side.** Place every key and secret as Security Rules require.
5. **Use one owner per fact.** Decide whether Clerk or the application owns each user, organization, membership, profile, entitlement, or synchronized field.
6. **Handle asynchronous truth.** Verify webhook signatures as Security Rules require. Make consumers idempotent and safe for retries, duplicates, delays, and out-of-order events.
7. **Respect environment separation.** Keep development and production Clerk instances, keys, domains, redirects, and webhook endpoints distinct while preserving consistent environment key names.
8. **Validate reality.** Exercise public, signed-out, signed-in, unauthorized, and authorized paths that apply. Verify the protected server request, not only component visibility or type checking.

## Security Rules

- Authentication proves identity. Authorization decides whether that identity may perform the operation.
- A rendered signed-in state, hidden button, route matcher, or active organization selection is not sufficient authorization.
- Derive trusted user, session, organization, and permission state from verified Clerk authentication. Do not trust client-provided user or organization identifiers as proof.
- Apply authorization where the data is read or changed, even when middleware also blocks broad route classes.
- Fail closed when required verified state is absent. Give callers a clear unauthenticated, forbidden, unavailable, or provider failure as appropriate.
- Publishable keys may enter supported clients. Secret keys, webhook secrets, privileged API calls, and credential rotation stay in server-only stores and runtimes.
- Verify webhook signatures against the raw request body before parsing fields into trusted state. Never log secrets or raw credentials in failures.
- Keep claims intentionally small and use them only when their refresh and staleness contract fits the decision.
- Treat community-maintained integrations as non-first-party. Prefer Clerk-owned packages and repositories when they support the target stack.

## Source Discipline

Clerk's canonical documentation index is [the official `llms.txt`](https://clerk.com/docs/llms.txt). When behavior depends on current provider configuration or a specific SDK release, open the linked canonical page and verify the installed version before editing.

Do not answer version-sensitive Clerk API questions from model memory alone.
