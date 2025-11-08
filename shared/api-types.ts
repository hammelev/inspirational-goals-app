import { z } from "zod";

// Open Weather API
export const OpenWeatherCurrentWeatherSchema = z.object({
  weather: z
    .array(
      z.object({
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    )
    .nonempty(),
  main: z.object({
    temp: z.number().transform((value) => Math.round(value)),
    feels_like: z.number().transform((value) => Math.round(value)),
  }),
  name: z.string(),
});

export type OpenWeatherCurrentWeatherType = z.infer<
  typeof OpenWeatherCurrentWeatherSchema
>;

// Quotable API
export const QuoteableQuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  authorSlug: z.string(),
  length: z.number(),
  tags: z.array(z.string()),
});

export type QuoteableQuoteType = z.infer<typeof QuoteableQuoteSchema>;

// Unsplash API
export const UnsplashImageSchema = z.object({
  urls: z.object({
    regular: z.string(),
  }),
  alt_description: z.string(),
});

export type UnsplashImageType = z.infer<typeof UnsplashImageSchema>;
