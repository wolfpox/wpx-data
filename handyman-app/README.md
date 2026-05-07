# handyman-app

A photo-driven personal property log. Users upload or capture photos, tag them,
answer a few quick questions, and the app provides maintenance suggestions and
reminders via push notification.

## Core principles

- The app makes no assumptions about the user's property type
- Photos may be uploaded from the device library or taken in-app
- The app does not validate or interpret photo contents
- All user data stays on the device
- Maintenance suggestions come from a pre-packaged rules library
- Reminders are user-driven and/or generated from accepted schedules

## Status

Early design. Workflow and data model are being captured in
[`DESIGN.md`](./DESIGN.md). Tech stack is intentionally deferred.

## Layout

- [`DESIGN.md`](./DESIGN.md) — design notes and decisions
- [`rules/`](./rules) — JSON library of maintenance rules (schema and 10 starter types)
