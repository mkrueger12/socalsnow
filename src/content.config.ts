import { defineCollection, z } from "astro:content";

const summaries = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    mountainRanges: z.array(z.string()).optional(),
    dangerByRange: z
      .array(
        z.object({
          range: z.string(),
          level: z.string()
        })
      )
      .optional(),
    problems: z.array(z.string()).default([])
  })
});

const observations = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    email: z.string().email().optional(),
    location: z.string(),
    mountainRange: z.string().optional(),
    status: z.enum(["approved", "pending"]).default("approved"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    elevation: z.number().optional(),
    elevationFt: z.number().optional(),
    aspect: z.string(),
    excerpt: z.string(),
    narrative: z.string().optional(),
    photos: z.array(z.string()).optional(),
    snowpit: z
      .object({
        depthCm: z.number(),
        newSnowCm: z.number(),
        test: z.string(),
        result: z.string()
      })
      .optional(),
    snowpitData: z.string().optional(),
    stabilityTests: z.string().optional()
  })
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    registrationUrl: z.string().url(),
    summary: z.string().optional(),
    excerpt: z.string().optional()
  })
});

const team = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string().optional(),
    photo: z.string().optional(),
    sortOrder: z.number().optional()
  })
});

export const collections = { summaries, observations, events, team };
