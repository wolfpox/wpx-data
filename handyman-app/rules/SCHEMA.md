# Catalog item type schema

Each catalog item type lives in its own JSON file at `rules/types/<id>.json`.
The `id` is the canonical slug — lowercase, hyphenated.

## Why one file per type

- Easy to author and review one at a time
- Clean version-control diffs when content evolves
- LLM-friendly: a model can generate or revise a single type without the
  context cost of the whole library

## Shape (canonical example)

```json
{
  "id": "gutter",
  "name": "Gutter",
  "category": "Roof and Drainage",
  "synonyms": ["eavestrough", "rain gutter"],
  "placeholder_art": "gutter.svg",
  "summary": "Channels rainwater off the roof and away from the foundation.",
  "education": "Why this matters in 2-4 plain sentences. Note common failure modes.",
  "questions": [
    {"id": "material", "prompt": "What material?", "type": "choice",
     "options": ["aluminum", "vinyl", "copper", "steel", "other"]}
  ],
  "suggested_photos": [
    {"id": "full_length", "prompt": "Full length from the ground"}
  ],
  "maintenance": [
    {
      "action": "Clean debris",
      "cadence": {"frequency": "twice_yearly",
                  "preferred_seasons": ["spring", "fall"]},
      "cadence_text": "Twice a year, spring and fall",
      "why": "Prevents overflow that damages foundations and ice dams in winter."
    }
  ],
  "related_types": ["downspout", "fascia", "soffit"]
}
```

## Field reference

| Field              | Type              | Required | Notes |
|--------------------|-------------------|----------|-------|
| `id`               | string            | yes      | slug, lowercase, hyphens only |
| `name`             | string            | yes      | display name, title case |
| `category`         | string            | yes      | one of the categories below |
| `synonyms`         | string[]          | no       | alternate names users might search for |
| `placeholder_art`  | string            | no       | filename in `rules/art/` (TBD) |
| `summary`          | string            | yes      | one-line description for catalog listings |
| `education`        | string            | yes      | 2-4 sentences: why it matters, common failures |
| `questions`        | Question[]        | yes      | see Question types |
| `suggested_photos` | Photo[]           | yes      | `id` + `prompt` |
| `maintenance`      | MaintenanceItem[] | yes      | see Maintenance entry |
| `related_types`    | string[]          | no       | ids of types likely owned by the same user |

## Question types

```json
{"id": "<slug>", "prompt": "<question>", "type": "<type>",  "options": [...]}
```

| `type`         | `options` required? | Notes                                 |
|----------------|---------------------|---------------------------------------|
| `free_text`    | no                  | open-ended                            |
| `choice`       | yes                 | one of the listed options             |
| `multi_choice` | yes                 | any subset of the listed options      |
| `yes_no`       | no                  | boolean                               |
| `date`         | no                  | calendar date                         |

## Maintenance entry

```json
{
  "action": "Short imperative — what to do",
  "cadence": {
    "frequency": "<frequency-bucket>",
    "preferred_seasons": ["spring" | "summer" | "fall" | "winter"]
  },
  "cadence_text": "Human-readable version, e.g. 'Twice a year, spring and fall'",
  "why": "1-2 sentences explaining the consequence of skipping"
}
```

### Frequency buckets

`monthly`, `quarterly`, `twice_yearly`, `yearly`, `every_2_years`,
`every_5_years`, `every_10_years`, `as_needed`

`preferred_seasons` is optional and only meaningful for cadences that repeat
on a season-aligned schedule.

## Categories (initial set)

- Exterior
- Roof and Drainage
- Plumbing
- HVAC
- Electrical
- Appliances
- Structural and Interior
- Safety and Detection
- Outdoor and Yard

## Voice and tone

- Neutral, helpful, never alarmist. Avoid "must" and "never".
- `education` answers "why does this thing matter at all?"
- `why` on a maintenance entry answers "what happens if I skip this?" —
  prefer a concrete consequence over a vague warning.
- Plain language. If a term of art is necessary, briefly gloss it.
- Synonyms: include common regionalisms (e.g. eavestrough for gutter).
