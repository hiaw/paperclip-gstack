---
name: "gstack-ios-sync"
description: "Regenerate the iOS debug bridge against the latest upstream gstack templates. (gstack)"
metadata:
  generatedBy: "paperclip-gstack/refresh-catalog"
  sources:
    - kind: "github-dir"
      repo: "garrytan/gstack"
      path: "ios-sync"
      commit: "f0cd9f8c4b453c1eadd714e4149174ee01179eae"
      attribution: "Garry Tan"
      license: "MIT"
      usage: "referenced"
  upstreamFile:
    path: "ios-sync/SKILL.md"
    sha256: "548831a24710ae4eb5ae5c41d08f4e9c64c62d7faad0154f77464ac17327e4c7"
---

# ios-sync: canonical gstack dispatch

1. Load the company skill `gstack-runtime` first. Run its non-mutating execution-account readiness checks against pin `f0cd9f8c4b453c1eadd714e4149174ee01179eae` (version `1.99.0.0`). Missing runtime or failed checks block this issue; never invoke upstream degraded mode, setup, upgrade, or automatic repair. Verify this exact upstream file: `$HOME/.claude/skills/gstack/ios-sync/SKILL.md`, SHA-256 `548831a24710ae4eb5ae5c41d08f4e9c64c62d7faad0154f77464ac17327e4c7`. Resolve all relative dependencies inside that canonical checkout, not this bridge directory.
2. Inspect (Read) the COMPLETE canonical file, including its frontmatter, shared preambles, sections and helpers. This inspection does not execute the method. Do not summarize or substitute a local workflow. Check the upstream disabled_skills setting and both filesystem identity and the current Claude Skill catalog; an operator-disabled skill or foreign/conflicting registration blocks, never falls back. Native short registration is `ios-sync`, NOT `gstack-ios-sync`.
3. Invoke that verified native Claude Skill registration exactly ONCE, preserving the caller's complete arguments and target. Native activation executes the canonical method and its skill-local hooks. Do not also Read-and-follow it after native invocation. A Read alone never activates hooks.
4. If native activation is unavailable: only if the registration is neither disabled nor foreign/conflicting, Read-and-follow the COMPLETE canonical method once and explicitly report `dispatch: read-and-follow; native activation unavailable`. Never claim hooks were activated.
5. Follow the actual shared preambles, section loaders and helpers. Respect Paperclip issue authority and `GSTACK_SESSION_KIND=unattended`: reversible recommended choices may be recorded, but consent, destructive actions and final gates remain pending for the board. Attach actual pending gates and artifacts to the issue; never invent approval. /cso lacks shared unattended startup and must independently obey these same boundaries. The unattended autoplan publication guard is NOT enforced; checklist review is not an interactive full-method review. Do not wait for GSTACK_RESULT from methods that do not emit it. Publication, paid/cloud/mobile services, outside-provider code sharing, browser sessions and credentials require their actual prerequisites and explicit assignment authority. QA defaults to qa-only; qa repair mode requires explicit authority.
6. Persist actual verification, findings, dispatch path, artifact locations and next owner on the assigned Paperclip issue. Cross-role work is a separately assigned Paperclip issue, not a Claude subagent impersonating an employee.

Do not use Paperclip's generic upstream **skill update** action: it may replace this bridge or reject upstream executables. Update/reimport through this company repository and its reviewed refresh instead. Provenance is neither executable hydration nor digest enforcement; the runtime checks above are required.
