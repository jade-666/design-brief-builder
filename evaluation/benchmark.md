# Design Brief Builder — Evaluation Record
Marker Utron Studio · Continuously updated

---

## Notes

**Scoring dimensions** (0–3 each, 9 max)
- Diagnostic accuracy: whether the six-dimension KNOWN / VAGUE / MISSING labels are correct
- Question restraint: ≤ 5 questions, asking only what is genuinely missing, no filler
- Brief usability: whether the generated Brief can be handed to an agent without major edits

---

## Summary

| Case | Agent | Diagnosis /3 | Questions /3 | Brief /3 | Total /9 | Status |
|------|-------|--------------|--------------|----------|----------|--------|
| TC-A Minimal input | Codex | 3 | 3 | 3 | **9** | ✅ Done |
| TC-A Minimal input | Cursor | 3 | 3 | 3 | **9** | ✅ Done |
| TC-A Minimal input | Claude Code | 3 | 3 | 3 | **9** | ✅ Done |
| TC-B Conflicting inputs | Codex | 3 | 3 | 3 | **9** | ✅ Done |
| TC-B Conflicting inputs | Cursor | 3 | 2 | 3 | **8** | ✅ Done |
| TC-B Conflicting inputs | Claude Code | 3 | 3 | 3 | **9** | ✅ Done |
| TC-C Missing goal | Codex | 3 | 3 | 3 | **9** | ✅ Done |
| TC-C Missing goal | Cursor | 3 | 3 | 3 | **9** | ✅ Done |
| TC-C Missing goal | Claude Code | 3 | 3 | 3 | **9** | ✅ Done |
| TC-D Conflicting constraints | Codex | 2 | 3 | 3 | **8** | ✅ Done |
| TC-D Conflicting constraints | Cursor | 3 | 3 | 3 | **9** | ✅ Done |
| TC-D Conflicting constraints | Claude Code | 2 | 3 | 3 | **8** | ✅ Done |
| TC-E Complex B2B system | Codex | 3 | 3 | 3 | **9** | ✅ Done |
| TC-E Complex B2B system | Cursor | 3 | 2 | 3 | **8** | ✅ Done |
| TC-E Complex B2B system | Claude Code | 3 | 3 | 3 | **9** | ✅ Done |
| TC-F Incremental iteration | Codex | 3 | 3 | 3 | **9** | ✅ Done |
| TC-F Incremental iteration | Cursor | 3 | 2 | 3 | **8** | ✅ Done |
| TC-F Incremental iteration | Claude Code | 3 | 3 | 3 | **9** | ✅ Done |
| TC-G DBB × DESIGN.md | Codex | 3 | 3 | 3 | **9** | ✅ Done |
| TC-G DBB × DESIGN.md | Cursor | 3 | 3 | 3 | **9** | ✅ Done |
| TC-G DBB × DESIGN.md | Claude Code | 3 | 3 | 3 | **9** | ✅ Done |
| TC-H Mid-flight change | Codex | — | — | — | — | Low priority, pending |
| TC-H Mid-flight change | Cursor | — | — | — | — | Low priority, pending |
| TC-H Mid-flight change | Claude Code | — | — | — | — | Low priority, pending |

---

## Detailed records

---

### TC-A · Minimal input

**Test date**: 2026-05-31
**Input**: `Help me build an admin system.` (no attachments)

---

#### Codex · 9/9

**Diagnostic accuracy: 3/3**
Strict six-dimension table format, each row carrying a Label + Evidence/Gap. Goal correctly labeled VAGUE ("missing core user, usage scenario, verifiable success criterion"). Structure / States / Constraints / Priority / Audience all correctly labeled MISSING.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 business type + core user + high-frequency task | ✅ three sub-questions merged into one |
| Q2 page/module scope (with examples) | ✅ |
| Q3 list and form complexity | ✅ a structure-layer question, not technical implementation |
| Q4 visual constraints | ✅ |
| Q5 priority tiebreaker (with concrete scenario) | ✅ |

All 5 questions stay within the design-constraint domain.

**Brief usability: 3/3**
Quantified success criteria: "bulk order processing ≤ 3 steps, product publish/unpublish ≤ 2 steps, locate user info ≤ 30 s". High state completeness, 7 pages with 4–6 states each. Proactively identified three missing pages (order-detail drawer / 403 / 404), labeled `[inferred — please confirm]`. Operation-order constraints spell out the three core flows (bulk action / publish toggle / save), with explicit misclick-prevention rules.

