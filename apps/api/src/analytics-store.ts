import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { AnalyticsEventInput } from "./schemas.js";

export type StoredEvent = AnalyticsEventInput & { eventId: string; timestamp: string };
let writeQueue = Promise.resolve();

function dailyFile(dataDirectory: string, date = new Date()) {
  return path.join(dataDirectory, "analytics", `${date.toISOString().slice(0, 10)}.jsonl`);
}

export async function appendEvent(dataDirectory: string, event: AnalyticsEventInput): Promise<void> {
  const storedEvent: StoredEvent = { ...event, eventId: randomUUID(), timestamp: new Date().toISOString() };
  const write = async () => {
    const file = dailyFile(dataDirectory);
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, `${JSON.stringify(storedEvent)}\n`, { encoding: "utf8", mode: 0o600 });
  };
  const result = writeQueue.then(write);
  writeQueue = result.catch(() => undefined);
  return result;
}

export async function readEvents(dataDirectory: string): Promise<StoredEvent[]> {
  const directory = path.join(dataDirectory, "analytics");
  try {
    const files = (await import("node:fs/promises")).readdir(directory);
    const records = await Promise.all((await files).filter((name) => name.endsWith(".jsonl")).map(async (name) => {
      const contents = await readFile(path.join(directory, name), "utf8");
      return contents.split("\n").filter(Boolean).flatMap((line) => {
        try { return [JSON.parse(line) as StoredEvent]; } catch { return []; }
      });
    }));
    return records.flat();
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}
