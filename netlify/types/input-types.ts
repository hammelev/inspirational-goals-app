import { z } from "zod";

export const QuoteableQueryParamsSchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).optional(),
  })
  .strict();

export type QuoteableQueryParams = z.infer<typeof QuoteableQueryParamsSchema>;

export const QuoteableSchema = z.object({
  QUOTEABLE_BASE_URL: z.url(),
  QUOTEABLE_GET_RANDOM_QUOTES_ENDPOINT: z.string(),
});
