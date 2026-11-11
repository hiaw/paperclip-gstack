---
kind: "task"
slug: "onboard"
name: "Onboard the approved GStack execution host"
description: "Check execution prerequisites and provision the pinned runtime only with explicit operator authority; leave product work unstarted."
assignee: "cto"
project: "gstack-operations"
---

# Onboard the approved execution host

**Initial state: backlog**, controlled by `.paperclip.yaml`. The operator must activate the paused CTO, explicitly authorize this task, identify the execution account/HOME and intended runner, approve permitted clone/build/browser-download actions, and name which agents may be enabled. Move this task into actionable work when ready. Import or activation is not installation/maintenance authority.

## First heartbeat and authority boundary

Use the host-injected Paperclip operating skill when available. Check out this assigned issue unless the current wake explicitly says the harness already did; respect assignment/conflict, parent/child linkage, budget, pause/cancel and company boundaries. Read the issue and its approvals. Start useful read-only checks in this heartbeat; do not end with a plan alone. Before any mutation, confirm explicit authority for that action. Missing authority is a board decision, not a reason to self-approve.

Load the imported **gstack-runtime** skill and follow its complete embedded commands; repository scripts may not survive import. It contains the literal reviewed SHA/version, SHA-256 verification, disabled-skill and native-registration/collision checks, non-mutating readiness steps and exact authorized setup procedure. Do not invoke an upstream bridge in degraded mode or mistake a source Read for native hook activation.

## Work

1. Establish the actual execution account/HOME and Claude configuration/state-root overrides. Check Git, Bun >=1.4.2, Claude availability and real authentication in that account. Name missing system/provider prerequisites; do not install system packages, copy credentials or make paid probe calls without authority.
2. Inspect `$HOME/.claude/skills/gstack` and its symlink destination, Git root/origin, literal pin/version, tracked cleanliness, required source digests, helper/shared-section dependencies, native short-name ownership and session availability. Inspect effective disabled skills and pinned update/privacy configuration using the upstream resolver. Do not bypass a disabled skill or conflicting registration.
3. If complete and exact, reuse without setup/config rewrites. If absent and authorized, follow runtime's clone, detached checkout, identity verification, setup and explicit configuration commands. If matching but incomplete, obtain repair authority first. If foreign/dirty/mismatched/incompatible, preserve it and request a dedicated execution account/HOME or explicitly authorized maintenance. Failed setup remains a blocker; never pull/reset/rename/delete/repoint another installation or add `--global`.
4. Capture actual `./setup --status` and non-paid `bin/gstack-doctor` output, source/native identity evidence, and required tooling failures. Record outside-provider authentication, CSO/container, GBrain, cloud/mobile and browser-session prerequisites separately as available/unavailable/not requested. Missing Codex authentication is not permission to disable outside review; explain code-sharing/provider consent before any send. Do not configure paid services or real-account cookies as part of onboarding.
5. When explicitly authorized, exercise only disposable browser/provider/native-hook smoke fixtures. A browser launch/download or a paid/provider run is not a read-only check. Record exact actions/results and screenshots/artifacts when exercised; never claim enforcement from merely reading `/freeze`, `/careful` or `/guard`. If Claude authentication is unavailable, state that heartbeat/native activation remains unverified rather than fabricate success.
6. Confirm operator-provided workspace/target repository access and intended branch without hard-coding a machine path. If no product workspace/brief exists, record that prerequisite and next owner; do not create a guessed product or sprint. This operations task can establish host readiness while leaving product scope intentionally unstarted.
7. Enable only operator-selected agents through authorized Paperclip controls, or return the precise board action if activation is not within CTO permissions. Do not enable timer heartbeats, add recurring tasks/schedules or activate the rest of the team implicitly.

## Required durable report and done conditions

Persist evidence in this issue's durable documents/comments or approved shared workspace, with links. Include:

- Execution account/runner and runtime physical identity (no secrets), actual reviewed pin/version and source/native digest comparisons.
- Commands, exit statuses, readiness outputs, native dispatch path, concrete artifacts, exercised checks and explicitly unexercised checks.
- Provider/code-sharing readiness and optional prerequisite statuses; no invented approvals or outside-review coverage.
- Operator authority granted, agents selected/actually enabled, outstanding permissions and board decisions.
- Workspace/repository and branch/commit if supplied, acceptance scope, blockers with responsible owner and exact required action, and next assignee.

Mark complete only when the authorized onboarding scope is satisfied and its real evidence is durable. If blocked, preserve completed evidence and use Paperclip's actual blocker/pending-interaction mechanism; human approval waits remain pending for the board. Do not falsely mark product readiness, a native hook test, or a provider heartbeat complete.

All workflow runs use `GSTACK_SESSION_KIND=unattended`: reversible recommendations may be recorded automatically; consent, destructive/irreversible actions and final gates remain pending. The unattended autoplan publication guard is not enforced, and checklist reviews are not interactive full-method reviews. `/cso` skips shared startup and must independently follow these boundaries. No publication/deployment/upgrade is authorized by this onboarding task.

**Next owner:** the operator resolves host/authentication/authority blockers and sends the first concrete product brief to the CEO in Paperclip. The CEO frames scope; the CTO then creates real project/workspace assignments. Cross-role work uses assigned Paperclip issues, not Claude subagents impersonating employees.
