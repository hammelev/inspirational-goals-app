import { z } from "zod";

// Open Weather schemas
export const OpenWeatherQueryParamsSchema = z.object({
  lat: z.coerce.number(),
  lon: z.coerce.number(),
});

export type OpenWeatherQueryParams = z.infer<
  typeof OpenWeatherQueryParamsSchema
>;

export const OpenWeatherSchema = z.object({
  OPEN_WEATHER_BASE_URL: z.url(),
  OPEN_WEATHER_ENDPOINT_GET_CURRENT_WEATHER: z.string(),
  OPEN_WEATHER_BASE_URL_ICONS: z.url(),
  OPEN_WEATHER_ACCESS_KEY: z.string(),
});

// Quoteable schemas
export const QuoteableQueryParamsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional(),
});

export type QuoteableQueryParams = z.infer<typeof QuoteableQueryParamsSchema>;

export const QuoteableSchema = z.object({
  QUOTEABLE_BASE_URL: z.url(),
  QUOTEABLE_ENDPOINT_GET_RANDOM_QUOTES: z.string(),
});

// Unsplash schemas
export const UnsplashQueryParamsSchema = z.object({
  count: z.coerce.number().min(1).max(30).optional(),
});

export type UnsplashQueryParams = z.infer<typeof UnsplashQueryParamsSchema>;

export const UnsplashSchema = z.object({
  UNSPLASH_BASE_URL: z.url(),
  UNSPLASH_ENDPOINT_GET_RANDOM_IMAGES: z.string(),
  UNSPLASH_ACCESS_KEY: z.string(),
});
