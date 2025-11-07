import { z } from "zod";

export const QuoteableQuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  authorSlug: z.string(),
  length: z.number(),
  tags: z.array(z.string()),
});

export type QuoteableQuoteType = z.infer<typeof QuoteableQuoteSchema>;

export const UnsplashImageSchema = z.object({
  urls: z.object({
    regular: z.string(),
  }),
  alt_description: z.string(),
});

export type UnsplashImageType = z.infer<typeof UnsplashImageSchema>;