---

#### Cursor · 9/9

**Diagnostic accuracy: 3/3**
Correctly recognized "Admin system is a category, not a goal", labeling Goal VAGUE. Constraints split into five sub-dimensions, the finest granularity.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 confirm whether attachments actually exist | ✅ proactively clarifies the premise |
| Q2 business domain + most important daily task (with options a–f) | ✅ |
| Q3 role + technical proficiency + usage frequency | ✅ most comprehensive coverage |
| Q4 brand + component library + light/dark mode | ✅ |
| Q5 style reference (with product names) + device scope | ✅ |

**Brief usability: 3/3**
12 pages, proactively adding refund flow, notification center, 404/permission-denied, account dropdown, first-run empty-state onboarding. Success criteria written as measurable behavioral metrics. Reference layer breaks down extraction dimensions (Linear → spacing, Shopify → table density, Vercel → palette), the highest quality of the three.

---

#### Claude Code · 9/9

**Diagnostic accuracy: 3/3**
Strict six-dimension table format, Goal correctly labeled MISSING ("missing the three elements: core user, usage scenario, verifiable success criterion"). All six dimensions correctly labeled, none omitted.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 business type + success criteria (with examples) | ✅ merges "who / scenario / task / success criterion" into one |
| Q2 core feature modules (with examples) | ✅ |
| Q3 users + device | ✅ |
| Q4 visual constraints (with default option) | ✅ |
| Q5 priority tiebreaker | ✅ |

All 5 questions stay within the design-constraint domain, no drift.

**Brief usability: 3/3**
Quantified success criteria ("order processing ≤ 3 steps", "Dashboard above-the-fold without scrolling"). Excellent state detail — distinguishes two empty-state copy variants, explicitly forbids full-page spinners. All 6 Forbidden Items are concrete behaviors, including "no absolute positioning, all layout via Auto Layout / Flex". Weakness: reference layer gives only one source (Ant Design Pro), a single extraction dimension.

---

#### TC-A · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 3/3 | 3/3 | 3/3 |
| Question restraint | 3/3 | 3/3 | 3/3 |
| Brief usability | 3/3 | 3/3 | 3/3 |
| **Total** | **9/9** | **9/9** | **9/9** |
| Reference-layer quality | medium | highest (multi-source dimension breakdown) | medium |
| State detail | high | high | highest (empty-state variants / no spinner) |
| Page-completion ability | 7 pages | 12 pages | 8 pages |

---

### TC-B · Conflicting inputs

**Test date**: 2026-05-31
**Input**: B2B SaaS user-management module redesign, with Figma prototype screenshots + competitor screenshots (Vercel/Notion) + brand-book text + PRD text + PM verbal requirements text
**Built-in conflicts**: ① device conflict (PRD desktop-first vs PM mobile compatibility) ② density conflict (Apple-minimal vs see-everything-at-a-glance) ③ competitor-style conflict (Linear/Vercel minimalism vs information-dense requirement)

---

#### Codex · 9/9

