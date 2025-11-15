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
  OPEN_WEATHER_ACCESS_KEY: z.string().min(1),
});

// Quotable schemas
export const QuotableQueryParamsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional(),
});

export type QuotableQueryParams = z.infer<typeof QuotableQueryParamsSchema>;

export const QuotableSchema = z.object({
  QUOTABLE_BASE_URL: z.url(),
  QUOTABLE_ENDPOINT_GET_RANDOM_QUOTES: z.string(),
});

// Unsplash schemas
export const UnsplashQueryParamsSchema = z.object({
  count: z.coerce.number().min(1).max(30).optional(),
});

export type UnsplashQueryParams = z.infer<typeof UnsplashQueryParamsSchema>;

export const UnsplashSchema = z.object({
  UNSPLASH_ACCESS_KEY: z.string().min(1),
  UNSPLASH_APP_NAME: z.string().min(1),
  UNSPLASH_BASE_URL: z.url(),
  UNSPLASH_ENDPOINT_GET_RANDOM_IMAGES: z.string(),
  UNSPLASH_WEBSITE_URL: z.url(),
});
