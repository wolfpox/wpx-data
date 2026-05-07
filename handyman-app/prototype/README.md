# Prototype

A lo-fi clickable mockup for examining the catalog flow and per-item layout.
Throwaway code — not the real app.

## How to use

Open `index.html` in any modern browser. No server, no install, no build step
required.

The page renders a phone-shaped frame (375px) on a desktop background so the
mobile feel is clear.

## What's wired up

- **Catalog tab** — grid of catalog items, click any to open it
- **Per-item page** — name, tags, photo placeholders, mocked note feed,
  compact reminders/to-dos line, expandable Suggestions section populated
  from the real rules JSON
- **Suggestions section** — present on both catalog and item views; cycling
  preview line; tap to expand
- **+** floating button — opens the 5-option menu (Note, Item, Task, Quick
  capture, Property or Space). Buttons close the sheet.
- **To-do** and **Timeline** tabs are placeholders.

## What's intentionally fake

- Photos: grey placeholder boxes
- Note feed entries: hardcoded mock text
- Reminders / to-dos: a single counter line, not a list
- Property switcher: shows "My Home", does nothing
- Inferred items in the home Suggestions: hand-written for the demo

## Files

- `index.html` — entry point, single page
- `styles.css` — all visual styles
- `app.js` — view rendering and interactions
- `data.js` — generated from `../rules/types/*.json` (do not edit by hand)
- `build.js` — Node script that regenerates `data.js`

## Updating data

If you edit any `rules/types/*.json` file and want the prototype to reflect
the change:

```
node build.js
```

Then refresh the browser. (Node is the only dependency; no npm install needed.)
