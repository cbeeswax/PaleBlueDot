# Architecture

The browser loads the React/Vite application. It reads public mission records through the Express API at `/api/v1`. Curated records are JSON files under `data/missions`; Zod validates them when they are read and through `npm run validate:missions`.

The API persists allowed analytics events as serialized JSON Lines files under `${DATA_DIR}/analytics`. Writes are chained in process to prevent interleaved records. Generated operational data is deliberately outside the repository, deployment release, and public static directory.

The admin summary endpoint requires an `Authorization: Bearer <ADMIN_TOKEN>` header on every request. The token is supplied through the environment and is never checked into source control.
