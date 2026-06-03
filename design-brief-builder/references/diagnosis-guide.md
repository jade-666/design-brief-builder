# Diagnosis Guide — 6-Dimension Scoring

Reference for Step 1: detailed scoring criteria for each dimension.

---

## Scoring Rules

Label each dimension: KNOWN / VAGUE / MISSING

- **KNOWN**: Information is explicitly stated and unambiguous. No clarification needed.
- **VAGUE**: Information is implied or partially stated. Clarification would improve output quality.
- **MISSING**: No information available. Must ask before proceeding.

Critical: Extract information from ALL attached materials before labeling anything VAGUE
or MISSING. Photos, screenshots, Figma links, and brand documents contain implicit
information. Read them first.

---

## Dimension 1: Goal

**KNOWN** when: Core user + usage scenario + verifiable success criterion are ALL explicitly stated.

**VAGUE** when: Task is described ("build an admin panel") but success criterion is absent.

**MISSING** when: Only a deliverable is named with no context ("make a dashboard").

⚠️ Common mistake: Treating a task description as a known goal.
"Build a user approval page" describes a deliverable, not a goal.
KNOWN goal example: "Allow operations managers to approve expense reports in bulk,
with audit log, targeting < 2 min per batch."

Questions to ask when MISSING/VAGUE:
- Who specifically uses this page? What is their role?
- What must they be able to accomplish? What does "done" look like?
- Is there a time, click, or error-rate target?

---

## Dimension 2: Structure

**KNOWN** when: A complete page list with all required states is provided or clearly
readable from materials.

**VAGUE** when: Main pages are listed but states (empty/loading/error) are not specified.

**MISSING** when: No page list exists and cannot be inferred from materials.

When reading from prototypes:
- Count unique screens in the prototype
- Identify missing states (prototype often shows only happy path)
- Flag logically required pages not present (e.g. form exists but no success/error state)

---

## Dimension 3: States

**KNOWN** when: All required states are specified for each page.

**VAGUE** when: Some states are shown in prototype but others are clearly absent.

**MISSING** when: States not mentioned at all and prototype shows only happy path.

States checklist for every interactive page:
- [ ] Empty state (no data yet / zero results)
- [ ] Loading state (data fetching)
- [ ] Error state (request failed / validation error)
- [ ] Success state (action completed)
- [ ] Edge cases: very long text, 0 items, 1 item, 1000+ items, special characters

---

## Dimension 4: Constraints

**KNOWN** when: Brand colors, typography, component library, layout rules are explicitly provided.

**VAGUE** when: "Match existing style" or "follow brand guidelines" without specifics.

**MISSING** when: No design system, component library, or brand constraints mentioned.

Extract from materials:
- Screenshots: note existing color palette, typography, component patterns
- Brand docs: extract hex values, font names, logo rules
- Flag violations in existing prototype (colors not matching brand, inconsistent components)

Critical constraint types to always identify:
- Primary and secondary brand colors (hex values)
- Forbidden colors
- Typography (font family, weights)
- Component library source (if any)
- Grid/layout system
- What is explicitly forbidden

---

## Dimension 5: Priority

**KNOWN** when: A clear priority rule is stated for when constraints conflict.

**VAGUE** when: Multiple goals listed without a tiebreaker.

**MISSING** when: No priority rule exists.

Standard priority rules to suggest when missing:
- B-end systems: "Flow clarity > visual polish when they conflict"
- C-end products: "Visual polish > information density when they conflict"
- Data-heavy tools: "Information completeness > visual simplicity"

---

## Dimension 6: Audience

**KNOWN** when: User role, background, device, usage frequency are all specified.

**VAGUE** when: User type mentioned ("internal users") but expertise and context are not.

**MISSING** when: No user information provided.

Extract from materials:
- B-end prototypes imply professional users, desktop-first, high frequency
- C-end prototypes imply varied expertise, mobile consideration
- Brand docs may specify target market

---

## Question Budget

Maximum 5 questions. Prioritize by impact:
1. Missing Goal information (blocks everything downstream)
2. Missing Constraints (causes brand violations)
3. Vague Structure (causes scope creep)
4. Missing Priority rule (causes conflicting outputs)
5. Vague Audience (affects density and complexity decisions)

Only ask about design constraints.
Do NOT ask about: technical delivery format, whether output is prototype or production code,
Figma operation permissions, or any execution-layer decisions.
Do not ask about information already visible in attached materials.
