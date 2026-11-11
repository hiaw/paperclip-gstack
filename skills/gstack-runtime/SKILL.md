---
name: "gstack-runtime"
description: "Verify the reviewed gstack execution runtime, native Claude skill identity and task prerequisites before dispatch; provision only with explicit operator authority."
---

# Reviewed gstack execution runtime

This company requires Garry Tan's complete [garrytan/gstack](https://github.com/garrytan/gstack) checkout at **`f0cd9f8c4b453c1eadd714e4149174ee01179eae`**, repository version **`1.99.0.0`**. Its canonical location is **`$HOME/.claude/skills/gstack` in the execution account**. A remote runner's HOME is not the board operator's HOME. Imported markdown and provenance do not install executables, authenticate providers, activate native hooks or enforce upstream digests. Do not use upstream degraded mode when this prerequisite fails.

These instructions are self-contained: company-import transports may omit repository scripts and lockfiles. The calling `gstack-*` bridge supplies its canonical source path, expected upstream SHA-256 and hook-presence declaration from its own metadata/body. Never derive the expected digest from the installed file itself. Router means root `SKILL.md` and native command `gstack`; browse means `browse/SKILL.md` and native command `browse`.

## 1. Read-only readiness, every execution account and requested capability

Do not run setup, change configuration, download browsers, upgrade packages, fetch Git refs or repair registrations while checking readiness. Stop at the first untrusted identity before executing helpers from that installation. Capture actual output and exit status in the Paperclip issue; redact credentials, not failure causes.

### Toolchain and identity

Use the execution shell, not a guessed workstation path:

```sh
command -v git
git --version
command -v bun
bun --version
command -v claude
claude --version
claude auth status
printf 'execution HOME: %s\n' "$HOME"
printf 'Claude config override: %s\n' "${CLAUDE_CONFIG_DIR:-<unset>}"
printf 'session kind: %s\n' "${GSTACK_SESSION_KIND:-<unset>}"
```

Require working Git, Bun **>=1.4.2**, and authenticated Claude Code available to this same account/runner. Inspect Claude's real authentication status; a binary or model selection alone is not authentication. Do not copy private credentials, auto-install system packages or treat a missing provider as a pass. Provider authentication and any paid smoke call require the operator's existing authorization. The company adapter supplies `GSTACK_SESSION_KIND=unattended`; if absent or different, block workflow dispatch until the runner configuration is corrected by its owner.

Inspect the canonical path before any helper invocation, including dangling symlinks. The following commands are inspections, not a repair procedure:

```sh
R="$HOME/.claude/skills/gstack"
export R
bun --no-env-file --config=/dev/null -e 'const fs=require("node:fs"); const p=process.env.R; const s=fs.lstatSync(p); console.log({path:p,symlink:s.isSymbolicLink(),link:s.isSymbolicLink()?fs.readlinkSync(p):null,physical:fs.realpathSync(p)});'
git -C "$R" rev-parse --show-toplevel
git -C "$R" remote get-url origin
git -C "$R" rev-parse HEAD
git -C "$R" diff --quiet HEAD --
git -C "$R" status --short --untracked-files=no
bun --no-env-file --config=/dev/null -e 'console.log(require("node:fs").readFileSync(process.env.R+"/VERSION","utf8").trim())'
```

Require the repository top-level to resolve to the physical canonical directory, origin `https://github.com/garrytan/gstack.git` (equivalent `git@github.com:garrytan/gstack.git` or `ssh://git@github.com/garrytan/gstack.git` accepted), literal HEAD `f0cd9f8c4b453c1eadd714e4149174ee01179eae`, literal VERSION `1.99.0.0`, and exit 0 from `git diff --quiet HEAD --` (staged and unstaged tracked changes are unacceptable). Inspect any symlink destination; a dedicated, operator-approved same-pin source may be reused, but a foreign/shared destination must never be repointed. Origin alone does not establish identity. Missing `.git`, unreadable metadata, a parent repository mistaken for this checkout, mismatched pin/version, or tracked dirt is a blocker.

### Canonical source digest and dependencies

Set these values from the calling bridge, not from a network response or the local source. This example uses review's path; replace the digest with that bridge's full 64-character `metadata.upstreamFile.sha256`:

