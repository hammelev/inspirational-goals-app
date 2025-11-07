import { z } from "zod";

export const QuoteableQueryParamsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional(),
});

export type QuoteableQueryParams = z.infer<typeof QuoteableQueryParamsSchema>;

export const QuoteableSchema = z.object({
  QUOTEABLE_BASE_URL: z.url(),
  QUOTEABLE_ENDPOINT_GET_RANDOM_QUOTES: z.string(),
});

export const UnsplashQueryParamsSchema = z.object({
  count: z.coerce.number().min(1).max(30).optional(),
});

export type UnsplashQueryParams = z.infer<typeof UnsplashQueryParamsSchema>;

export const UnsplashSchema = z.object({
  UNSPLASH_BASE_URL: z.url(),
  UNSPLASH_ENDPOINT_GET_RANDOM_IMAGES: z.string(),
  UNSPLASH_ACCESS_KEY: z.string(),
});
