import { readMissions } from "../apps/api/src/mission-store.js";

const missions = await readMissions();
console.info(`Validated ${missions.length} mission record(s).`);