```sh
export GSTACK_SOURCE_PATH='review/SKILL.md'
# Set GSTACK_EXPECTED_SHA256 to the calling bridge's upstreamFile.sha256.
: "${GSTACK_EXPECTED_SHA256:?Copy the exact digest from the calling bridge}"
bun --no-env-file --config=/dev/null -e '
const fs=require("node:fs"), p=require("node:path");
const root=fs.realpathSync(process.env.R), rel=process.env.GSTACK_SOURCE_PATH;
if (!rel || p.isAbsolute(rel) || rel.split(/[\\/]/).includes("..")) throw Error("Invalid canonical source path");
const file=fs.realpathSync(p.join(root,rel));
if (!file.startsWith(root+p.sep)) throw Error("Source escapes canonical runtime");
const expected=process.env.GSTACK_EXPECTED_SHA256;
if (!/^[a-f0-9]{64}$/.test(expected||"")) throw Error("Missing bridge SHA-256");
const actual=new Bun.CryptoHasher("sha256").update(fs.readFileSync(file)).digest("hex");
console.log({file,expected,actual});
if (actual!==expected) throw Error("Upstream source digest mismatch");'
git -C "$R" ls-files --error-unmatch -- "$GSTACK_SOURCE_PATH"
```

Read the **complete** canonical skill, including every page. This is inspection only: do not also execute its method during inspection. Resolve relative paths from that canonical file's directory, not the Paperclip bridge directory. Inspect the actual preamble, STOP/read pointers, shared sections, scripts, hook commands, templates, references and binaries the method requires. Confirm referenced files are readable, executable when required, tracked by the pinned source when appropriate, and that symlinks do not redirect helpers outside the verified runtime. Confirm build outputs exist using the readiness report below. A digest match for one markdown file is not a dependency check; never summarize away missing sections or use another installation's helper.

### Configuration and update policy

Only after identity and tracked cleanliness pass, inspect the upstream configuration using its own resolver (including state-root overrides and restrictive privacy settings):

```sh
"$R/bin/gstack-paths" --get GSTACK_STATE_ROOT
for key in auto_upgrade team_mode update_check update_channel telemetry artifacts_sync_mode skill_prefix disabled_skills claude_loadout claude_overlay_model plan_mode_preamble codex_reviews; do
  printf '%s effective: ' "$key"
  "$R/bin/gstack-config" get "$key" || exit
  printf '%s stored: ' "$key"
  "$R/bin/gstack-config" get --stored "$key" || exit
done
"$R/setup" --status
"$R/bin/gstack-doctor"
```

Require effective `auto_upgrade=false`, `team_mode=false`, `update_check=false`, `telemetry=off`, `artifacts_sync_mode=off`, and short-name `skill_prefix=false`; the loadout must be full (`full` or its unset full default). Record `update_channel` but never use a main/stable channel or available-update notice as authority to move the literal pin. Inspect effective Claude settings, project-local settings, and any plugin/session configuration for active updater hooks or foreign registrations that could override this policy. Check relevant `GSTACK_*`, `CLAUDE_CONFIG_DIR` and state-root environment overrides without dumping secrets. A contradictory rolling updater or unreadable/unknown configuration blocks; do not silently rewrite it. Upstream doctor fix suggestions to upgrade/reinstall are diagnostics, not authority.

Consult `bin/gstack-config get disabled_skills` for every requested capability, normalizing its comma/whitespace-separated names and optional `gstack-` prefix. If the canonical command is disabled, **stop** even when its source still exists. Do not invoke a hidden retained method, turn the skill back on, or use Read-and-follow to evade the operator's choice.

`./setup --status` is read-only and checks install/section-link status. Plain `bin/gstack-doctor` reports readiness without a paid call; preserve warnings and `not configured` rows as such, rather than treating exit 0 as all tooling ready. Do **not** use `--live` without paid-probe authority. Do not use a browser ensure/install helper or a component check that launches/downloads a browser as a readiness shortcut. Browser execution is a separate authorized smoke/task action. Required missing tooling blocks its workflow; optional CSO/container, outside-provider, GBrain, cloud, mobile and browser-session capabilities remain unavailable until their actual prerequisites and authority exist.

### Native Claude registration and collision checks

