# Voyager 1 — Daibik's Space App

> **BeyondSignal** — a living, independent archive of humanity's space missions, starting with **Voyager 1**.
> Built to help children (ages 6–8), families, and educators explore the spacecraft's journey, its discoveries,
> how it still whispers to Earth from interstellar space, and the story of the Golden Record.

<p>
  <img alt="CI" src="https://github.com/cbeeswax/Voyager1-Daibik-Space-App/actions/workflows/ci.yml/badge.svg" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  <img alt="Node 22+" src="https://img.shields.io/badge/Node-22%2B-5FA04E.svg" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6.svg" />
</p>

> _Not affiliated with NASA or JPL. An independent educational project._

---

## What it is

BeyondSignal preserves the stories of spacecraft and makes them explorable. The first featured mission is
**Voyager 1** — one of the farthest-travelling objects humans have ever made. Visitors can:

- 🛰️ **Explore the mission** — a structured archive of facts, images, and sourced references.
- 🕰️ **Follow the timeline** — the key milestones of the journey, from launch to interstellar space.
- 📡 **Understand the signal** — how Voyager 1 still communicates across billions of kilometres.
- 💿 **Discover the Golden Record** — the message humanity sent to the stars.
- 📊 **Anonymous analytics** — privacy-first visitor counts, with no personal data.
- 🔒 **Admin dashboard** — a protected area for curators.

## Tech stack

| Layer | Technology |
| --- | --- |
| Web app | React 19 + Vite 6 + TypeScript |
| API | Express 5 + TypeScript (`tsx`) |
| Validation | Zod |
| Security | Helmet, CORS, rate limiting |
| Storage | File-based (no database server) |
| Tests | Vitest |

## Quick start

Requires **Node.js 22+**.

```sh
npm install
cp .env.example .env     # then set a strong ADMIN_TOKEN
npm run dev
```

- Web app → <http://localhost:5173>
- API → <http://localhost:3000>

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the web app and API together |
| `npm run build` | Type-check and build the web app |
| `npm test` | Run unit tests (Vitest) |
| `npm run validate:missions` | Validate every mission JSON record against its schema |
| `npm run format` | Format the codebase with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project structure

```
.
├── apps/
│   ├── web/            # React + Vite front-end
│   │   └── src/
│   └── api/            # Express API + Zod schemas and stores
│       └── src/
├── data/missions/      # Curated, schema-validated mission records (e.g. voyager-1.json)
├── public/images/      # Static image assets
├── scripts/            # Tooling (mission validation)
├── docs/               # ARCHITECTURE.md, PRIVACY.md
└── Spec.md             # Full project specification
```

## Content, privacy & storage

- Curated mission records live in [`data/missions/`](data/missions/) and are validated with Zod.
- Analytics are **append-only, anonymous** JSONL — only an event type, timestamp, page/resource id, a coarse
  device category, and an optional random session id. **Never** IP addresses, full user agents, precise
  location, or user-entered content. See [`docs/PRIVACY.md`](docs/PRIVACY.md).
- In production, point `DATA_DIR` at a protected location **outside** the repository and web root, and back it up.

## Deployment

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Run under a non-root service account, keep `DATA_DIR`
outside the app directory and non-public, and verify the reverse proxy, TLS, process manager, permissions, and
backups before the first release. Health check: `GET /api/v1/health`.

## Credits

Created by **Daibik**. Mission facts and media are drawn from public sources (e.g. NASA/JPL) and credited within
each record; this project is independent and not affiliated with those organisations.

## License

[MIT](LICENSE).
