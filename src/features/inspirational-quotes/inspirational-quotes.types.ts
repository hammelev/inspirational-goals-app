import { type QuotableQuoteType } from "#shared/api-types";

export interface InspirationalQuotesSliceStateType {
  quotes: QuotableQuoteType[];
  currentQuoteIndex: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}
