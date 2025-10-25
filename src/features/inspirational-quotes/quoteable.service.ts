import type { QuoteableQuoteType } from "./inspirational-quotes.types";

const BASE_URL = String(import.meta.env.VITE_QUOTEABLE_BASE_URL);
const GET_RANDOM_QUOTES_ENDPOINT = String(
  import.meta.env.VITE_QUOTEABLE_GET_RANDOM_QUOTES_ENDPOINT,
);
const MAX_ALLOWED_QUOTES_TO_FETCH = 50;

export const fetchRandomInspirationalQuotes = async (
  numOfQuotesToGet = 1,
): Promise<QuoteableQuoteType[]> => {
  const url = new URL(BASE_URL + GET_RANDOM_QUOTES_ENDPOINT);
  url.searchParams.append(
    "limit",
    Math.min(MAX_ALLOWED_QUOTES_TO_FETCH, numOfQuotesToGet).toString(),
  );

  const response = await fetch(url);

  if (!response.ok) {
    // Let the caller handle the error by throwing an exception
    throw new Error(
      `Failed to fetch inspirational quotes. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as QuoteableQuoteType[];

  return data;
};
