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
export const QuotableQuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  authorSlug: z.string(),
  length: z.number(),
  tags: z.array(z.string()),
});

export type QuotableQuoteType = z.infer<typeof QuotableQuoteSchema>;

// Unsplash API
export const UnsplashImageSchema = z.object({
  alt_description: z.string().optional(),
  user: z.object({
    links: z.object({
      html: z.url(),
    }),
    name: z.string(),
  }),
  urls: z.object({
    regular: z.url(),
  }),
});

export type UnsplashImageType = z.infer<typeof UnsplashImageSchema>;

export const ImageSchema = UnsplashImageSchema.extend({
  provider: z.object({
    name: z.string(),
    link: z.url(),
  }),
});

export type ImageType = z.infer<typeof ImageSchema>;
