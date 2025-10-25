export interface QuoteableQuoteType {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export interface InspirationalQuotesSliceStateType {
  quotes: QuoteableQuoteType[];
  currentQuoteIndex: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}
