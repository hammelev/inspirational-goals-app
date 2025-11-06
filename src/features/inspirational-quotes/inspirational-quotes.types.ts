import { type QuoteableQuoteType } from "#shared/api-types";

export interface InspirationalQuotesSliceStateType {
  quotes: QuoteableQuoteType[];
  currentQuoteIndex: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}