Short upstream names and prefixed Paperclip names are separate. For review, inspect native `$HOME/.claude/skills/review/SKILL.md`; for router inspect `$HOME/.claude/skills/gstack/SKILL.md`. With a Claude configuration override, inspect the **effective** skills root as well and establish which registration this running Claude session actually resolves. Do not assume a filesystem entry wins over project/plugin skills. Example read-only identity comparison for a normal short-name install:

```sh
export GSTACK_NATIVE_NAME='review'
bun --no-env-file --config=/dev/null -e '
const fs=require("node:fs"), p=require("node:path");
const root=fs.realpathSync(process.env.R), name=process.env.GSTACK_NATIVE_NAME;
if (!/^[a-z0-9][a-z0-9-]*$/.test(name||"")) throw Error("Invalid native name");
const source=fs.realpathSync(p.join(root,process.env.GSTACK_SOURCE_PATH));
const entry=p.join(process.env.HOME,".claude","skills",name,"SKILL.md");
const resolved=fs.realpathSync(entry), bytes=fs.readFileSync(entry);
console.log({entry,resolved,source,identical:bytes.equals(fs.readFileSync(source))});
if (!bytes.equals(fs.readFileSync(source))) throw Error("Native method differs from pinned canonical source");
if (resolved!==source) {
  const marker=p.join(p.dirname(entry),".gstack-owned");
  if (!fs.existsSync(marker) || fs.readFileSync(marker,"utf8").trim()!==root)
    throw Error("Native registration has no matching gstack ownership proof");
}'
```

Also inspect the complete native frontmatter: its `name` must be the canonical native name, not the Paperclip prefix; its hooks must be the upstream hooks, with readable/executable matching helpers. Inspect native adjacent sections/assets too: setup links these as well as SKILL.md. Pinned source identity plus `./setup --status` install provenance must agree. An alternate render/overlay is not accepted merely because it says gstack; if its bytes differ from the canonical digest, stop for reviewed maintenance instead of dispatching a different method.

Inspect the running Claude session's available **Skill** registrations and their resolved provenance, including project-local and plugin entries. Require the selected short name to resolve unambiguously to the verified upstream entry. A matching filename or successful Read is not proof of availability through the native Skill tool. Never invoke a foreign/conflicting registration, and never invoke `gstack-review` to reach native `review` (that recurses into this bridge).

When native activation is verified, invoke the native Skill exactly once with the original arguments/target; only that invocation executes the workflow and activates skill-local hooks. Do not duplicate execution by following the inspected instructions first. If native activation is unavailable, hook-bearing methods must stop with **`Native gstack skill activation unavailable: <command>`**. Hook-free methods may Read-and-follow the entire canonical method only when pin/digest/dependencies/disabled/collision checks all passed and no foreign registration is being bypassed; explicitly report `dispatch: canonical Read-and-follow; native activation unavailable; no skill-local hooks`. This narrow fallback does not make a missing native installation generally ready. Missing dependencies, disabled commands and collisions never permit fallback.

`--no-team` removes the global updater and routing/contract registration; it does not activate native skill-local hooks. `/careful`, `/freeze` and `/guard` are not enforced merely by reading their files. Even after native activation, freeze only guards its documented Edit/Write/NotebookEdit paths, not arbitrary shell writes; do not call it a security sandbox. Do not claim hook refusal was exercised without an actual controlled refusal result.

## 2. Operator-authorized onboarding only

A missing runtime blocks product work. Provisioning is allowed only on an explicitly authorized onboarding issue that names this execution account/HOME and permits cloning, dependency installation, builds and browser download. Check Git, Bun >=1.4.2 and Claude prerequisites first; report missing system packages for the operator to install. Inspect existing short-name registrations for foreign collisions **before** setup. Setup can change account-level Claude settings; absent canonical runtime does not grant permission to overwrite existing skills.

If canonical path is entirely absent (not a dangling link), and account/registration checks and authority pass:

```sh
R="$HOME/.claude/skills/gstack"
# Stop if this guard fails; never remove or rename the existing destination.
if [ -e "$R" ] || [ -L "$R" ]; then
  printf '%s\n' 'Existing runtime requires read-only identity checks and explicit maintenance authority.' >&2
  exit 1
fi
mkdir -p "$HOME/.claude/skills" &&
git clone https://github.com/garrytan/gstack.git "$R" &&
git -C "$R" checkout --detach 'f0cd9f8c4b453c1eadd714e4149174ee01179eae'
```

