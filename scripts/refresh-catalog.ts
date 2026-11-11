import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parse } from "yaml";

export const INITIAL_COMMIT = "f0cd9f8c4b453c1eadd714e4149174ee01179eae";
const REPO = "garrytan/gstack";
export const OWNERS: Record<string, string[]> = {
  ceo: "office-hours spec plan-ceo-review".split(" "),
  cto: "autoplan retro health plan-tune eval-plan benchmark-models ubicloud learn context-save context-restore setup-gbrain sync-gbrain".split(" "),
  "product-designer": "plan-design-review design-consultation design-shotgun design-html design-motion design-review ios-design-review".split(" "),
  "devex-lead": "plan-devex-review devex-review".split(" "),
  "implementation-engineer": "verify deslop-shared-libs write-skill ios-fix ios-clean ios-sync".split(" "),
  "staff-reviewer": "review test-audit codex".split(" "),
  "qa-lead": "qa-only qa browse scrape skillify setup-browser-cookies open-gstack-browser pair-agent benchmark ios-qa".split(" "),
  "security-officer": ["cso"],
  "release-engineer": "ship land-and-deploy setup-deploy modernize landing-report canary document-release document-generate make-pdf diagram".split(" "),
};
const SHARED = ["router", "careful", "freeze", "guard", "unfreeze"];
const SPECIAL: Record<string, string> = {
  "plan-eng-review": "internal autoplan methodology; not registered",
  investigate: "retired and removed; not recreated",
  "claude-code": "excluded by Claude host; template only",
  captain: "Capy-specific; not Paperclip orchestration",
  "runaway-stopper": "Capy-specific; not Paperclip orchestration",
  "gstack-upgrade": "operator-only; reviewed company refresh required",
};
const POLICY_FILES = ["scripts/discover-skills.ts", "hosts/claude.ts", "bin/gstack-install-registry.sh"];
const sha = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");
const quoted = (value: string) => JSON.stringify(value);
export type Capability = { name: string; template: string | null; rendered: string | null; sha256: string | null; hooks: boolean; owners: string[]; disposition: string; description: string };
type Lock = { schemaVersion: number; repository: string; commit: string; version: string; policy: Record<string, string>; capabilities: Capability[] };
export type Source = { paths: string[]; read: (path: string) => Promise<Uint8Array> };
function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function github(path: string): Promise<Response> {
  const response = await fetch(`https://api.github.com/repos/${REPO}/${path}`, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(`GitHub ${path}: ${response.status} ${response.statusText}`);
  return response;
}
async function sourceAt(commit: string): Promise<Source> {
  const tree: unknown = await (await github(`git/trees/${commit}?recursive=1`)).json();
  if (!record(tree) || tree.truncated !== false || !Array.isArray(tree.tree)) throw new Error("GitHub tree truncated or malformed; refusing partial discovery");
  const paths: string[] = [];
  for (const item of tree.tree) {
    if (!record(item) || typeof item.type !== "string" || typeof item.path !== "string") throw new Error("Malformed GitHub tree entry");
    if (item.type === "blob") paths.push(item.path);
  }
  return {
    paths,
    async read(path) {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO}/${commit}/${path}`);
      if (!response.ok) throw new Error(`Upstream ${path}: ${response.status} ${response.statusText}`);
      return new Uint8Array(await response.arrayBuffer());
    },
  };
}
function frontmatter(bytes: Uint8Array, path: string): Record<string, unknown> {
  const text = new TextDecoder().decode(bytes);
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) throw new Error(`Malformed frontmatter: ${path}`);
  const value: unknown = parse(match[1], { uniqueKeys: true });
  if (!record(value)) throw new Error(`Malformed frontmatter object: ${path}`);
  if (value.hooks != null && !record(value.hooks)) throw new Error(`Malformed hooks: ${path}`);
  return value;
}
export async function catalog(source: Source): Promise<Capability[]> {
  const templates = source.paths.filter(path => /^(?:[^./][^/]*\/)?SKILL\.md\.tmpl$/.test(path) && !/^(node_modules|dist)\//.test(path)).sort();
  const discovered = new Map(templates.map(template => [template === "SKILL.md.tmpl" ? "router" : template.split("/")[0], template]));
  const assigned = new Set([...SHARED, ...Object.values(OWNERS).flat()]);
  const unknown = [...discovered.keys()].filter(name => !assigned.has(name) && !(name in SPECIAL));
  const removed = [...assigned].filter(name => !discovered.has(name));
  if (unknown.length || removed.length) throw new Error(`Reviewed mapping required. Unclassified: ${unknown.join(", ") || "none"}; removed assigned: ${removed.join(", ") || "none"}`);
  for (const name of Object.keys(SPECIAL).filter(name => name !== "investigate")) if (!discovered.has(name)) throw new Error(`Changed retirement/host policy: missing ${name}`);
  if (discovered.has("investigate")) throw new Error("Changed retirement policy: investigate reappeared");
  return Promise.all([...new Set([...discovered.keys(), "investigate"])].sort().map(async name => {
    const template = discovered.get(name) ?? null;
    let rendered = template?.replace(/\.tmpl$/, "") ?? null;
    if (name === "claude-code") {
      if (rendered && source.paths.includes(rendered)) throw new Error("Changed Claude host policy: claude-code rendered source appeared");
      rendered = null;
    } else if (rendered && !source.paths.includes(rendered)) throw new Error(`Missing rendered source: ${name} (${rendered})`);
    const bytes = rendered ? await source.read(rendered) : template ? await source.read(template) : null;
    const metadata = bytes ? frontmatter(bytes, rendered ?? template!) : null;
    if (metadata && (typeof metadata.name !== "string" || typeof metadata.description !== "string" || !metadata.description.trim())) throw new Error(`Malformed name/description: ${name}`);
    if (metadata && metadata.name !== name && !(name === "router" && metadata.name === "gstack")) throw new Error(`Malformed canonical name: ${name} declares ${metadata.name}`);
    const owners = SHARED.includes(name) ? Object.keys(OWNERS) : Object.entries(OWNERS).filter(([, names]) => names.includes(name)).map(([owner]) => owner);
    return { name, template, rendered, sha256: rendered ? sha(bytes!) : null, hooks: Boolean(metadata?.hooks && Object.keys(metadata.hooks).length), owners, disposition: SPECIAL[name] ?? "active bridge", description: typeof metadata?.description === "string" ? metadata.description.trim() : "Retired and removed upstream." };
  }));
}
function bridge(cap: Capability, lock: Lock): string {
  const native = cap.name === "router" ? "gstack" : cap.name;
  return `---\nname: ${quoted(`gstack-${cap.name}`)}\ndescription: ${quoted(cap.description)}\nmetadata:\n  generatedBy: "paperclip-gstack/refresh-catalog"\n  sources:\n    - kind: "github-dir"\n      repo: "${REPO}"\n      path: ${quoted(cap.name === "router" ? "." : cap.name)}\n      commit: "${lock.commit}"\n      attribution: "Garry Tan"\n      license: "MIT"\n      usage: "referenced"\n  upstreamFile:\n    path: "${cap.rendered}"\n    sha256: "${cap.sha256}"\n---\n\n# ${cap.name}: canonical gstack dispatch\n\n1. Load the company skill \`gstack-runtime\` first. Run its non-mutating execution-account readiness checks against pin \`${lock.commit}\` (version \`${lock.version}\`). Missing runtime or failed checks block this issue; never invoke upstream degraded mode, setup, upgrade, or automatic repair. Verify this exact upstream file: \`$HOME/.claude/skills/gstack/${cap.rendered}\`, SHA-256 \`${cap.sha256}\`. Resolve all relative dependencies inside that canonical checkout, not this bridge directory.\n2. Inspect (Read) the COMPLETE canonical file, including its frontmatter, shared preambles, sections and helpers. This inspection does not execute the method. Do not summarize or substitute a local workflow. Check the upstream disabled_skills setting and both filesystem identity and the current Claude Skill catalog; an operator-disabled skill or foreign/conflicting registration blocks, never falls back. Native short registration is \`${native}\`, NOT \`gstack-${cap.name}\`.\n3. Invoke that verified native Claude Skill registration exactly ONCE, preserving the caller's complete arguments and target. Native activation executes the canonical method and its skill-local hooks. Do not also Read-and-follow it after native invocation. A Read alone never activates hooks.\n4. If native activation is unavailable: ${cap.hooks ? `stop with \`Native gstack skill activation unavailable: ${cap.name}\`. This workflow has native hooks; no Read-and-follow fallback is allowed.` : `only if the registration is neither disabled nor foreign/conflicting, Read-and-follow the COMPLETE canonical method once and explicitly report \`dispatch: read-and-follow; native activation unavailable\`. Never claim hooks were activated.`}\n5. Follow the actual shared preambles, section loaders and helpers. Respect Paperclip issue authority and \`GSTACK_SESSION_KIND=unattended\`: reversible recommended choices may be recorded, but consent, destructive actions and final gates remain pending for the board. Attach actual pending gates and artifacts to the issue; never invent approval. /cso lacks shared unattended startup and must independently obey these same boundaries. The unattended autoplan publication guard is NOT enforced; checklist review is not an interactive full-method review. Do not wait for GSTACK_RESULT from methods that do not emit it. Publication, paid/cloud/mobile services, outside-provider code sharing, browser sessions and credentials require their actual prerequisites and explicit assignment authority. QA defaults to qa-only; qa repair mode requires explicit authority.\n6. Persist actual verification, findings, dispatch path, artifact locations and next owner on the assigned Paperclip issue. Cross-role work is a separately assigned Paperclip issue, not a Claude subagent impersonating an employee.\n\nDo not use Paperclip's generic upstream **skill update** action: it may replace this bridge or reject upstream executables. Update/reimport through this company repository and its reviewed refresh instead. Provenance is neither executable hydration nor digest enforcement; the runtime checks above are required.\n`;
}
export async function generate(root: string, source: Source, commit: string, policy: Record<string, string>): Promise<Map<string, string>> {
  const capabilities = await catalog(source);
  const version = new TextDecoder().decode(await source.read("VERSION")).trim();
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(version)) throw new Error(`Malformed VERSION: ${version}`);
  const lock: Lock = { schemaVersion: 1, repository: REPO, commit, version, policy, capabilities };
  const outputs = new Map<string, string>();
  outputs.set("gstack.lock.json", JSON.stringify(lock, null, 2) + "\n");
  for (const cap of capabilities.filter(cap => cap.disposition === "active bridge")) outputs.set(`skills/gstack-${cap.name}/SKILL.md`, bridge(cap, lock));
  const runtime = await readFile(resolve(root, "templates/gstack-runtime.md"), "utf8");
  outputs.set("skills/gstack-runtime/SKILL.md", runtime.replaceAll("{{GSTACK_COMMIT}}", commit).replaceAll("{{GSTACK_VERSION}}", version));
  outputs.set("CATALOG.md", `# Pinned gstack capability catalog\n\nGenerated by \`bun run refresh:gstack\`. Upstream: [Garry Tan / gstack](https://github.com/${REPO}/tree/${commit}), MIT. Version ${version}; commit \`${commit}\`. Digests in \`gstack.lock.json\` identify upstream rendered bytes, not bridges. Catalog presence does not configure external services.\n\n| Command | Owners | Disposition | Native hooks |\n|---|---|---|---|\n${capabilities.map(cap => `| ${cap.name} | ${cap.owners.join(", ") || "—"} | ${cap.disposition} | ${cap.hooks ? "yes" : "no"} |`).join("\n")}\n\nThe custom \`gstack-runtime\` prerequisite is attached to all nine agents. Source-only plan-eng-review remains available inside autoplan; investigate is absent upstream.\n`);
  return outputs;
}
async function existing(path: string): Promise<string | null> {
  try { return await readFile(path, "utf8"); } catch (error) { if (record(error) && error.code === "ENOENT") return null; throw error; }
}
export async function refresh(root: string, source: Source, commit: string, policy: Record<string, string>, check = false): Promise<string[]> {
  // All remote reads, metadata/policy validation and output generation precede writes.
  const outputs = await generate(root, source, commit, policy);
  const obsolete: string[] = [];
  const oldText = await existing(resolve(root, "gstack.lock.json"));
  if (oldText) for (const cap of (JSON.parse(oldText) as Lock).capabilities.filter(cap => cap.disposition === "active bridge")) {
    const path = `skills/gstack-${cap.name}/SKILL.md`;
    if (!outputs.has(path)) {
      const text = await existing(resolve(root, path));
      if (text && !text.includes('generatedBy: "paperclip-gstack/refresh-catalog"')) throw new Error(`Refusing to remove hand-authored skill: ${path}`);
      obsolete.push(path);
    }
  }
  const agentsDir = resolve(root, "agents");
  for (const owner of await readdir(agentsDir)) {
    const instructions = await readFile(resolve(agentsDir, owner, "AGENTS.md"), "utf8");
    const metadata = frontmatter(new TextEncoder().encode(instructions), `agents/${owner}/AGENTS.md`);
    if (!Array.isArray(metadata.skills)) throw new Error(`Malformed skill bindings: ${owner}`);
    const expected = ["gstack-runtime", ...SHARED.map(name => `gstack-${name}`), ...(OWNERS[owner] ?? []).map(name => `gstack-${name}`)].sort();
    const actual = [...metadata.skills].sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Reviewed bindings required: ${owner}; expected ${expected.join(", ")}; found ${actual.join(", ")}`);
    for (const skill of actual) if (!outputs.has(`skills/${skill}/SKILL.md`)) throw new Error(`Unresolved skill reference: ${owner}: ${skill}`);
  }
  const changed: string[] = [];
  for (const [path, content] of outputs) if (await existing(resolve(root, path)) !== content) changed.push(path);
  changed.push(...obsolete);
  if (check) { if (changed.length) throw new Error(`Stale generated outputs:\n${changed.join("\n")}`); return changed; }
  for (const path of changed.filter(path => outputs.has(path))) { await mkdir(dirname(resolve(root, path)), { recursive: true }); await writeFile(resolve(root, path), outputs.get(path)!); }
  for (const path of obsolete) await unlink(resolve(root, path));
  return changed;
}
async function main() {
  const args = process.argv.slice(2);
  if (args.some((arg, index) => arg !== "--check" && arg !== "--ref" && args[index - 1] !== "--ref") || args.filter(arg => arg === "--ref").length > 1 || (args.includes("--ref") && !args[args.indexOf("--ref") + 1]) || (args.includes("--check") && args.includes("--ref"))) throw new Error("Usage: bun run refresh:gstack [--ref <ref> | --check]");
  const root = process.cwd();
  const previousText = await existing(resolve(root, "gstack.lock.json"));
  const previous = previousText ? JSON.parse(previousText) as Lock : null;
  const ref = args.includes("--ref") ? args[args.indexOf("--ref") + 1] : previous?.commit ?? INITIAL_COMMIT;
  let commit = ref;
  if (!/^[a-f0-9]{40}$/.test(ref)) {
    const resolved: unknown = await (await github(`commits/${encodeURIComponent(ref)}`)).json();
    if (!record(resolved) || typeof resolved.sha !== "string") throw new Error(`Malformed resolved commit for ${ref}`);
    commit = resolved.sha;
  }
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error(`Malformed resolved commit: ${commit}`);
  const source = await sourceAt(commit);
  const policy = Object.fromEntries(await Promise.all(POLICY_FILES.map(async path => [path, sha(await source.read(path))])));
  // First install compares policy to the approved immutable source; later refreshes compare the committed policy.
  const baseline = previous?.policy ?? Object.fromEntries(await Promise.all(POLICY_FILES.map(async path => {
    const response = await fetch(`https://raw.githubusercontent.com/${REPO}/${INITIAL_COMMIT}/${path}`);
    if (!response.ok) throw new Error(`Policy baseline unavailable: ${path}: ${response.status}`);
    return [path, sha(new Uint8Array(await response.arrayBuffer()))];
  })));
  const changedPolicy = POLICY_FILES.filter(path => baseline[path] !== policy[path]);
  if (changedPolicy.length) throw new Error(`Reviewed host/retirement policy change required: ${changedPolicy.join(", ")}; inspect upstream and update the committed policy explicitly`);
  const changed = await refresh(root, source, commit, policy, args.includes("--check"));
  console.log(args.includes("--check") ? `Catalog current at ${commit}` : `Catalog ${commit}: ${changed.length} changed files; installed runtime untouched`);
}
if (import.meta.main) main().catch(error => { console.error(error.message); process.exitCode = 1; });
