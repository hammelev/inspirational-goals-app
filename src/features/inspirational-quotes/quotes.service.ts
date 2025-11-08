import { QuotableQuoteSchema, type QuotableQuoteType } from "#shared/api-types";
import { z } from "zod";

import { environmentVariables } from "../../env.schema";

const { VITE_QUOTES_ENDPOINT_RANDOM_QUOTES, VITE_QUOTES_RANDOM_QUOTES_NUMBER } =
  environmentVariables;

export const fetchRandomInspirationalQuotes = async (): Promise<
  QuotableQuoteType[]
> => {
  const searchParams = new URLSearchParams();

  searchParams.append("limit", VITE_QUOTES_RANDOM_QUOTES_NUMBER.toString());

  const response = await fetch(
    `${VITE_QUOTES_ENDPOINT_RANDOM_QUOTES}?${searchParams}`,
  );

  if (!response.ok) {
    // Let the caller handle the error by throwing an exception
    throw new Error(
      `Failed to fetch inspirational quotes. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = z.array(QuotableQuoteSchema).parse(await response.json());

  return data;
};
