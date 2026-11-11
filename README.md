# Paperclip GStack

A markdown-first [Paperclip](https://github.com/paperclipai/paperclip) company package for a nine-specialist software engineering team using Claude Code and [Garry Tan's gstack](https://github.com/garrytan/gstack).

**Import the repository root:** https://github.com/hiaw/paperclip-gstack

No company-package clone, build, generated JSON manifest or nested import URL is needed. Import provisions company configuration, instructions and substantive skill bridges. It does **not** install the upstream runtime, authenticate Claude, download browsers, provide a product workspace or start an already-running workforce.

## Import into self-hosted Paperclip

Use an instance with company import enabled; cloud-managed instances prohibit company import. From an authenticated/configured Paperclip CLI:

```sh
paperclipai company import https://github.com/hiaw/paperclip-gstack --target new \
  --include company,agents,projects,issues,skills
```

Preview first when desired:

```sh
paperclipai company import https://github.com/hiaw/paperclip-gstack --target new \
  --include company,agents,projects,issues,skills --dry-run --json
```

The explicit include list imports the operations project, onboarding issue and skill bodies/bindings as well as the company and agents. In the app, choose **Company Import → paste the root URL → preview → apply**. Leave imported automations/agents paused; timer heartbeats are disabled on import. Inspect roles/reporting, Claude adapters, skill bindings, the operations project and backlog onboarding issue before activating anything.

Verified importer: Paperclip commit [`08ea18085e2d0751ca5a7da1268f0dede20eb4cb`](https://github.com/paperclipai/paperclip/tree/08ea18085e2d0751ca5a7da1268f0dede20eb4cb), portability schema version 7. **Do not use `paperclipai@2026.1106.0` for this package:** its entity import succeeds, but its skill-file API serves upstream content instead of the imported bridge. The exact source revision snapshots the supplied bridge bytes.

For the exercised source-based host (Node >=24.11.0), install and launch from the Paperclip checkout, **not this company directory**; the source server also discovers bundled skills relative to its working directory:

```sh
git clone https://github.com/paperclipai/paperclip.git paperclip
cd paperclip
git checkout --detach 08ea18085e2d0751ca5a7da1268f0dede20eb4cb
npx --yes pnpm@9.15.4 install --frozen-lockfile
PAPERCLIP_SOURCE="$PWD"
node "$PAPERCLIP_SOURCE/cli/node_modules/tsx/dist/cli.mjs" \
  "$PAPERCLIP_SOURCE/cli/src/index.ts" onboard
```

In another shell, use that checkout's absolute path for `PAPERCLIP_SOURCE` and replace `paperclipai` in the import commands above with:

```sh
node "$PAPERCLIP_SOURCE/cli/node_modules/tsx/dist/cli.mjs" \
  "$PAPERCLIP_SOURCE/cli/src/index.ts"
```

The source revision is the exercised compatibility baseline, not an asserted minimum published release. Do not omit governed fields or convert to an obsolete manifest to accommodate an older instance. With `runner: auto`, the exercised host selects Paperclip Runner's Claude/acpx backend; review its effective model and permission settings before activation. Those host-selected defaults are not package permission flags or proof of native-hook enforcement.

## Team and workflow

| Specialist | Reports to | Responsibility |
| --- | --- | --- |
| Founder / CEO | Board | Product brief, scope and product decisions |
| Engineering Manager / CTO | CEO | Technical plan, test strategy, coordination and reflection |
| Product Designer | CEO | Design planning and applicable design review |
| Developer Experience Lead | CTO | Independent developer-experience planning/review |
| Implementation Engineer | CTO | Approved implementation and repairs |
| Staff Reviewer | CTO | Independent code/test review and outside-review evidence |
| QA Lead | CTO | Acceptance verification before release |
| Chief Security Officer | CEO | Independent security review |
| Release Engineer | CTO | Authorized shipping/deployment and deployment verification |

**Think → Plan → Build → Review → Test → Ship → Reflect.** Designer/DX planning contributions precede the CTO's locked technical/test plan. Staff/security review is independent; QA verifies acceptance before release. Failed review/QA returns to implementation and affected checks run again. QA defaults to report-only `qa-only`; repair-mode `qa` needs explicit assignment authority. CTO owns retrospective/knowledge.

The hierarchy is not a scheduler. Cross-role work is assigned through Paperclip issues with durable artifacts, verification, branch/commit and next owner, not a Claude subagent impersonating another employee. Use the host-injected Paperclip operating skill when available; this package deliberately does not register an unresolved `paperclip` dependency.

## First activation: execution-host onboarding

1. Keep the imported team paused. Choose the actual execution account/HOME and runner; a remote runner is not the board operator's account. Provide Git, **Bun >=1.4.2**, and authenticated Claude Code for that account.
2. Activate only the CTO, authorize **Onboard the approved GStack execution host** in **GStack Operations**, and move it from backlog to actionable work. Explicitly approve permitted clone/build/browser downloads and identify which agents may later be enabled. Activation alone is not maintenance or paid-service consent.
3. The CTO follows the imported `gstack-runtime` skill's self-contained read-only identity, literal pin/version, source SHA-256, dependency, disabled-skill, configuration and native-registration checks. Essential installation commands are embedded there because scripts in this repository may not survive import.
4. Only an authorized onboarding task may clone an absent complete runtime to `$HOME/.claude/skills/gstack`, check out the reviewed SHA detached, and run setup/configuration. A matching complete runtime is reused without writes. Incomplete matching installs require repair authority. Foreign, dirty, mismatched or incompatible installs remain untouched: provide a dedicated execution account/HOME or authorize reviewed maintenance. Never use `--global`, pull/reset, or delete/repoint another installation automatically.
5. Collect actual status/doctor and permitted disposable smoke evidence. Name missing provider credentials, tooling, browser/native-hook availability and workspace access precisely. Enable only operator-selected agents through authorized controls. No schedules, paid/cloud/mobile/GBrain services, real-account browser sessions or product sprint are implicitly started.

Read the full imported skill, not just these summary steps. Its authorized setup uses `--host claude --no-team --no-prefix --loadout full --no-harness-auto --no-plan-tune-hooks --no-timeline-stop-hook` with stdin closed; there is no general setup `--yes` flag. It explicitly disables auto-upgrade/team mode/update checks/telemetry/artifact sync. Do not disable outside review to conceal missing Codex authentication: report the actual prerequisites and repository-content/provider-sharing implications.

After host onboarding, send a concrete product brief to the **CEO in Paperclip**. The CTO creates the actual project/workspace assignments; this package hard-codes no local product path.

## Real upstream methods, not metadata-only descriptors

The **initial reviewed gstack pin** is version **1.99.0.0**, commit [`f0cd9f8c4b453c1eadd714e4149174ee01179eae`](https://github.com/garrytan/gstack/tree/f0cd9f8c4b453c1eadd714e4149174ee01179eae). The current authoritative pin/catalog is `gstack.lock.json`; the generated runtime prerequisite carries that same literal pin.

Paperclip skills use `gstack-*` names. Each bridge verifies runtime identity and its actual upstream rendered-file digest, inspects the complete canonical method, then invokes the verified **short native Claude Skill name exactly once** with original arguments. Router is native `gstack`/root `SKILL.md`; browser automation is native `browse`/`browse/SKILL.md`. Relative helpers and shared sections resolve in the installed complete upstream checkout.

Reading a source file does not activate native hooks. Hook-bearing workflows block when native activation is unavailable; only hook-free methods may use the documented complete Read-and-follow fallback after pin/digest/dependency/disabled/collision checks pass, reporting that dispatch path. Never bypass disabled skills or foreign native collisions. `--no-team` does not activate skill-local hooks; `/freeze` is not a shell-write security sandbox. Do not claim enforcement without exercising it.

All adapters set `GSTACK_SESSION_KIND=unattended`: reversible recommendations may be recorded, while consent/destructive/final gates stay pending for the board. `/cso` skips the shared startup and must independently obey the same boundaries. The unattended autoplan publication guard is **not enforced**; checklist reviews are not interactive full-method review evidence. Not every method emits `GSTACK_RESULT`; preserve each method's actual artifact contract. Publishing/deployment still requires explicit issue/board authority, including any upstream existing-PR metadata write.

Cloud/mobile/GBrain/browser-session tools retain their actual prerequisites and opt-in requirements. Only release-engineer declares optional secret `GH_TOKEN`; existing authorized GitHub CLI authentication may suffice. No credentials are included in this package.

## Reviewed catalog refresh and host maintenance

Maintainers, from a checkout of **this company repository**, use:

```sh
bun install --frozen-lockfile
bun run refresh:gstack --check
bun run refresh:gstack --ref <reviewed-ref>
```

`--check` uses the committed SHA and reports stale generated outputs without writes. An explicit `--ref main` resolves main once to an immutable SHA and stages reviewable catalog/lock/bridge/runtime changes; it is not rolling runtime installation. Review new/removed capability ownership, host/retirement policy, source hashes and generated changes before committing/publishing and reimporting. Unknown skills, removed assigned skills and invalid/missing sources or policy stop refresh before generated-file mutation. Tests for maintainers are `bun test tests/refresh-catalog.test.ts`; these commands are not part of company import.

Do not use Paperclip's generic upstream **skill update** action for these bridges: it can replace a substantive bridge with upstream bytes or reject executable content. Provenance alone neither hydrates executable content nor enforces a digest. Update/reimport through this company repository instead. Updating the catalog does not update any execution host; separately authorize maintenance of that host against the newly reviewed pin. Agent-accessible `/gstack-upgrade` is deliberately excluded.

`plan-eng-review` remains internal autoplan methodology; retired `investigate` is not recreated. Claude-host-excluded `claude-code`, Capy-only `captain`/`runaway-stopper`, and operator-only `gstack-upgrade` are catalog dispositions, not active employee capabilities. See the lock for exact capability owners and upstream digests.

## Attribution and license

This company package is maintained by **hiaw and paperclip-gstack contributors**, not authored by Garry Tan. The genuine gstack workflows and runtime are by **Garry Tan** and contributors, [garrytan/gstack](https://github.com/garrytan/gstack), copyright © 2026 Garry Tan, under the [upstream MIT license](https://github.com/garrytan/gstack/blob/f0cd9f8c4b453c1eadd714e4149174ee01179eae/LICENSE). Preserve upstream notices when redistributing its content. This package is also [MIT licensed](LICENSE); upstream attribution is retained in generated bridges and the license notice.

## Verification record

Exercised with Node 24.14.1, Bun 1.4.3 and the exact Paperclip source revision above:

- Frozen dependency installation, catalog `--check`, and both deterministic catalog failure regressions passed. Same-pin refresh was byte-identical; unclassified additions and assigned removals name the capability without changing generated output.
- Disposable local import and public **root URL without a ref** preview/apply succeeded without errors or warnings. A separate preview pinned company commit `1e28fad69d6801f23e88ec9b6cb38df272a5624d`; local/default-branch/pinned entity manifests matched. API reads verified every packaged role/reporting ID, instruction body and skill binding, all 60 supplied skill bodies, linked CTO backlog onboarding, paused agents and disabled timers. The corrected runtime prerequisite was subsequently reimported from the public root and verified byte-for-byte.
- The real Import UI accepted only the root URL, showed all package files and nine Claude agents, and applied with its paused default. Preview and resulting nine-agent org-chart screenshots were captured.
- In a separate disposable execution HOME, the embedded setup completed at gstack `1.99.0.0` / `f0cd9f8c4b453c1eadd714e4149174ee01179eae`; tracked files remained clean and `./setup --status` exited 0. The installed `browse` and `freeze` source digests and native filesystem registration identities matched the pin. The embedded configuration checks passed, including the upstream unset `disabled_skills` exit-code case.
- `gstack-doctor` exited 0: 11 ok, 2 warnings, 1 not configured, **0 failures**. Warnings were the macOS disposable HOME's `/var` versus `/private/var` install-registry alias and unauthenticated Codex. Artifact sync was intentionally off. The CSO native helper was available; qualified CSO container images were unavailable because the pinned Docker socket was absent.
- The installed bundled gstack browser opened a disposable loopback fixture, rendered `Count: 0`, clicked Increment exactly once, rendered `Count: 1`, captured a screenshot and stopped. Aside was absent; no real accounts or browser sessions were used.

**External prerequisite, not a pass:** `claude auth status` reported `loggedIn: false` in the isolated execution HOME; neither an authorized API-key nor OAuth-token environment credential was present. Existing private credentials were not copied. Therefore the controlled CTO heartbeat and native `freeze` Skill activation/outside-write refusal were **not run**; filesystem registration and hook parsing do not establish hook enforcement. Authenticate Claude in the chosen dedicated execution account/HOME, then explicitly authorize onboarding and those checks. Codex/outside-provider authentication and applicable code-sharing consent remain separate prerequisites.
