---
schema: "agentcompanies/v1"
name: "GStack"
slug: "gstack"
description: "A nine-specialist software engineering company turning authorized product briefs into designed, implemented, independently reviewed, tested and safely released software using pinned gstack workflows."
version: "1.0.0"
license: "MIT"
goals:
  - "Think: frame customer problems, outcomes, constraints and explicit authority."
  - "Plan: reconcile product design and developer experience before locking architecture and acceptance tests."
  - "Build: implement scoped changes with reproducible evidence."
  - "Review: obtain independent engineering and security verdicts."
  - "Test: verify acceptance before authorizing release."
  - "Ship: publish only approved work and verify the actual deployment."
  - "Reflect: retain lessons, decisions and operational knowledge."
---

# GStack

This company package is maintained by hiaw. Its engineering methods reference Garry Tan's [gstack](https://github.com/garrytan/gstack), licensed MIT. Garry Tan authored the upstream methods, not this Paperclip company package. The reviewed runtime revision and upstream byte digests are recorded in `gstack.lock.json` and imported skill instructions; provenance alone does not install or enforce executable content.

## Operating model

The CEO owns the brief and scope. The Product Designer and Developer Experience Lead independently contribute applicable design and DX plans. The CTO reconciles their changes, locks architecture and the acceptance/test plan, and creates explicit project/workspace assignments. Implementation builds against that baseline. Staff Reviewer and Security Officer independently review the exact candidate. QA verifies acceptance before Release Engineer publishes approved work and verifies deployment. CTO owns the retrospective and durable knowledge. Review or QA failures return to Implementation Engineer; affected review and QA checks must run again on the changed candidate. Issue hierarchy alone does not execute this workflow: create assignments and explicit blocking dependencies.

Cross-role work is governed through Paperclip issues, not a Claude subagent session impersonating an employee. Agents use the host-injected Paperclip operating skill when available; their own instructions carry the essential coordination contract. Plans, reviews and evidence belong in issue documents or shared product workspaces. Role handoffs never manufacture another role's verdict or human approval.

## Import and first activation

Use a self-hosted Paperclip instance with company import enabled. Cloud-managed instances may prohibit company import. Import this public root URL without cloning or building the package:

```sh
paperclipai company import https://github.com/hiaw/paperclip-gstack --target new
```

Alternatively, open Company Import, paste `https://github.com/hiaw/paperclip-gstack`, inspect preview and apply with imported automations paused. Imported agents are not an authenticated or already-running workforce; imports disable timer heartbeats and do not supply Claude authentication, Bun, browser binaries, a product workspace or service credentials.

Use a compatible importer: verified Paperclip source commit `08ea18085e2d0751ca5a7da1268f0dede20eb4cb` preserves the supplied skill snapshots. Published `paperclipai@2026.1106.0` serves upstream bytes instead of these bridges and does not satisfy this package's runtime-loading contract. See this repository's README for the exercised source-host setup.

The operator activates the paused CTO and explicitly authorizes the backlog `onboard` task in `gstack-operations`. Follow the imported `gstack-runtime` skill on the execution account's HOME, including a remote runner's HOME. It contains the complete pinned provisioning procedure even when repository scripts are not imported. Confirm provider readiness and target repository/workspace access, then enable only operator-selected agents. Preserve foreign, dirty or mismatched installations and request a dedicated execution account/HOME or authorized maintenance. Do not provision paid/cloud/mobile services or invent a product sprint. After onboarding, send a real product brief to the CEO through Paperclip.

## Consent and execution boundaries

All nine agents use Claude Code with `GSTACK_SESSION_KIND=unattended`. Upstream unattended workflows may record reversible recommendations automatically, but consent, destructive and final gates remain pending for the board. Persist those gates on the issue using real pending interactions/approvals. The CSO workflow does not use the shared unattended startup and must apply these boundaries independently. Do not claim unattended autoplan publication protection is enforced; its checklist reviews are not interactive full-method reviews. Source inspection does not activate native skill hooks, and imported markdown is not proof of hook enforcement.

Cloud, GBrain, mobile, browser-session and external-provider workflows are conditional on their actual prerequisites, operator consent and task scope. Outside review can share code with an external provider; surface that boundary rather than silently disabling review. Release Engineer alone declares optional `GH_TOKEN`; existing authenticated GitHub CLI access may suffice. No deployment, production access or publication follows merely from installing this company.

## Reviewed updates

Operators maintain this repository with `bun run refresh:gstack --ref <reviewed-ref>` and review catalog, lock and bridge changes together; `bun run refresh:gstack --check` reports drift without changing output. An explicit `--ref main` resolves one immutable commit, not a rolling installed runtime. Runtime maintenance requires separate execution-host authority. Reimport/update through this company repository, not Paperclip's generic upstream skill update action, which can replace the bridge or reject upstream executables. Never run an automatic runtime upgrade to resolve a pin mismatch.
