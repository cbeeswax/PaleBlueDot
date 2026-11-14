import "dotenv/config";
import { existsSync } from "node:fs";
import path from "node:path";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { analyticsEventSchema } from "./schemas.js";
import { appendEvent, readEvents } from "./analytics-store.js";
import { readMission, readMissions } from "./mission-store.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const dataDirectory = process.env.DATA_DIR ?? "./storage";
const adminToken = process.env.ADMIN_TOKEN;
const webDirectory = path.resolve(process.cwd(), "dist", "web");

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(",") ?? false }));
app.use(express.json({ limit: "8kb" }));

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (!adminToken) return response.status(503).json({ error: "Administrator access is not configured." });
  if (request.get("authorization") !== `Bearer ${adminToken}`) return response.status(401).json({ error: "Unauthorized." });
  next();
}

app.get("/api/v1/health", (_request, response) => response.json({ status: "ok" }));
app.get("/api/v1/missions", async (_request, response, next) => {
  try {
    const missions = await readMissions();
    response.json(missions.map(({ activities, sections, timeline, facts, sources, ...summary }) => summary));
  } catch (error) { next(error); }
});
app.get("/api/v1/missions/:id", async (request, response, next) => {
  try {
    const mission = await readMission(request.params.id);
    if (!mission) return response.status(404).json({ error: "Mission not found." });
    response.json(mission);
  } catch (error) { next(error); }
});
app.get("/api/v1/missions/:id/facts", async (request, response, next) => {
  try {
    const mission = await readMission(request.params.id);
    if (!mission) return response.status(404).json({ error: "Mission not found." });
    response.json(mission.facts);
  } catch (error) { next(error); }
});

app.post("/api/v1/analytics/events", rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false }), async (request, response, next) => {
  const event = analyticsEventSchema.safeParse(request.body);
  if (!event.success) return response.status(400).json({ error: "Invalid analytics event." });
  try {
    await appendEvent(dataDirectory, event.data);
    response.status(202).json({ accepted: true });
  } catch (error) { next(error); }
});

app.get("/api/v1/admin/summary", requireAdmin, async (_request, response, next) => {
  try {
    const events = await readEvents(dataDirectory);
    const pageViews = events.filter((event) => event.type === "page_view");
    const activitiesCompleted = events.filter((event) => event.type === "activity_completed");
    response.json({
      lastUpdated: new Date().toISOString(),
      pageViews: pageViews.length,
      estimatedSessions: new Set(events.flatMap((event) => event.sessionId ? [event.sessionId] : [])).size,
      activitiesCompleted: activitiesCompleted.length,
      popularPages: Object.entries(pageViews.reduce<Record<string, number>>((pages, event) => ({ ...pages, [event.path]: (pages[event.path] ?? 0) + 1 }), {})).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count),
      activityCompletions: Object.entries(activitiesCompleted.reduce<Record<string, number>>((items, event) => ({ ...items, [event.resourceId ?? "unknown"]: (items[event.resourceId ?? "unknown"] ?? 0) + 1 }), {})).map(([id, count]) => ({ id, count })).sort((a, b) => b.count - a.count)
    });
  } catch (error) { next(error); }
});

if (existsSync(webDirectory)) {
  app.use(express.static(webDirectory));
  app.get("/{*splat}", (_request, response) => response.sendFile(path.join(webDirectory, "index.html")));
}

app.use((_request, response) => response.status(404).json({ error: "Not found." }));
app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(JSON.stringify({ level: "error", message: "Request failed", error: error instanceof Error ? error.message : "unknown" }));
  response.status(500).json({ error: "The service is temporarily unavailable." });
});

app.listen(port, () => console.info(JSON.stringify({ level: "info", message: "BeyondSignal API started", port })));
