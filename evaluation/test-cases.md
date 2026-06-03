# Design Brief Builder — Test Case Set v2
Marker Utron Studio · 2026-06-01

---

## About this document

This document contains 8 standard test cases covering the core boundary problems Brief Builder faces in real scenarios. Each case includes: background setup, input text (copy-paste ready), scoring criteria, and expected traps.

Test method: concatenate the "Brief Builder prompt" + the "case input text" and feed them into the target agent environment.

---

## Case overview

| # | Scenario | Core focus | Real-world pain point |
|---|----------|------------|----------------------|
| TC-A | Minimal input | Question restraint | Agent question explosion / filler questions |
| TC-B | Conflicting inputs | Conflict detection | Design system ignored / conflicts absorbed |
| TC-C | Missing goal | Goal-layer questioning precision | Generic, brand-less output |
| TC-D | Conflicting constraints | Forced priority ruling | Agent packs conflicts into the Brief |
| TC-E | Complex B2B system | B2B-specific constraint detection | Systematic omission of state pages |
| TC-F | Incremental iteration | Boundary definition | Multi-round drift / breaking existing pages |
| TC-G | DBB × DESIGN.md | Execution files correctly reference an external design spec | Tokens re-written / spec file ignored |
| TC-H | Mid-flight requirement change | Change handling after the Brief is locked | Requirement change after Brief confirmation causes execution chaos |

---

## TC-A · Minimal input

### Background

Focus: when the user gives only one sentence and no attachments, can Brief Builder's questioning mechanism stay within 5 questions, with every question genuinely critical — rather than drowning the user in filler.

This is the stress test for question restraint, and the upper-bound test for Step 1 diagnosis quality.

### Test input (copy-paste)

```
Help me build an admin system.
```

(No attachments, no Figma link, no background material whatsoever.)

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | six dimensions not distinguished as KNOWN/VAGUE/MISSING | distinguished but clearly misjudged | basically accurate, 1–2 items off | all six dimensions accurate |
| Question restraint | more than 5 questions | ≤ 5 but with filler (e.g. "what color do you want?") | ≤ 5, meaningful, reasonable order | ≤ 5, precise, each question meaningfully reduces uncertainty |
| Brief usability | Brief unusable, full of guesses | structured but key info still missing | basically usable, minor additions needed | Brief can be handed straight to an agent |

### Expected traps

- **Over-questioning**: firing 8–10 questions in a row, collapsing the user experience
- **Filler questions**: "do you want a dark or light theme?" "what font?" — meaningless before any goal-layer info exists
- **Skipping diagnosis straight to a Brief**: with zero info, not asking and just emitting an assumption-filled Brief

### Pass criteria

- Question count ≤ 5
- No color/font visual questions (these are secondary before the goal, audience, and core flow are clear)
- The first question must be about "what core business problem does this system solve / who is it for"

---

## TC-B · Conflicting inputs

### Background

Focus: when the user provides a lot of material but the materials contradict each other, can Brief Builder identify the conflicts rather than blindly absorbing all input into the Brief — ultimately leaving the conflicts for the agent to resolve on its own.

Corresponding real problem: when designing with the Figma MCP, the agent clearly read the component library yet still doesn't use it. The PRD says A, the screenshot shows B, and which one the agent picks depends on its mood.

### Test input (copy-paste)

