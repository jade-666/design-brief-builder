# Design Brief — 4-Layer Template

Reference for Step 2 of the Design Brief Builder process.

---

## Full Template

## DESIGN BRIEF

### Goal Layer (Why)
- Page task:        [One sentence — what must users accomplish on this page?]
- Core user:        [Role + scenario. e.g. "Operations manager reviewing daily batch submissions"]
- Success criteria: [Verifiable result. e.g. "User can approve/reject all items in < 3 clicks"]

### Structure Layer (What)
- Page list:        [All pages identified, in logical order]
- Required states:  [Per page: empty / loading / error / success / edge cases]
- Missing pages:    [Pages not in prototype but logically required — be proactive]

### Constraint Layer (How)
- Brand constraints:           [Colors, logo rules, typography — extract exact values from materials]
- Layout constraints:          [Grid, breakpoints, density]
- Operation order constraints: [Mandatory step sequences for irreversible actions]
- Forbidden items:             [What Agent must NEVER do — be specific, not descriptive]
- Priority rule:               [Single tiebreaker rule when constraints conflict]

### Reference Layer (Like what)
- Style reference:      [URL or product name]
- Extraction dimension: [Pick ONE only: spacing / color / typography / density / layout structure]
- Do NOT borrow:        [Explicitly exclude elements that don't fit this project]

---

## Field Guidance

### Goal Layer
- Page task must be action-oriented. "Display user data" is weak. "Allow managers to
  approve expense reports with full audit trail" is strong.
- Success criteria MUST contain at least one measurable metric: time, clicks, error rate,
  or completion rate. A criterion with no number is not acceptable.
  - ❌ "User reaches a decision without confusion" (no number — reject)
  - ✅ "User reaches a CTA decision in ≤ 30s on first scroll"
  - If the request mentions a figure like "judge in 30 seconds", lift it into the success
    criterion as a testable target — do not leave it buried in the page task.

### Structure Layer
- List every page including states — empty states and error states are pages.
- Missing pages: if prototype shows a submit button but no success/failure state, flag those.

### Constraint Layer
- Forbidden items are more important than positive constraints.
  Examples of specific forbidden items:
  - "Do not create any component not already in the design system"
  - "Do not use absolute positioning"
  - "Do not skip empty states"
  - "Do not use colors outside the brand token set"
- Operation order constraints: for B-end systems with irreversible actions, state the exact
  step sequence explicitly.
- Priority rule: must be a single tiebreaker, not a list of goals.

### Reference Layer
- Pick ONE extraction dimension per reference. "Borrow everything" produces inconsistent output.
- Do NOT borrow: prevents style contamination from the reference source.

---

## Common Mistakes

| Mistake | Better approach |
|---------|----------------|
| "Make it look clean" | "Max 4 data points per card, 16px minimum touch target" |
| "Match the brand" | List specific hex codes, font names, forbidden colors |
| "Like [App X]" | "Borrow [App X]'s card spacing — do NOT borrow its color palette" |
| Only listing happy-path pages | Include empty, loading, error states for every interactive page |
| Vague forbidden items | "No floating action buttons", "No sidebar navigation" |
| Leaving Reference Layer blank when material is missing | Infer from text description, mark "[inferred — please confirm]" |
