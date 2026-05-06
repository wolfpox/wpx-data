# handyman-app design

A photo-driven personal property log. Helps users document, maintain, and
feel proud of the things they own — without making assumptions about what
those things are.

## Vision

Turn maintenance into a source of pride. The app behaves like a quiet
advisor: always present with gentle suggestions, never demanding, never
judgmental. Beginners and advanced users see the same surface; depth is
opt-in via a universal Suggestions section.

## Core principles

- **No assumptions about property type.** The app accumulates data naturally
  as the user logs.
- **Privacy by default.** All user data stays on-device.
- **Everything is optional.** Photos, tags, structure, catalog types. A user
  can capture a single text note and stop there.
- **Photos may come from anywhere.** Camera, library, or none at all.
  Placeholder art lets users visually identify items without a photo.
- **The user always controls reminders.** Generic suggestions come from the
  rules library; the user chooses what becomes a reminder.
- **Equal footing.** Beginners and power users see the same UI. The
  Suggestions section is the invitation to engage with depth.

## Data model (working sketch)

- **User** owns multiple **Properties** (homes, rentals, businesses).
  Landlords, business owners, etc. can manage several at once.
- **Property** has a name + its own list of Spaces and Items.
- **Space** is a flat list per property. Outdoor included. No nesting —
  one level only, to discourage over-organizing.
- **Item** belongs to one Property and (optionally) one Space. Carries:
  - A **name** (free text). Cycling light-color placeholder examples like
    "old junk faucet", "downstairs SW bathroom fan", "Gary's moldy carpet"
    reinforce that there is no correct way to document.
  - A **free-text note** field with the same kind of cycling placeholders.
  - An optional **catalog type** (gutter, furnace, etc.) or fully custom.
  - A **note feed** (see below).
  - Optional linked to-dos and reminders.
- **Note** = a feed entry on an item. Auto-dated. Carries any combination of:
  text, one or more photos, tags. Photo-only is valid; text-only is valid.
  Everything is a note that can have a photo.
- **Task / to-do** = optional, can stand alone or attach to an item. Task-type
  tags include: clean, organize, contact a pro, fix, research.
- **Reminder** = user-controlled. May come from an accepted maintenance
  suggestion, or be created freely.

## Catalog item type (rules library entry)

Each built-in item type carries:

```
Item type: "Gutter"
├─ Category: Exterior
├─ Synonyms: ["eavestrough", "rain gutter"]
├─ Placeholder art: gutter.svg
├─ Suggested questions: [material? trees overhead? last cleaned?]
├─ Suggested photos: [full length, downspout connection,
│                    visible damage, brand/manufacturer plate]
├─ Maintenance suggestions: [
│    {action: "Clean", cadence: "twice/yr (spring, fall)",
│     why: "prevents ice dams + foundation water damage"},
│    {action: "Inspect for sag/separation", cadence: "annually"}]
├─ Educational notes: short paragraph (why it matters, common failures)
└─ Likely-related types: [downspout, fascia, soffit]
```

User-created custom types use the same shape; most fields are optional.

## Main views

Three primary views. Catalog is primary.

1. **Catalog and notes** — home of the app. Browse items by space, type,
   or recency. Search the built-in catalog when adding.
2. **To-do and reminders** — task lists, with optional links back to items.
3. **Timeline** — historical and forward-looking review of activity, due
   dates, seasonal prompts.

## The Suggestions section

A universal pattern — every page has a Suggestions section at the bottom.

- Always visible
- Shows a cycling preview line of one suggestion at a time
- Expands on tap to reveal the full set
- Quiet, encouraging, never demanding

Content varies by view:

| View         | What Suggestions offers                                                                  |
|--------------|------------------------------------------------------------------------------------------|
| Home/catalog | Inferred items, common things not yet catalogued, spaces to add, lopsided coverage hints |
| Per-item     | Photo checklist, unanswered questions, related items, maintenance cadence, why it matters |
| To-do        | Task-tag suggestions, items to attach                                                    |
| Timeline     | Overdue items, seasonal prompts, retrospectives ("you finished 3 things this month")     |

## Per-item page

```
[ Item name ]
[ Space · category · custom tags ]
──────────────────────────────────
[ Photos: horizontal scroll, optional ]
──────────────────────────────────
Note feed (compact, newest first):
  · May 3 — "replaced gasket, drip stopped"  [+photo]
  · Apr 12 — [photo] "spotted this corrosion"
  · Mar 1 — "first time noting this"
  [+ Add note]
──────────────────────────────────
Active to-dos · Reminders   (compact)
──────────────────────────────────
▼ Suggestions  (cycling preview, tap to expand)
```

## The "+" button menu

The big "+" on the home screen opens a menu:

- **Note** — quick text/photo entry, optionally attached to an item
- **Item** — start a new item (with or without a catalog type)
- **Task** — to-do, optionally attached to an item
- **Quick capture** — photo + text, decide later what it is
- **Property or Space** — manage properties and spaces

## Add flows

Users may add items in any rhythm:

- **Rapid mode**: scroll catalog, tap-tap-tap to add 30+ items with no
  detail, then circle back over time.
- **Depth mode**: pick one item, work through Suggestions to fully document
  it before moving on.

Both modes share the same data path; depth is just engagement with the
Suggestions panel.

## Discovery loop

To drive return engagement, the app gently surfaces what the user hasn't
catalogued yet. Two flavors:

- **Inferred** (always on): "You added a furnace — want to add a thermostat?"
  Stays true to no-assumption principle because it's grounded in what the
  user actually has.
- **Common items spot-check** (opt-in): a checklist users can browse to
  fill in obvious gaps.

Dismissals are remembered so the app doesn't pester.

## Photo prompts

Catalog item types can suggest photos that pay off later: brand/model plates,
serial numbers, key features, condition shots. These appear in the per-item
Suggestions section as a checklist.

## Educational layer

Each catalog item type carries a short "why this matters" note and common
failure modes. Surfaced via the per-item Suggestions section. Optional to
read.

## Open questions (deliberately deferred)

- Tech stack (mobile framework, storage layer)
- Rules library file format and schema details
- Source of cycling placeholder examples (curated? per-type?)
- Push notification UX (one-shot, digest, configurable?)
- Multi-user / shared property scenarios (couples co-managing a home, etc.)