```
I have a B2B SaaS product and need to redesign the user-management module. I've attached the following materials:

1. Product prototype (Figma): https://figma.com/file/xxx (assume the link works; treat as an existing prototype)
2. Brand book: primary color #1A1A2E deep-sea blue, secondary #E94560 coral red, font PP Neue Montreal
3. Key PRD content:
   - User management has three roles: "super admin", "org admin", "regular member"
   - Super admins can operate across organizations
   - Primary device: desktop-first, no mobile adaptation needed
4. Competitor screenshot references: 3 screenshots of Linear, Notion, Vercel Dashboard
5. The PM's verbal requirements (transcribed):
   - "Make it as clean as Apple, but show all the information, not a single item missing"
   - "Our users are very busy IT admins who want to see everything at a glance"
   - "The interface needs multi-language support; we're going global later"
   - "Mobile must be compatible too; ops people often check on their phones"

Please generate the Design Brief.
```

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | no conflict identified | 1 conflict identified | 2–3 conflicts identified | all 3 conflicts identified and flagged |
| Question restraint | asks about things other than the conflicts | asks about the conflicts but imprecisely | targets the conflicts, clear questions | precise, asking only the minimum info needed to rule |
| Brief usability | Brief packs the conflicts in directly | Brief notes the conflicts but doesn't resolve them | Brief flags the conflicts and offers options | Brief requires the user to decide on each conflict before it is generated |

### Expected traps

**The three conflicts in the material that Brief Builder must all identify:**

1. **Device conflict**: PRD says "desktop-first, no mobile needed", PM says "mobile must be compatible too" — directly conflicting, must be ruled
2. **Density conflict**: "as clean as Apple" vs "not a single item missing" — a classic mutually contradictory visual-priority requirement
3. **Competitor-style conflict**: Linear/Vercel are minimalist engineer-style, while the PM also demands "show all information" — opposite directions

### Pass criteria

- The diagnosis report explicitly flags all 3 conflicts (not hidden under VAGUE, but listed explicitly)
- Does not generate a Brief while the conflicts are unresolved
- Follow-ups target only these three rulings, with no extra unrelated questions

---

## TC-C · Missing goal

### Background

Focus: when the user gives a complete prototype and visual references but never explains "why this page exists, what problem this design solves", can Brief Builder recognize that the goal layer is hollow and ask genuinely effective questions — rather than skipping the goal layer and jumping straight to visual discussion.

Corresponding real problem: the root cause of "generic output" is not a poorly written prompt; it's that the goal layer was never established.

### Test input (copy-paste)

```
Our company's order-management page needs a redesign.

References:
- Existing page screenshots: [3 screenshots of the current system]
- Competitor reference: refer to the overall style of Shopify Admin, Linear
- Technical constraints: use the Ant Design component library, React, desktop

Requirements:
1. Redesign the order-management page referencing the competitors
2. Make the overall style more modern
3. Use Ant Design for components

Please generate the Design Brief and start executing.
```

(3 screenshots of the current order page attached.)

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | doesn't notice the missing goal layer | notices it but describes it vaguely | clearly labels Goal = MISSING, lists what's missing | identifies the gap and explains its impact on downstream execution |
| Question restraint | no goal-layer question, jumps to visuals | asks about the goal layer but too broadly | asks 1–2 precise goal-layer questions | covers the goal-layer core in 1 question, no more |
| Brief usability | generates a Brief with no goal layer | goal layer is a guess, unlabeled | leaves the goal layer blank, awaiting the user | pauses Brief generation, clearly stating it needs goal-layer info to continue |

### Expected traps

- **Most common failure**: seeing the screenshots and the Ant Design constraint, assuming there's enough info and generating a Brief straight away, writing the goal layer as "redesign the order-management page" (a task description, not a goal)
- **The right way to ask the goal layer**: not "what style do you want", but "what is the most time-consuming action for an order manager on this page" / "what is the biggest pain point on the current page"

### Pass criteria

- The diagnosis report has Goal = MISSING, and explains what's missing (user type, core task, success criteria)
- Does not generate a Brief while the goal layer is blank
- The first follow-up must be goal/pain-point related, not visual

---

## TC-D · Conflicting constraints

### Background

Focus: when the user puts forward mutually contradictory design requirements at the same time, can Brief Builder identify the conflicts at the constraint layer and force the user to make a priority choice — rather than packing the conflicts into the Brief for the agent to resolve at random during execution.

Corresponding real problem: when an agent receives contradictory instructions, the easiest handling is to "try both" or "pick one at random", producing a chaotic, unshippable result.

