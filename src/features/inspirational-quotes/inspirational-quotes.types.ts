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

export interface InspirationalQuotesSliceStateType {
  quotes: QuoteableQuoteType[];
  currentQuoteIndex: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}
