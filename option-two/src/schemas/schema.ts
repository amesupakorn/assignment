import { z } from "zod";

export const summarySchema = z.record(
  z.string(),
  z.object({
    male: z.number(),
    female: z.number(),
    ageRange: z.string().regex(/^\d{2}-\d{2}$/),
    hair: z.record(z.string(), z.number()),
    addressUser: z.record(z.string(), z.string()),
  })
);