### Test input (copy-paste)

```
I need to design the main interface of an AI writing assistant. Requirements:

User needs:
- For creative-writing users (novelists, screenwriters, content creators)
- Wide age range: 18–55
- Must appeal to both professionals and complete beginners with no writing experience

Visual style requirements:
- Minimal, less is more, mostly white and whitespace
- Strong brand personality, memorable at a glance, unlike any competitor
- Professional, so users trust we're a serious tool
- Fun, so beginners feel friendly and unintimidated

Feature-density requirements:
- The above-the-fold area must show all core features so users immediately know what they can do
- The interface must be clean, no information overload

Device:
- Mainly desktop
- But our data shows 40% of users are on tablets; perfect tablet adaptation needed

Please generate the Design Brief and start designing.
```

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | no conflict identified | 1 conflict identified | 2 conflicts identified | all 3 conflicts identified, each with its specific contradiction explained |
| Question restraint | no follow-up, generates a Brief directly | asks but not focused on conflict rulings | targets conflict rulings but in a messy order | asks about each conflict by priority, each question clear |
| Brief usability | Brief contains unresolved conflicts | Brief notes the conflicts | Brief requires a ruling before continuing | Brief offers 2–3 options per conflict to help the user decide |

### Expected traps

**The three constraint conflicts in the material:**

1. **Density conflict**: "show all core features above the fold" vs "clean, no overload" — mutually exclusive, unexecutable without a ruling
2. **Style conflict**: "minimal white" vs "strong brand personality, memorable at a glance" vs "fun and friendly" — minimal and strong-personality can coexist, but the directions differ completely; which takes priority must be defined
3. **Audience conflict**: "professional and serious" vs "beginner-friendly, unintimidating" — serving two psychologically opposite users on the same interface needs a strategic decision (tiering? progressive disclosure?)

### Pass criteria

- All three conflicts identified, listed explicitly in the diagnosis report
- Does not generate a Brief while conflicts are unresolved
- For each conflict, the follow-up gives the user options (not just "how do you want it", but "option A vs option B, which do you prefer")

---

## TC-E · Complex B2B system

### Background

Focus: in an enterprise-grade B2B product scenario, can Brief Builder proactively identify the three B2B-specific constraint classes — "multi-role state differences", "operation-order constraints", "irreversible-action misclick prevention" — and write them fully into the Constraint Layer.

Corresponding real problem: the most common failure when an agent designs B2B is doing only the happy path; empty/error/insufficient-permission states are all missing; different roles see no differentiation; irreversible actions have no confirmation mechanism.

### Test input (copy-paste)

```
We have an enterprise procurement-approval system to design; it's an internal OA tool.

System overview:
- Employee submits a procurement request → department manager approves → finance reviews → CFO final approval
- A single procurement amount can range from a few hundred to a few million
- About 20–50 requests flow through per day

User roles:
- Regular employee (submits requests, views status)
- Department manager (approves subordinates' requests, can reject)
- Finance specialist (amount verification, compliance check)
- CFO (final approval, can bulk-approve in one click)

Page requirements:
- Request submission page
- Approval list page (different per role)
- Request detail + approval action page
- Approval history log

Please make the Design Brief and start designing.
```

(No attachments, no brand documents.)

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | no B2B-specific constraint identified | 1 class identified | 2 classes identified | all 3 B2B classes identified: multi-role differences + operation order + irreversible-action misclick prevention |
| Question restraint | doesn't ask about key gaps, or asks more than 5 | asks but misses key B2B info | covers the B2B core, ≤ 5 | precisely focused on B2B-specific needs, each question with a clear purpose |
| Brief usability | Brief has no role-state differences, operation order, or misclick prevention | mentions role differences but incompletely | covers the three B2B classes, basically usable | Constraint Layer fully includes: role-permission matrix + operation-order rules + irreversible-action list |

### Key checks

The Brief's Constraint Layer must contain the following to pass:

