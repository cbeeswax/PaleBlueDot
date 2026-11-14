import { describe, expect, it } from "vitest";
import voyager from "../../../data/missions/voyager-1.json" with { type: "json" };
import { analyticsEventSchema, missionSchema } from "./schemas.js";

describe("mission schema", () => {
  it("accepts the sourced Voyager 1 record", () => {
    expect(missionSchema.safeParse(voyager).success).toBe(true);
  });

  it("rejects an activity whose answer is not offered", () => {
    const invalid = structuredClone(voyager);
    invalid.activities[0].correctAnswer = "Not an answer";
    expect(missionSchema.safeParse(invalid).success).toBe(false);
  });
});

describe("analytics event schema", () => {
  it("allows a privacy-safe page view", () => {
    expect(analyticsEventSchema.safeParse({ type: "page_view", path: "/", deviceCategory: "desktop" }).success).toBe(true);
  });

  it("rejects unexpected fields", () => {
    expect(analyticsEventSchema.safeParse({ type: "page_view", path: "/", deviceCategory: "desktop", ip: "127.0.0.1" }).success).toBe(false);
  });
});