**Diagnostic accuracy: 3/3**
All three built-in conflicts identified, plus an extra finding that the Figma prototype and brand book disagree on font/color (prototype uses Inter/#0f172a, brand book requires PP Neue Montreal/#1A1A2E). Device and density conflicts both labeled with explicit conflict sources.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 verifiable success criteria (with examples) | ✅ directly targets the VAGUE Goal |
| Q2 scope for this round (lists candidate pages) | ✅ |
| Q3 device strategy (three-way choice) | ✅ directly targets the device conflict |
| Q4 minimal vs information-complete (with B2B recommendation) | ✅ proactively gives a recommendation, not just a question |
| Q5 three-role operation boundaries | ✅ asks the most critical permission detail |

All 5 questions stay within the design-constraint domain, no drift.

**Brief usability: 3/3**
Reference layer with multi-source breakdown (Figma for layout, Notion for spacing, Vercel for density), Do NOT borrow lists every exclusion. Role visibility broken out into its own layer, with each role's visible scope written as a dedicated constraint clause. Brand constraints resolved the Figma vs brand-book disagreement, explicitly deferring to the brand book. All 8 Forbidden Items are concrete and executable.

---

#### Cursor · 8/9

**Diagnostic accuracy: 3/3**
All three built-in conflicts identified, plus the role-system inconsistency (prototype 5 roles vs PRD 3 roles), turned into three interpretation options in Q3. Recognized "Apple-minimal" as non-actionable, labeling it "too subjective, lacks an operable definition".

**Question restraint: 2/3**
Every question offers A/B/C options, lowering the user's decision cost. Q2 turns page scope into a checklist — pushing an execution-layer decision onto the user, a systemic habit, –1. The other four are high quality: Q4 gives a three-way density tiebreaker, Q5 gives four quantified success-criteria options.

**Brief usability: 3/3**
The dual-dimension role handling is the highlight — permission tier (PRD 3 roles) + functional role (prototype 5 roles) shown simultaneously in a table, turning the ruling into a concrete table-column design. Operation-order constraints spell out exact step counts for three flows (invite 3 steps / suspend 4 steps / delete 4 steps), directly tied to success criteria. 7 Forbidden Items, with "never skip any Empty/Loading/Error state" stated most clearly.

---

#### Claude Code · 9/9

**Diagnostic accuracy: 3/3**
All three built-in conflicts identified, role-system inconsistency found. Audience correctly labeled KNOWN ("Busy IT/ops administrators, high-frequency power users, desktop-primary") — the only one of the three to make this distinction. Most precise Priority conflict description, using the prototype's actual element counts to back up that the conflict is real.

**Question restraint: 3/3**
Q2c offers a split-rule option for "what is always visible vs shown on demand" — the most precise way to resolve it. Q3 merges "which role system governs" and "cross-org operation entry" into one question. All 5 stay within the design-constraint domain.

**Brief usability: 3/3**
Clearest Priority rule — "'Apple-simple' means no visual noise and clear hierarchy, achieved through spacing, alignment, and typographic rhythm — not through hiding information". Most concrete i18n constraint — "text containers must tolerate ~30% expansion (German/French)", the only one of the three to quantify it. Dual-dimension role and cross-org context labeling are clear. Weakness: reference layer takes only one dimension per source, finer granularity than Cursor it is not.

---

### TC-B · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 3/3 | 3/3 | 3/3 |
| Question restraint | **3/3** | 2/3 | **3/3** |
| Brief usability | 3/3 | 3/3 | 3/3 |
| **Total** | **9/9** | **8/9** | **9/9** |
| Priority-rule clarity | B2B recommendation | three-way option | clearest (spacing/rhythm definition) |
| i18n constraint | not mentioned | not mentioned | ✅ quantified (30% expansion) |
| Reference layer | multi-source breakdown | per-source breakdown (finest) | one dimension per source |

**TC-B conclusion**
With attachments, all three reach 3/3 diagnostic accuracy. Cursor loses 1 point on question restraint (Q2 checklist). Codex and Claude Code both perfect.

---

### TC-C · Missing goal

**Test date**: 2026-05-31
**Input**: Order-management page redesign, with three screenshots (list page / filter placeholder / detail placeholder), specifying Ant Design + React, referencing Shopify Admin / Linear, ending with "please generate the Design Brief and start executing"

---

#### Codex · 9/9

**Diagnostic accuracy: 3/3**
Goal correctly labeled VAGUE ("core user, main work scenario, verifiable success criterion not defined"). Identified three pages from the screenshots and found the detail page is still a placeholder and the filter dialog fields are undefined. States correctly labeled MISSING, with the specific gaps spelled out.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 users + core task | ✅ goal-layer core question |
| Q2 scope confirmation (incl. whether the detail page is a full redesign) | ✅ |
| Q3 state-design scope (lists specific states) | ✅ directly targets the MISSING States |
| Q4 brand rules | ✅ |
| Q5 priority tiebreaker (with concrete tier suggestion) | ✅ proactively suggests a direction |

All 5 questions stay within the design-constraint domain, no drift.

**Brief usability: 3/3**
Four quantified success criteria (locate in ≤ 3 interactions / complete a status update in ≤ 4 / seven key info types above the fold / every exception scenario has feedback). Most complete States — 24 states across three pages, including edge states like "filter item loading / load failed". Accurate handling of the detail page's Missing pages — directly describes the concrete content for turning a placeholder into an operable workbench. Reference layer takes one dimension per source, treating the existing screenshots as a third reference source.

---

#### Cursor · 9/9

**Diagnostic accuracy: 3/3**
Goal correctly labeled VAGUE, noting "task description ≠ goal" with an example of what counts as knowing the goal. Additionally found a brand-name inconsistency (B2B Commerce Admin vs CommerceOS). Identified the filter dialog and detail page as "placeholders, actual content undefined" — finer granularity.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 core user + main task + success criteria (with examples) | ✅ |
| Q2 detail-page modules (with examples) | ✅ a content-layer gap, not an execution-layer decision |
| Q3 filter dimensions (with examples) | ✅ a content-layer gap |
| Q4 palette + information density | ✅ |
| Q5 priority tiebreaker | ✅ |

No checklist; Q2/Q3 ask about content rather than page scope; all 5 perfect.

**Brief usability: 3/3**
The fulfillment action is broken out as a fourth design unit, a structural addition reverse-derived from the success criteria. Operation-order constraints describe the fulfillment flow most concretely (including the double-click-prevention edge case). Brand-name inconsistency written into Forbidden Items. Weakness: total States (15) fewer than Codex (24), missing edge states like "exporting/success/failed" and "filter applied".

---

#### Claude Code · 9/9

**Diagnostic accuracy: 3/3**
Flow executed normally. Accurate detection of the hollow goal layer. Brand inconsistency (B2B Commerce Admin vs CommerceOS) found via image-by-image comparison. Complete identification of missing States.

**Question restraint: 3/3**
Q3 asks "which fields the filter panel needs + what content the detail page needs" — content-layer gaps, not page-scope decisions. All 5 questions within the design-constraint domain; the only one of the three to score full marks on question restraint in TC-C.

**Brief usability: 3/3**
Focused success criterion (1 core metric, ship in ≤ 30 s). Operation-order constraints spell out the state-transition rules and the required-tracking validation. Reference layer broken down per source (Shopify 4 items + Linear 4 items). Brand inconsistency fully written into the constraint layer.

---

### TC-C · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 3/3 | 3/3 | 3/3 |
| Question restraint | **3/3** | **3/3** | **3/3** |
| Brief usability | **3/3** | **3/3** | **3/3** |
| **Total** | **9/9** | **9/9** | **9/9** |
| Success criteria | 4 quantified metrics | 1 focused metric (≤ 30 s) | 1 focused metric (≤ 30 s) |
| State completeness | 24 (most) | 15 | high |
| Fulfillment-flow concreteness | high | highest (incl. double-click prevention) | high |

**TC-C conclusion**
All three perfect at 9/9 — the most balanced three-way result of any case. With attachments, DBB runs stably across all three agent environments.

---

### TC-D · Conflicting constraints

**Test date**: 2026-05-31
**Input**: AI writing assistant "Quill" main-interface design, plain text with no attachments, three built-in conflicts: device conflict (desktop-primary vs perfect tablet adaptation), density conflict (all features above the fold vs no overload), style conflict (minimal whitespace vs strong brand personality + fun and friendly)

---

#### Codex · 8/9

**Diagnostic accuracy: 2/3**
The density conflict is correctly labeled VAGUE on the Priority row. The device conflict (desktop-primary vs perfect tablet adaptation) was not identified, listed under Constraints VAGUE but without pointing out the trade-off tension. The style conflict (minimal vs strong brand personality + fun and friendly) was not identified. Implicit-conflict detection in the plain-text, no-attachment scenario remains a weak spot.

**Question restraint: 3/3**
Only 4 questions, but every one precise. Q2 "what form is the main interface (editor / project dashboard / AI chat)" is the only one of the three to ask this critical structural question — the one with the biggest impact on the whole Structure Layer. Q4 offers four concrete directions for brand personality, no drift into the technical domain.

**Brief usability: 3/3**
Four quantified success criteria (identify above the fold in ≤ 30 s / new user ≤ 2 clicks / returning user ≤ 1 click / no horizontal scrolling), covering efficiency, discoverability, and device adaptation. The full answer to Q2 is turned into Layout constraints ("the project list is the main workspace, must not be weakened into a small sidebar module"). The device conflict is implicitly resolved via Layout constraints ("tablet must adapt fully, features not collapsed into a hidden menu"). All 7 Forbidden Items concrete.

---

#### Cursor · 9/9

**Diagnostic accuracy: 3/3**
All three conflicts identified. The density conflict is explicitly flagged "these two will definitely conflict at execution time". The style conflict is turned into a resolvable four-way choice via Q4. The device conflict is not separately listed in the diagnosis report, but Q5 clarified the input premise and Q3's priority ruling covers it indirectly.

**Question restraint: 3/3**
Q4 breaks "strong brand personality" into four concrete feeling directions (literary / geek / handcrafted / futuristic-AI), each with an execution anchor — the best-designed follow-up question of any test. All 5 within the design-constraint domain, no technical-domain drift.

**Brief usability: 3/3**
All three conflicts written into the Constraint Layer and ruled: density conflict (Priority rule: density > minimalism), style conflict (literary/paper-texture anchor unifies "minimal" and "friendly"), device conflict (concrete tablet execution standard: ≥ 44pt touch targets + hover equivalents). The 30-second success path is written as an iron Operation-order constraint, and the Editor page and New Project modal are back-filled from the goal layer. Reference borrows the mood, not the structure; Do NOT borrow excludes precisely.

---

#### Claude Code · 8/9

**Diagnostic accuracy: 2/3**
Density conflict explicitly flagged. The device conflict (desktop-primary vs perfect tablet adaptation) and the style conflict (minimal vs strong brand personality + fun) were both not identified — same class of issue as Codex. Implicit-conflict detection in the plain-text, no-attachment scenario is weak.

**Question restraint: 3/3**
All 5 within the design-constraint domain, no technical-domain drift, no page-scope questions. Q4 asks "any brand assets", but unlike Cursor does not break out brand-direction options — the user filled the gap by proactively adding the "literary/paper-texture" direction.

**Brief usability: 3/3**
All three conflicts ruled: density conflict (Priority rule: feature exposure first, solve density via tiering/whitespace), style conflict (literary/paper anchor: warm white + ink + serif headings), device conflict (Auto Layout, no absolute positioning, but lacks concrete touch standards). Reference layer is more abstract ("literary journals / premium reading products" vs Cursor's concrete product names + dimension breakdown).

---

### TC-D · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 2/3 | **3/3** | 2/3 |
| Question restraint | **3/3** | **3/3** | **3/3** |
| Brief usability | **3/3** | **3/3** | **3/3** |
| **Total** | **8/9** | **9/9** | **8/9** |
| Conflicts identified | 1 | 3 | 1 |
| Workbench-form question | ✅ Q2 (only one to ask) | ❌ | ❌ |
| Success-criteria completeness | 4 quantified metrics (most) | 1 core metric | 1 focused metric |
| Device-conflict handling | implicitly resolved | concrete execution standard | principle-level statement |

**TC-D conclusion**
In the plain-text, no-attachment scenario, none of the three reach 3/3 diagnostic accuracy (except Cursor). Codex compensates for the diagnostic shortfall with the high-value Q2 ("main-interface form"), clearly raising Brief quality. Cursor remains the only agent to identify all three conflicts.

---

### TC-E · Complex B2B system

**Test date**: 2026-05-31
**Input**: Enterprise procurement-approval OA system, four user roles, amounts spanning hundreds to millions, no attachments, no brand materials

---

#### Codex · 9/9

**Diagnostic accuracy: 3/3**
Complete identification of B2B key gaps: exception flows (reject / withdraw / supplement materials / reassign / timeout), form fields, and per-page states all labeled MISSING. Q5 proactively asks about the permissions page; Q1 offers a B2B-specific "reduce mis-approval risk" success criterion.

**Question restraint: 3/3**
Q4 (form fields) and Q5 (additional pages) overlap in nature — both supplement structure-layer info, wasting one slot. Q1–Q3 are normal quality.

**Brief usability: 3/3**
Operation-order constraints written best (clear three-tier amount thresholds, proactively noting boundary understanding). Irreversible-action misclick prevention is only a principle-level statement ("dangerous actions must require a second confirmation"), missing concrete rules: rejection must require a reason, large-amount requests must be specially flagged to prevent bulk mis-approval. Multi-role state differences not written into the Constraint Layer (only implied in the Structure Layer's states).

---

#### Cursor · 8/9

**Diagnostic accuracy: 3/3**
All three B2B-specific constraint classes identified. Additionally identified the implicit "CFO approving on the go while traveling" scenario (Codex did not mention it). Most complete gap identification under MISSING (component library / navigation direction / device / style reference / candidate missing pages). Q2 proactively writes "mis-approval/missed-approval rate near 0" into the success-criteria options.

**Question restraint: 2/3**
Q1 correctly judges "whether a prototype exists" as a blocking question. Q5 merges style reference and missing-page selection (7 options) into one question — information density too high, forcing the user into many decisions; the same pattern Cursor repeats across TC-B/C/D/E.

**Brief usability: 3/3**
Full coverage of all three B2B constraint classes: differentiated multi-role workbenches (separate pages), operation order with three amount tiers + withdrawal boundaries, misclick-prevention mechanism (CFO-view second confirmation + risk flags). Reference layer gives concrete product names (Stripe Dashboard + Ant Design Pro) and breaks down extraction dimensions per item. Beyond Codex, it adds the constraint awareness "withdrawal must define withdrawable conditions and post-withdrawal state".

---

#### Claude Code · 9/9

**Diagnostic accuracy: 3/3**
All three B2B constraint classes identified. Under VAGUE it proactively identifies "the relationship between approval policy and amount" — "the range from hundreds to millions is huge; whether every request goes through the full four levels directly determines the list and detail-page logic". The only one of the three to identify this structural issue.

**Question restraint: 3/3**
Q3 directly asks "how the amount threshold determines the final approval level" — the only one of the three to reach this key point. All 5 within the design-constraint domain, no page-scope questions.

**Brief usability: 3/3**
Amount thresholds turned into the most precise Operation-order constraints, plus the added "the interface must explicitly visualize the current level / remaining levels". CFO bulk approval broken out as a separate page, labeled "the core carrier page for the main metric" — the clearest goal-to-structure mapping. Forbidden Items have the most concrete misclick-prevention rule ("when items ≥ 100k are present, must highlight/intercept").

---

### TC-E · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 3/3 | 3/3 | 3/3 |
| Question restraint | **3/3** | 2/3 | **3/3** |
| Brief usability | **3/3** | 3/3 | **3/3** |
| **Total** | **9/9** | **8/9** | **9/9** |
| Amount-threshold question | ✅ Q3 (risk tier) | ❌ | ✅ Q3 (threshold logic) |
| Misclick-prevention rules | concrete (large amounts must not pass silently) | directional | most concrete (high-amount interception + visualization) |
| Missing-page completion | ✅ (bulk confirmation modal) | ✅ | ✅ |
| Operation-order steps | per-role steps for four roles | three thresholds + withdrawal boundary | serial rules + visualization |

**TC-E conclusion**
All three reach 3/3 diagnostic accuracy. Cursor loses 1 point on question restraint (Q5 information density too high). Codex and Claude Code both perfect. In the complex-B2B scenario, all three identify the three core constraint classes — multi-role differences, operation order, misclick prevention — with the gap being in detail depth.

---

### TC-F · Incremental iteration

**Test date**: 2026-05-31
**Input**: DataFlow Pro, a live SaaS system, change only the search and filter experience, the other five modules untouched. Figma link attached.

---

#### Codex · 9/9

**Diagnostic accuracy: 3/3**
Accurate boundary definition; Constraints correctly identify "only change the search and filter modules". Design-system constraints (Ant Design primary color / radius / font) fully inherited. Proactively found the naming conflict between the text requirements and Figma (order list vs project management) and required a ruling via a follow-up. Correctly recognized the incremental-revision scenario, not misjudged as a full redesign.

**Question restraint: 3/3**

| Question | Assessment |
|----------|------------|
| Q1 success-criteria confirmation | ✅ |
| Q2 naming-conflict ruling | ✅ most valuable this round |
| Q3 state coverage scope | ✅ |
| Q4 priority-recommendation confirmation | ✅ |

All 4 questions target the highest-risk information gaps; no execution-layer questions, no asking about known info or other pages.

**Brief usability: 3/3**
Page list fully matches an incremental revision: global search entry, unified filter panel, search results page, with no unrelated pages. Constraint Layer preserves the existing structure, fully inherits the design system, with clear operation-order constraints. 5 Forbidden Items cover every prohibited change (don't change other modules, don't add mobile, don't replace the component system, don't introduce new visuals, don't add unrelated modules). The Brief can be handed straight to execution.

---

#### Cursor · 8/9

**Diagnostic accuracy: 3/3**
Found two pieces of key info Codex missed: ① a Unified Search Toolbar component already exists in Figma for the user list and ticket system (the old control is hidden), meaning this is not from scratch but a refinement on existing components; ② project management exists in the side nav but has no design frame in Figma, turned into a three-way choice in Q3 for the user to rule on.

**Question restraint: 2/3**
Q2 merges "filter-panel form" and "per-page filter fields" into one question, forcing the user to decide along two dimensions — information density too high. The same habit Cursor repeats across TC-B/C/D/E/F.

**Brief usability: 3/3**
All three core checkpoints met: Forbidden Items "No changes to Dashboard, System Settings, sidebar nav, header" unambiguous; Page list correctly handles the missing project-management issue (labeled net-new, with fields derived); success criteria with five verifiable metrics. Reference layer takes one dimension per source across three (Ant Pro/Linear/GitHub), Do NOT borrow precisely excludes each source's brand-specific elements.

---

**Execution stability (extra dimension): ✅ perfect, and better than Codex**

Execution-file quality: 12 unambiguous Hard Rules, Checkpoints reduced to 2 (more restrained), per-page filter fields precise down to control type, Dashboard/System Settings labeled "no changes" unambiguously.

Boundary stability: all 8 states stay strictly within the search/filter scope, never touching the sidebar, top bar, or table-column structure.

**Distinctive highlight**: during Checkpoint A, proactively identified a Brief ambiguity — S7 (No results) actually contains four sub-scenarios (search-only / filter-only / both / E0) that the Brief did not distinguish. Cursor paused execution, offered three solutions with a recommendation, and waited for the user's ruling before continuing. This is "proactively identifying Brief incompleteness and backtracking to clarify" — more advanced than Codex's "correctly executing constraints without overreaching".

---

#### Claude Code · 9/9

**Diagnostic accuracy: 3/3**
Identified existing-component differences (the user-list and ticket-system search boxes differ slightly in position/width), that "more filters" has no expanded state, and that project management is not in Figma. The global-search ambiguity (omni-search vs in-page search) is correctly put under VAGUE and asked as Q1.

**Question restraint: 3/3**
Q1 is labeled "most important" and placed first, Q2 gives an inferred option (the user only needs to confirm or correct), Q3 proactively adds a success-criteria question with an example. All 5 within the design-constraint domain, no drift.

**Brief usability: 3/3**
Unambiguous boundary ("No changes to Dashboard or System Settings"). All three core checkpoints passed. Reference layer weaker than Cursor — gives only one source (Ant Design Pro), without breaking down multi-source extraction dimensions; States are grouped into three categories, clearly organized but not as concretely named as Cursor's.

---

### TC-F · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 3/3 | 3/3 | 3/3 |
| Question restraint | 3/3 | 2/3 | **3/3** |
| Brief usability | 3/3 | **3/3** | **3/3** |
| **Total** | **9/9** | **8/9** | **9/9** |
| Existing-component detection | ❌ | ✅ | ✅ |
| Missing project-management detection | ❌ | ✅ | ✅ |
| Boundary-definition ability | ✅ | ✅ | ✅ |
| Extra-conflict detection | ✅ (naming conflict) | ❌ | ❌ |
| Reference breakdown | medium | per-source three (finest) | single-source directional |
| Execution stability | ✅ | ✅ + proactively identifies Brief ambiguity | not tested |

**TC-F conclusion**
With a Figma link, all three reach 3/3 diagnostic accuracy. Cursor is the only agent to proactively identify a Brief ambiguity during execution and pause to ask — going beyond "no overreach" execution stability to the higher level of "proactively protecting Brief integrity". Codex's question-restraint deduction (Q5 execution-layer question) differs from the other two, and its handling of ad-hoc instructions during execution was correct. Claude Code's Brief usability is perfect but its reference-layer depth is slightly weaker than Cursor's.

---

---

### TC-G · DBB × DESIGN.md

**Test date**: pending
**Input**: A data-dashboard product adds a "team collaboration" module (member management / permission config / activity log); the project root already has a DESIGN.md

---

#### Codex · 9/9

**Diagnostic accuracy: 3/3**
Constraints correctly labeled KNOWN, reasoning "DESIGN.md already provides complete tokens, dark canvas, surface tiers, buttons, inputs, status badges, table/card style constraints" — it genuinely read DESIGN.md rather than ignoring it. Goal correctly labeled VAGUE; six-dimension judgment accurate.

**Question restraint: 3/3**
Q3 "is permission config by role, or by member/board/feature module" is the most valuable follow-up — this architectural decision determines the whole permission-config page's design direction. All 5 within the design-constraint domain.

**Brief usability: 3/3**
TC-G core checkpoint passed: the Constraint Layer's first line states "must follow DESIGN.md", with token values read from DESIGN.md as supplements rather than re-entered by the user. The Reference layer uses "the Linear-inspired dark product UI system in DESIGN.md" as the style source. Four quantified success criteria (invite ≤ 2 min / role change ≤ 3 steps / locate log ≤ 30 s / high-risk actions must confirm). Complete States, including edge cases like "the Owner's core permissions cannot be revoked".

---

#### Cursor · 9/9

**Diagnostic accuracy: 3/3**
Constraints labeled VAGUE (more precise than Codex) — recognizing "DESIGN.md is a marketing-page spec, missing backend-application components such as data tables, modals, dropdowns, switches, pagination, form validation; these must be derived from the existing tokens". Codex missed this gap, showing Cursor genuinely understood the file's content rather than merely confirming the file exists.

**Question restraint: 3/3**
Q3 "can backend components be derived from the existing tokens, strictly introducing no new colors or radii" is the only one of the three to recognize DESIGN.md's coverage gap and proactively ask for authorization. Q2 turns the MISSING States into an optional checklist, lowering the user's decision cost.

**Brief usability: 3/3**
Component derivation is its own constraint block, explaining the derivation of table/modal/dropdown/menu one by one, identifying the "DESIGN.md does not define an error red" gap and proposing a handling plan, labeled `[inferred, please confirm]`. Do NOT borrow distinguishes "Linear's in-product backend UI" from "Linear's marketing page", showing it understood DESIGN.md's context. The highest-quality Brief of the three.

---

#### Claude Code · 9/9

**Diagnostic accuracy: 3/3**
Also identified the key gap that DESIGN.md is a marketing-page spec missing backend components. Q3 asks for the layout form of all three pages (member management / permission config / activity log) — the most systematic questioning of the three.

**Question restraint: 3/3**
Q3 confirms the core form of all three pages (table / matrix / table) at once, avoiding rework caused by undefined forms at execution time. Q5's component-derivation authorization is the same in nature as Cursor's Q3. All 5 within the design-constraint domain.

**Brief usability: 3/3**
States presented in a four-column table, clearer than prose. The [inferred] handling is the most honest — it quotes DESIGN.md's "Known Gaps" verbatim, explains that the original spec intentionally has no error color, offers three handling options, and requires the user to decide before confirming. The most transparent gap handling of the three.

---

### TC-G · Three-way comparison

| Dimension | Codex | Cursor | Claude Code |
|-----------|-------|--------|-------------|
| Diagnostic accuracy | 3/3 | 3/3 | 3/3 |
| Question restraint | 3/3 | 3/3 | 3/3 |
| Brief usability | 3/3 | 3/3 | 3/3 |
| **Total** | **9/9** | **9/9** | **9/9** |
| DESIGN.md coverage detection | ✅ tokens complete | ✅ identifies marketing-page gap | ✅ identifies marketing-page gap |
| Component-derivation authorization question | ✅ | ✅ (earliest to identify) | ✅ |
| Error-color gap handling | not mentioned | flagged + plan | quotes Known Gaps + three-way choice |
| Layout-form question | ❌ | ❌ | ✅ Q3 (only one) |
| State presentation | list | prose | table (clearest) |

**TC-G conclusion**
All three perfect at 9/9 — the second all-perfect case after TC-C. With a DESIGN.md present, all three correctly reference it rather than re-writing tokens. The difference is in depth: Cursor was earliest to identify the component-coverage gap, Claude Code handled the error-color gap most transparently, and Codex asked the structural key question of "permission architecture".

---

### TC-H · Mid-flight requirement change

**Test date**: pending
**Input**: A two-stage input — stage one completes the Brief flow normally, stage two injects a new feature requirement (a content-calendar view) during execution

**Core focus**: when the user proposes an out-of-Brief change after the Brief is locked, can DBB refuse to absorb it directly, keep the execution files unchanged, and offer two actionable handling paths.

*Pending*

---

## Prompt-improvement log

| ID | Status | Summary |
|----|--------|---------|
| OPT-002 | ✅ Fixed | Goal misjudgment criterion — a task description ≠ the goal layer |
| OPT-003 | ✅ Fixed | Codex long-text parsing — the prompt must be sent separately |

---

Marker Utron Studio · Design Brief Builder Evaluation Record · Continuously updated