Before continuing, perform the identity/version/cleanliness checks above against literal `f0cd9f8c4b453c1eadd714e4149174ee01179eae` / `1.99.0.0`; require success. Then run **from that directory**, preserving noninteractive input and checking each exit code:

```sh
cd "$HOME/.claude/skills/gstack" &&
./setup --host claude --no-team --no-prefix --loadout full \
  --no-harness-auto --no-plan-tune-hooks --no-timeline-stop-hook </dev/null &&
bin/gstack-config set auto_upgrade false &&
bin/gstack-config set team_mode false &&
bin/gstack-config set update_check false &&
bin/gstack-config set telemetry off &&
bin/gstack-config set artifacts_sync_mode off
```

There is **no general setup `--yes` flag**. Do not add `--global`, unsafe permission switches, system-package installers, paid credentials, or unrelated service setup. Do not disable outside review just because Codex is unauthenticated: report its real CLI/auth/sandbox/provider prerequisite. Outside review can send review prompts and repository content to another model/provider; obtain applicable code-sharing/consent authority before a send, respect existing `codex_reviews` privacy settings, and never manufacture outside-review coverage.

If an exact matching installation is already complete and configured compatibly, reuse it without setup or config writes. Matching but incomplete requires repair authority before rerunning setup. Failed setup remains incomplete and blocks product work; an authorized retry may rerun setup at the same verified clean pin. A mismatched, foreign, dirty or incompatible installation must remain untouched: request an operator-provided dedicated execution account/HOME or explicit maintenance with a concrete reviewed resolution. Never rename/delete another installation, `git pull`, reset, silently repoint links, or automatically overwrite foreign registrations. A setup skip/collision is a blocker, not successful onboarding.

After authorized setup, repeat read-only readiness, source/native identity and requested-dependency checks. Record `./setup --status` and doctor outputs. Restart/reload Claude only through its supported operator-authorized mechanism if required for discovery; verify the actual session's native Skill availability afterward. Authorized browser/Claude/hook smoke checks must use disposable fixtures and permitted directories, not production sessions or accounts, and must be reported separately from checks not exercised.

## 3. Paperclip execution and durable handoff

Use the host-injected Paperclip operating skill when available: check out the assigned issue, respect assignment and parent/child linkage, and write durable progress/evidence/next action during this heartbeat. Respect budget, pause, cancel and company boundaries. Do not use a Claude subagent as a separately governed employee; create/assign Paperclip issues for cross-role work. A runtime blocker must name the failing check, exact output, responsible owner and required action; do not silently self-repair.

Run workflows unattended. Reversible recommended choices may be recorded automatically, but consent, destructive/irreversible and final approval gates remain **pending** for the board. Attach the actual pending gates and evidence to the issue and request a board decision; never invent approval or mark another role's review approved. `/cso` skips the shared unattended startup, so the security officer must independently enforce the same boundaries. The company does not authorize publication merely because upstream allows a narrow existing-PR metadata update: apply the issue's board-approved publication scope before any remote write.

The unattended autoplan publication guard is **not enforced**; preserve `GUARD_NOT_INSTALLED` in its review record. Checklist-level unattended reviews are not interactive full-method review evidence. Read the canonical method and `docs/unattended.md` for its actual artifacts: only workflows that emit `GSTACK_RESULT` should be expected to produce that line/run directory. Record actual review logs, QA reports, plan/gate files or ship receipts as applicable, bound to the workspace and branch/commit reviewed; never wait for a nonexistent result line or treat an unavailable outside provider as a clean review.

Return issue, workspace/repository, branch/commit, acceptance criteria, durable artifact locations, commands/results, findings, pending approvals, blocker owner and next assignee. Native activation proves dispatch, not outcome. Runtime setup/import does not create a product repository or product brief, and hierarchy alone does not orchestrate work.

## 4. Reviewed updates only

Paperclip's generic upstream **skill update** action may replace a bridge with upstream markdown or reject executable content; metadata is provenance, not executable hydration or automatic digest enforcement. Do not use that action for these bridges. Update/reimport through **https://github.com/hiaw/paperclip-gstack**, whose operator-reviewed catalog pins source and generates this prerequisite. `/gstack-upgrade` is operator-only and is not an agent capability. A company refresh never updates an installed execution runtime; maintenance of that runtime needs separate explicit authority.
