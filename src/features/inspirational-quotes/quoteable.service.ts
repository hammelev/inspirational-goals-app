import { z } from "zod";

import { environmentVariables } from "../../env.schema";
import type { QuoteableQuoteType } from "./inspirational-quotes.types";
import { QuoteableQuoteSchema } from "./inspirational-quotes.types";

const {
  VITE_QUOTEABLE_BASE_URL,
  VITE_QUOTEABLE_GET_RANDOM_QUOTES_ENDPOINT,
  VITE_QUOTEABLE_NUMBER_OF_RANDOM_QUOTES,
} = environmentVariables;

export const fetchRandomInspirationalQuotes = async (): Promise<
  QuoteableQuoteType[]
> => {
  const url = new URL(
    VITE_QUOTEABLE_GET_RANDOM_QUOTES_ENDPOINT,
    VITE_QUOTEABLE_BASE_URL,
  );
  url.searchParams.append(
    "limit",
    VITE_QUOTEABLE_NUMBER_OF_RANDOM_QUOTES.toString(),
  );

  const response = await fetch(url);

  if (!response.ok) {
    // Let the caller handle the error by throwing an exception
    throw new Error(
      `Failed to fetch inspirational quotes. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = z.array(QuoteableQuoteSchema).parse(await response.json());

  return data;
};
