import { z } from "zod";

const sourceIdList = z.array(z.string().min(1)).min(1);

export const missionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.string().min(1),
  agency: z.string().min(1),
  launchDate: z.string().date(),
  summary: z.string().min(1),
  status: z.object({
    label: z.string().min(1),
    lastVerified: z.string().date().nullable(),
    sourceIds: sourceIdList
  }),
  sections: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    text: z.string().min(1),
    sourceIds: sourceIdList
  })),
  timeline: z.array(z.object({
    id: z.string().min(1),
    date: z.string().min(4),
    title: z.string().min(1),
    description: z.string().min(1),
    sourceIds: sourceIdList
  })),
  facts: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    text: z.string().min(1),
    sourceIds: sourceIdList
  })),
  activities: z.array(z.object({
    id: z.string().min(1),
    type: z.enum(["multiple-choice", "ordering"]),
    title: z.string().min(1),
    description: z.string().min(1),
    objective: z.string().min(1),
    question: z.string().min(1),
    answers: z.array(z.string().min(1)).min(2),
    correctAnswer: z.string().min(1),
    hint: z.string().min(1),
    explanation: z.string().min(1),
    successMessage: z.string().min(1),
    sourceIds: sourceIdList
  })),
  images: z.array(z.object({
    id: z.string().min(1),
    src: z.string().url().or(z.string().startsWith("/")),
    alt: z.string().min(1),
    caption: z.string().min(1),
    credit: z.string().min(1),
    sourceId: z.string().min(1)
  })).min(1),
  sources: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    publisher: z.string().min(1),
    url: z.string().url(),
    accessedDate: z.string().date().nullable()
  })).min(1),
  lastUpdated: z.string().date().nullable()
}).superRefine((mission, context) => {
  const sourceIds = new Set(mission.sources.map((source) => source.id));
  const references = [
    ...mission.status.sourceIds,
    ...mission.sections.flatMap((section) => section.sourceIds),
    ...mission.timeline.flatMap((item) => item.sourceIds),
    ...mission.facts.flatMap((fact) => fact.sourceIds),
    ...mission.activities.flatMap((activity) => activity.sourceIds)
    , ...mission.images.map((image) => image.sourceId)
  ];
  references.forEach((sourceId) => {
    if (!sourceIds.has(sourceId)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Unknown source ID: ${sourceId}` });
    }
  });
  mission.activities.forEach((activity) => {
    if (!activity.answers.includes(activity.correctAnswer)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Activity ${activity.id} has no matching correct answer` });
    }
  });
});

export const analyticsEventSchema = z.object({
  type: z.enum(["page_view", "activity_started", "activity_completed"]),
  path: z.string().startsWith("/").max(200),
  resourceId: z.string().max(100).regex(/^[a-z0-9-]+$/).optional(),
  referrerDomain: z.string().max(253).regex(/^[a-z0-9.-]+$/).optional(),
  campaign: z.string().max(100).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  deviceCategory: z.enum(["mobile", "tablet", "desktop", "unknown"]),
  sessionId: z.string().uuid().optional()
}).strict();

export type Mission = z.infer<typeof missionSchema>;
export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
