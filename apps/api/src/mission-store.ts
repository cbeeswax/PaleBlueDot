import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { missionSchema, type Mission } from "./schemas.js";

const missionDirectory = path.resolve(process.cwd(), "data", "missions");

export async function readMissions(): Promise<Mission[]> {
  const fileNames = (await readdir(missionDirectory)).filter((fileName) => fileName.endsWith(".json"));
  return Promise.all(fileNames.map(async (fileName) => {
    const content = await readFile(path.join(missionDirectory, fileName), "utf8");
    return missionSchema.parse(JSON.parse(content));
  }));
}

export async function readMission(id: string): Promise<Mission | undefined> {
  return (await readMissions()).find((mission) => mission.id === id);
}