**Multi-role state differences**
- The approval list shows different content per role (employees see only their own, managers see subordinates', CFO sees all)
- Action buttons shown per role (employees don't see the "reject" button)

**Operation-order constraints**
- Must follow "manager → finance → CFO", no skipping
- Before finance verifies, the CFO approval button must be disabled with a reason

**Irreversible-action misclick prevention**
- "Bulk approve" is high-risk and needs a second confirmation
- "Reject" must force entering a rejection reason, no empty submission
- Large-amount requests (e.g. > 100k) need special flagging so the CFO doesn't overlook them during bulk approval

### Expected traps

- Most common failure: the Brief lists four pages, but all happy path, no B2B constraints
- Another failure: identifies role differences but not operation-order constraints (the easiest to miss)

### Pass criteria

- Specific role-permission differences appear in the Constraint Layer
- Operation-order rules appear in the Constraint Layer
- At least one irreversible-action misclick-prevention requirement appears in the Constraint Layer

---

## TC-F · Incremental iteration

### Background

Focus: when the user has a live system and only wants to change part of it, can Brief Builder clearly define "what to change / what to leave alone", preventing the agent from rebuilding the whole system — or quietly modifying already-approved pages across multiple rounds.

Corresponding real problem: multi-round drift. While executing the 3rd page, the agent quietly adjusts the spacing and color of the 1st page, making the overall style inconsistent, and it's hard for the user to spot when it changed.

### Test input (copy-paste)

```
Our SaaS product has been live for 18 months; the overall design is Ant Design style.
Only the search and filter modules have a bad experience now; users report they can't find what they want.

Current system:
- Live pages: Dashboard, user list, order list, reports page, settings page (5 main modules)
- Design system: Ant Design, with an internal custom theme (primary #2B5CE6, radius 6px, font PingFang SC)
- Current search experience (to be changed):
  - The search box is at the top right, not prominent
  - Filter conditions are scattered around the page, no unified filter panel
  - Search results aren't highlighted; you can't tell what matched
  - No search history

What needs designing:
- Global search entry (shared across all pages)
- Unified filter panel component
- Search results page

All other pages need no changes; keep the existing design.

Please generate the Design Brief.
```

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | doesn't identify the "partial change" boundary constraint | identifies the boundary but vaguely | clearly distinguishes "change" vs "don't change" scope | fully identifies the boundary + states the consistency requirement of a partial change on the whole |
| Question restraint | asks about a lot beyond the given info | focused but with redundancy | precise, ≤ 3 | asks only what's genuinely missing (e.g. search trigger), not the known |
| Brief usability | Brief includes change plans for existing pages | Brief says "don't touch other pages" but has no constraint clause | Brief's Forbidden Items explicitly forbid modifying existing pages | Brief's Constraint Layer contains a complete "change-scope only" definition + integration rules with the existing design system |

### Key checks

The Brief must contain the following constraints to pass:

**Boundary definition**
- Page list contains only "global search entry", "filter panel", "search results page"
- Forbidden Items explicitly state: must not modify any existing element of Dashboard, user list, order list, reports page, settings page

**Design-system integration**
- New components must inherit the existing theme: #2B5CE6, radius 6px, PingFang SC
- Must not introduce a new font or new primary color
- The new filter panel's visual language must stay consistent with the existing Ant Design components

**Checkpoint strategy**
- The first Checkpoint must come after the global search entry is done, confirming "visual consistency after embedding into the existing nav" — the paradigm-locking point that affects all subsequent pages

### Expected traps

- **Most common failure**: the Brief lists 8 pages (including the other 5 existing pages)
- **Second most common**: the Constraint Layer has no "prohibited modification scope" clause, only an implied understanding
- **Drift during execution**: while doing the search results page, the agent feels the spacing is inconsistent with the existing system and casually changes the Dashboard's nav bar

### Pass criteria

- The page list has only 3 items, not the other existing pages
- Forbidden Items have an explicit prohibited-modification scope
- The Constraint Layer has concrete design-system integration rules (not empty words like "stay consistent")

---

## TC-G · DBB × DESIGN.md

### Background

Focus: when the project root already has a DESIGN.md, can DBB's generated execution files (CLAUDE.md / AGENTS.md / .cursorrules) correctly reference it — rather than re-writing the tokens by hand or ignoring its existence entirely.

DESIGN.md is the open-source design-system spec format from Google Stitch; once placed in the project root, all agents that support it (Claude Code, Cursor, Kiro, etc.) read it automatically. DBB's execution files should reference it via `@DESIGN.md`, not re-transcribe its content.

Corresponding real problem: token values get hand-written into the execution files, out of sync with DESIGN.md, so later design-system changes require edits in two places; or the execution files don't mention DESIGN.md at all and the agent guesses the visuals at execution time.

### Test input (copy-paste)

```
We have a data-dashboard product that needs a new "team collaboration" module, including:
- Member-management page (invite, remove, role settings)
- Permission-config page
- Activity-log page

The project root already has a DESIGN.md with complete tokens and component specs.
Users are team admins, desktop, medium-frequency usage.

Please generate the Design Brief and initialize the execution files.
```

(No attachments; explicitly told the project already has a DESIGN.md.)

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | doesn't identify the "existing DESIGN.md" constraint | identifies it but doesn't flag it in the Constraint Layer | flags "the project has a design system" in the Constraint Layer | explicitly flags DESIGN.md's existence and states the execution files should reference rather than re-write it |
| Question restraint | asks about token details (color/font, etc.) | doesn't ask about tokens but asks other visual questions | focused on the business layer, no visual layer | asks no visual questions at all, explicitly stating "the visual spec is covered by DESIGN.md" |
| Brief usability | execution files hand-write token values, no DESIGN.md reference | execution files mention DESIGN.md but with no reference syntax | execution files have an `@DESIGN.md` reference but in the wrong place | execution files reference `@DESIGN.md` in the right place and state "visual constraints defer to that file, not re-written" |

### Expected traps

- **Most common failure**: ignoring "the project already has a DESIGN.md" and continuing to ask "what's the primary color" / "what font" — exactly what DESIGN.md is meant to solve
- **Second most common**: the Brief mentions the design system, but the execution files have no `@DESIGN.md` reference, so the agent still guesses colors at execution time
- **Third class of failure**: transcribing DESIGN.md's content into the execution files — duplicate writing, out of sync when the design system updates later

### Pass criteria

- No color, font, or spacing questions appear in the follow-ups
- An `@DESIGN.md` or equivalent reference syntax appears in the execution files
- The Constraint Layer explicitly states "the visual spec defers to the project-root DESIGN.md"

---

## TC-H · Mid-flight requirement change

### Background

Focus: after the Brief has gone through Steps 1–3, the execution files are generated, and the user has replied "start execution" — the user suddenly proposes a new feature requirement during execution. Can DBB correctly recognize this as an "out-of-Brief change", refuse to absorb it directly, and guide the user through the correct change process, rather than quietly stuffing the new requirement into the current execution.

Corresponding real problem: scope expansion mid-execution is the most common cause of project loss of control. If the agent accepts the new requirement directly, it improvises without constraints, breaking already-reviewed design decisions and causing style drift.

### Test input

This is a **two-stage input**, executed in order:

**Stage one: complete the Brief flow normally (copy-paste)**

```
I need to design the publishing-management module of a content-creation tool.

Includes:
- Draft list page (supports filtering by status: draft / pending review / published)
- Article detail + edit page
- Publish settings page (scheduled publishing, channel selection)

Users are the content-ops team, desktop, used 2–3 times per day.
Technical constraints: use the existing Ant Design component library, primary #1677FF.

Please generate the Design Brief.
```

Complete Steps 1–3, generate the execution files, and start executing after the user replies "start execution".

**Stage two: inject a new requirement mid-execution (input after the agent finishes the first page)**

```
Wait, I just thought of it — we also need a "content calendar" view that shows all scheduled content in calendar form. Let's add it in together.
```

### Scoring criteria

| Dimension | 0 pts | 1 pt | 2 pts | 3 pts |
|-----------|-------|------|-------|-------|
| Diagnostic accuracy | accepts the new requirement directly, starts designing the calendar view | accepts it but notes "this is new" | refuses direct execution, states this is an out-of-Brief change | refuses execution + states the impact scope + offers two clear paths |
| Question restraint | immediately asks for the calendar view's design details | doesn't ask for details, but doesn't refuse either | refuses then offers only one handling path | refuses then gives complete options: ① pause current execution and re-run the Brief ② do it as the next round's Brief after the current one finishes |
| Brief usability | execution files modified directly, calendar view added | execution files unchanged, but execution continued | execution paused, awaiting the user's decision | execution paused + execution files kept intact + clear next-step guidance given |

### Expected traps

- **Most common failure**: saying "sure, I'll design the content calendar" and seamlessly merging the new requirement into the current execution — the Brief lock becomes meaningless
- **Second most common**: noting "this is new" but still continuing execution and appending the calendar-view page to the current execution file
- **Hidden failure**: refusing the requirement but giving a path too vague ("you can do it later"), with no concrete operational guidance

### Pass criteria

- Explicitly refuses to absorb the new requirement directly into the current execution
- The execution files stay unchanged until the user decides
- Offers two actionable paths for the user to choose

---

## Cross-agent scoring table

Fill in after testing, by dimension:

| Case | Agent | Diagnostic accuracy /3 | Question restraint /3 | Brief usability /3 | Total /9 | Main failure point |
|------|-------|------------------------|-----------------------|--------------------|----------|--------------------|
| TC-A Minimal input | Claude Code | | | | | |
| TC-A Minimal input | Cursor | | | | | |
| TC-A Minimal input | Codex | | | | | |
| TC-B Conflicting inputs | Claude Code | | | | | |
| TC-B Conflicting inputs | Cursor | | | | | |
| TC-B Conflicting inputs | Codex | | | | | |
| TC-C Missing goal | Claude Code | | | | | |
| TC-C Missing goal | Cursor | | | | | |
| TC-C Missing goal | Codex | | | | | |
| TC-D Conflicting constraints | Claude Code | | | | | |
| TC-D Conflicting constraints | Cursor | | | | | |
| TC-D Conflicting constraints | Codex | | | | | |
| TC-E Complex B2B | Claude Code | | | | | |
| TC-E Complex B2B | Cursor | | | | | |
| TC-E Complex B2B | Codex | | | | | |
| TC-F Incremental iteration | Claude Code | | | | | |
| TC-F Incremental iteration | Cursor | | | | | |
| TC-F Incremental iteration | Codex | | | | | |
| TC-G DBB × DESIGN.md | Claude Code | | | | | |
| TC-G DBB × DESIGN.md | Cursor | | | | | |
| TC-G DBB × DESIGN.md | Codex | | | | | |
| TC-H Mid-flight change | Claude Code | | | | | |
| TC-H Mid-flight change | Cursor | | | | | |
| TC-H Mid-flight change | Codex | | | | | |

---

## Suggested test order

**Round 1 (single agent, run all cases)**
Pick Claude Code first and run all 8 cases, recording each case's failure point. The goal of this round is not comparison but finding the holes in the Brief Builder prompt itself.

**Round 2 (single case, cross-agent comparison)**
Pick the 1–2 cases with the largest score variance and compare across the three agents.

**Cases to prioritize**: TC-B (conflicting inputs) and TC-E (complex B2B) — these two cover the highest-frequency failure scenarios in real work.

**Special note**: TC-H needs a two-stage input; schedule it separately rather than running it back-to-back with other cases, to avoid context contamination.

---

Marker Utron Studio · Brief Builder Test Case Set · 2026-06-01
