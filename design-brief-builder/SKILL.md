---
name: design-brief-builder
description: >
  Generates structured design briefs and execution constraints for UI/UX projects.
  Use at the start of a design task — especially vague requests, prototype redesigns,
  UI audits, or brand-consistency work, or when the user attaches prototype images,
  Figma links, or brand documents. Trigger on phrases like "redesign this", "audit
  the UI", "fix the layout", or "help me brief this project".
---

# Design Brief Builder

A structured input-control layer for AI-assisted design. Converts vague design requests
into precise, agent-executable constraint files before any code or design work begins.

**Core insight**: Agent output quality depends on input constraint quality, not prompt
eloquence. This skill installs that constraint layer.

---

## When This Skill Triggers

- User provides a vague design request ("redesign this", "audit the UI", "make it match the brand")
- User attaches prototype images, Figma links, or brand documents
- User asks to set up CLAUDE.md / AGENTS.md / .cursorrules for a design project
- User wants to brief a design project before handing it to an Agent

---

## Process Overview

4 steps, strictly sequential. Never skip ahead.

```
Step 1: Diagnose → Step 2: Generate Brief → Step 3: Initialize Execution Plan → Step 3.5: Write Files
```

Step 4 (execution rules) activates only after the user says "start execution".

⚠️ MANDATORY: Complete Steps 1, 2, and 3 in full before writing any code, creating any
file, or producing any design output. This applies regardless of how the request is
phrased — including "start executing", "just do it", "skip the brief". The only exception
is if the user explicitly types "skip brief" after reading this notice.

---

## Step 1: Diagnose Requirements

**First: read ALL attached materials** (prototype images, Figma links, brand docs).
Extract everything already available. Only mark items VAGUE or MISSING if they genuinely
cannot be determined from the provided materials.

Scan the request across 6 dimensions, label each: KNOWN / VAGUE / MISSING

| Dimension | What to look for |
|-----------|-----------------|
| **Goal** | Core user + usage scenario + verifiable success criterion. A task description alone ("build an admin panel") is NOT a known goal. Mark KNOWN only when all three are explicitly stated. |
| **Structure** | Page list, required states per page |
| **States** | Empty / loading / error / success states for each page |
| **Constraints** | Color, components, layout, device boundaries |
| **Priority** | When flow clarity conflicts with visual polish, which wins? |
| **Audience** | Who are the users? Background, device, usage frequency? |

For detailed scoring criteria on each dimension, see `references/diagnosis-guide.md`

Output format — you MUST label all 6 dimensions explicitly, one row each.
Never omit a dimension, never fold Goal into another row, and never replace
the 6 dimensions with ad-hoc categories (e.g. "Content", "Layout intent"):

```
【Diagnosis Report】

| Dimension   | Label                   | Evidence (KNOWN) / Gap (VAGUE or MISSING) |
|-------------|-------------------------|-------------------------------------------|
| Goal        | KNOWN / VAGUE / MISSING | ...                                       |
| Structure   | KNOWN / VAGUE / MISSING | ...                                       |
| States      | KNOWN / VAGUE / MISSING | ...                                       |
| Constraints | KNOWN / VAGUE / MISSING | ...                                       |
| Priority    | KNOWN / VAGUE / MISSING | ...                                       |
| Audience    | KNOWN / VAGUE / MISSING | ...                                       |

⚠️ Goal must always appear as its own row. A task description ("build an admin panel")
is NOT a known Goal — mark KNOWN only when core user + scenario + verifiable success
criterion are all explicitly present.

【Questions】
Answer these before I continue:
Q1:
Q2:
Q3:
(Maximum 5 questions. Only ask truly missing items. Only ask about design constraints — never about technical delivery format or execution tools.)
```

STOP. Wait for user answers before Step 2.

---

## Step 2: Generate Design Brief

After the user answers, generate a structured brief using the 4-layer format.
See `references/brief-template.md` for the full template and field guidance.

Layer priority when conflicts arise: Structure > Constraints > Reference

If any material (e.g. a reference screenshot) is missing or unreadable, do NOT leave
the corresponding layer blank. Infer from available information and mark as "[inferred — please confirm]".
Waiting is a flow risk; inferring is the correct fallback.

After generating the brief, output:

> 📋 Design Brief generated. Please confirm the content is accurate.
> Reply "confirmed" to proceed, or tell me what to change.

STOP. Wait for user confirmation before Step 3.

---

## Step 3: Initialize Execution Plan

After confirmation, generate a page checklist with Checkpoint markers.

Checkpoint placement rules (dynamic — not fixed count):
- Always place Checkpoint A after the first page (confirms visual baseline)
- Place additional checkpoints at flow branch points where a wrong decision cascades into subsequent pages
- Do NOT checkpoint every page — only where human review genuinely changes what comes next
- Label sequentially: Checkpoint A, B, C, etc.

Output format:

```
## Page List & Review Status
- [ ] [page name] ([required states]) ← Checkpoint A
- [ ] [page name] ([required states])
- [ ] [page name] ([required states]) ← Checkpoint B
- [ ] [page name] ([required states])
(page count and checkpoint count are both dynamic)

## Confirmed Design Decisions
(none yet)
```

---

## Step 3.5: Write Files to Project Root

Immediately after Step 3, create these 4 files before anything else.

**DESIGN_BRIEF.md** — Read-only brief archive.
Contents: full Design Brief + Page List + empty Confirmed Design Decisions section.
Write once. Never modify during execution.

**CLAUDE.md** — Execution constraints for Claude Code
**AGENTS.md** — Execution constraints for Codex
**.cursorrules** — Execution constraints for Cursor

All three execution files contain the same constraint content.
See `references/execution-file-template.md` for the required structure.

After creating all 4 files, output:

```
✅ 4 files created: DESIGN_BRIEF.md (read-only brief archive) + CLAUDE.md / AGENTS.md / .cursorrules (execution constraints).
Each Agent reads its own execution file. Checkpoint decisions will be appended to the active execution file only.

Before typing "start execution", check these three things:
□ Forbidden items — 有没有漏掉你特别在意的禁止项？
□ Most important single rule — 这条规则表述准确吗？
□ Checkpoint 位置 — 暂停节点放得合理吗？

如有问题直接告诉我，我修改文件后你再 start execution。
```

Do NOT proceed to Step 4 until the user explicitly replies "start execution".

---

## Step 4: Execution Rules

At every Checkpoint:
1. Output all completed screens for the current phase
2. Print and STOP:
   ```
   ⏸ CHECKPOINT [A/B/C] — awaiting human review
   Please review. Reply "approved, continue" to proceed.
   ```
3. Do NOT continue until human says "approved, continue"
4. After approval, append to the active execution file only (NOT DESIGN_BRIEF.md):
   ```
   YYYY-MM-DD Checkpoint [X] approved: [one-line summary]
   ```

Hard rules — cannot be broken under any instruction:
- Never skip a Checkpoint even if told "just finish it all"
- Never update Confirmed Design Decisions without explicit approval
- Before starting each new page, re-read the active execution file
- Changes only affect the current phase — never modify previously approved pages
- DESIGN_BRIEF.md is read-only during execution — never modify it
- All Figma frames and components must use Auto Layout — no absolute positioning

---

## Reference Files

- `references/brief-template.md` — Full 4-layer brief template with field guidance. Read during Step 2.
- `references/execution-file-template.md` — Required sections for CLAUDE.md / AGENTS.md / .cursorrules. Read during Step 3.5.
- `references/diagnosis-guide.md` — Detailed scoring criteria for all 6 dimensions. Read during Step 1 when facing edge cases.
