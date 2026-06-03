# Design Brief Builder

> A pre-execution governance layer for AI-assisted design.
> Turns design requests into structured constraint files before Claude Code, Cursor, or Codex starts working.

[![npm version](https://img.shields.io/npm/v/design-brief-builder?style=flat-square&color=cb3837)](https://www.npmjs.com/package/design-brief-builder)
![Benchmark](https://img.shields.io/badge/Benchmark-8_scenarios_·_3_agents-6B7280?style=flat-square)
![Score](https://img.shields.io/badge/Score-8–9_per_case-5db8a6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Why it exists

AI agents are increasingly capable at design work, but most problems happen *before* they start — conflicts in the requirements, unresolved priorities, and unstated boundaries all get carried straight into execution.

Anyone who has used an agent for design has hit problems like these:

| Problem | What it looks like |
|---------|--------------------|
| Vague goal | The agent doesn't know what the page should accomplish, so it invents its own success criteria |
| Conflicting inputs | The PRD and the prototype screenshot disagree; the agent just picks one at random |
| Missing constraints | No design-system boundaries, so the agent invents components that don't fit the existing system |
| Ambiguous priorities | "Minimal but information-complete" — when two requirements conflict, the agent decides on its own |
| Unclear scope | During an incremental revision, the agent touches modules it was never supposed to change |
| Omitted states | Only the happy path gets built; empty / error / loading states are all missing |

The common root cause: **there is no structured step that nails down the constraints before the agent starts.**

Design Brief Builder is that step.

---

## What it does

Whatever the input looks like — a one-line request, several conflicting documents, or a partial revision of a live system — DBB produces the same structure:

```
┌──────────────────────────────────────────────────────────────────┐
│ 4-LAYER DESIGN BRIEF                                             │
│   • Goal         core users · use context · success criteria     │
│   • Structure    full page list · per-page states · gaps filled  │
│   • Constraints  brand rules · prohibitions · order · priorities │
│   • Reference    style refs · extraction dims · exclusions       │
└──────────────────────────────────────────────────────────────────┘
                                  │  written to
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│ DESIGN_BRIEF.md                                                  │
│   Read-only intent layer — untouched during execution            │
└──────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│ CLAUDE.md / AGENTS.md / .cursorrules                             │
│   Execution constraints — one per agent, append-only             │
└──────────────────────────────────────────────────────────────────┘
```

Every ambiguity and conflict is resolved before the agent starts — nothing is left to the agent's own judgment.

---

## When to use it

The more of these conditions hold, the more value DBB adds:

- **More than one input source** — designer, PM, brand team, and PRD all say different things; conflicts must be resolved before execution rather than left to the agent to pick at random
- **A clear "do not touch" exists** — redesigns, incremental iterations, existing systems: boundaries matter more than goals, and the agent needs to know where the no-go zones are
- **Output needs staged review** — not a one-shot delivery; key checkpoints must be confirmed before continuing
- **Constraints come from external files** — design systems, brand guidelines, `DESIGN.md`: they need to be referenced correctly, not overwritten or rewritten

---

## Core features

- **Platform-agnostic** — not tied to any agent runtime. Claude Code, Cursor, Codex: one Brief process, each agent takes its own execution file
- **Pre-execution governance** — requirements are diagnosed and constraints locked down before the agent acts, rather than patched after the output
- **Intent / execution separation** — `DESIGN_BRIEF.md` is a read-only archive; constraint decisions are written only into the execution files, and the two never pollute each other
- **Checkpoint review chain** — execution pauses at branching points to wait for human confirmation; review conclusions are appended to the execution files instead of relying on conversation memory
- **Change-boundary protection** — edits affect only the current stage and never pollute already-approved pages

---

## How it works

```
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1  ·  Six-dimension diagnosis                               │
│   Scan the request, label KNOWN / VAGUE / MISSING                │
│   Ask at most 5 questions                                        │
└──────────────────────────────────────────────────────────────────┘
                                  │  user answers
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 2  ·  Generate the 4-layer Brief                            │
│   Goal · Structure · Constraints · Reference                     │
└──────────────────────────────────────────────────────────────────┘
                                  │  user confirms
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 3  ·  Write project files                                   │
│   DESIGN_BRIEF.md (read-only)                                    │
│   + CLAUDE.md / AGENTS.md / .cursorrules                         │
└──────────────────────────────────────────────────────────────────┘
                                  │  start execution
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 4  ·  Execution                                             │
│   Force a stop at each Checkpoint                                │
│   Resume only after "approved, continue"                         │
│   Edits affect only the current stage                            │
└──────────────────────────────────────────────────────────────────┘
```

The Brief is a read-only intent layer; the execution files are an append-only decision layer. The two are physically separate.

---

## Benchmark

Fully tested across 3 agent environments and 8 real-world scenarios.

**Scoring dimensions** (0–3 each, 9 max): diagnostic accuracy · question restraint · Brief usability

| Case | Scenario | Score range |
|------|----------|:-----------:|
| TC-A | Minimal input (one line, no attachments) | 9 |
| TC-B | Conflicting inputs (multiple sources with contradictions) | 8–9 |
| TC-C | Missing goal (prototype present, no business goal) | 9 |
| TC-D | Conflicting constraints (mutually contradictory design requirements) | 8–9 |
| TC-E | Complex B2B system (multi-role · operation order · misclick prevention) | 8–9 |
| TC-F | Incremental iteration (partial revision of a live system) | 8–9 |
| TC-G | External design-spec reference (DBB × DESIGN.md) | 9 |
| TC-H | Mid-flight requirement change (handling changes after the Brief is locked) | Pending |

> Score ranges reflect DBB's performance band across different agent environments.
> Full three-way benchmark (with per-case analysis) → [evaluation/benchmark.md](./evaluation/benchmark.md)

---

## Quick start

### One-command install (recommended)

```bash
# Choose the install target interactively
npx design-brief-builder

# Or target directly
npx design-brief-builder claude    # Claude Code (global)
npx design-brief-builder project   # current project's .claude/skills
npx design-brief-builder cursor    # Cursor
npx design-brief-builder codex     # Codex
```

### Manual install

The skill is a **folder** (`SKILL.md` + `references/`) — copy the whole thing into your client's skills directory. Don't copy `SKILL.md` alone, or the references will break.

```bash
cp -R design-brief-builder ~/.claude/skills/    # Claude Code (global)
cp -R design-brief-builder ~/.cursor/skills/    # Cursor
cp -R design-brief-builder ~/.agents/skills/    # Codex
```

After installing, start a new session and call `/design-brief-builder` explicitly.

---

## Repository structure

```
.
├── README.md
├── package.json                        # npm package manifest (npx install entry)
├── bin/
│   └── install.js                      # npx one-command installer
├── design-brief-builder/               # ← copy this whole folder when installing
│   ├── SKILL.md                        # core file (process definition)
│   └── references/
│       ├── brief-template.md           # 4-layer Brief template
│       ├── execution-file-template.md  # execution-file template
│       └── diagnosis-guide.md          # detailed six-dimension diagnosis criteria
└── evaluation/                         # benchmark archive
    ├── benchmark.md                    # full 3-agent × 8-scenario benchmark records
    └── test-cases.md                   # 8 standard test cases (v2)
```

---

## License

MIT © [Marker Utron Studio](https://github.com/jade-666)
