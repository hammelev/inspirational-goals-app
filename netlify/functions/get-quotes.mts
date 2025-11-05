import type { Handler } from "@netlify/functions";
import https from "https";
import { z } from "zod";

import { QuoteableQuoteSchema } from "../../shared/api-types";
import {
  QuoteableQueryParamsSchema,
  QuoteableSchema,
} from "../types/input-types";

/**
 * Makes an HTTPS request ignoring certificate validation
 * Only used for Quoteable API due to their SSL certificate issues
 * See: https://github.com/lukePeavey/quotable/issues/266
 */
function fetchInsecure(url: URL): Promise<Response> {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { rejectUnauthorized: false }, (res) => {
      const chunks: Buffer[] = [];

      res.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf8");

        // Build headers object compatible with Response
        const headers = new Headers();
        for (const [key, value] of Object.entries(res.headers)) {
          if (value) {
            headers.append(
              key,
              Array.isArray(value) ? value.join(", ") : value,
            );
          }
        }

        resolve(
          new Response(body, {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers,
          }),
        );
      });
    });

    request.on("error", reject);
    request.end();
  });
}

const envResult = QuoteableSchema.safeParse(process.env);

if (!envResult.success) {
  console.error(
    "Invalid environment configuration:",
    JSON.stringify(z.treeifyError(envResult.error), null, 2),
  );
}

export const handler: Handler = async (event) => {
  // If environment validation failed, return error response
  if (!envResult.success) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error:
          "Server configuration error - environment variables missing or invalid",
      }),
    };
  }

  const { QUOTEABLE_BASE_URL, QUOTEABLE_GET_RANDOM_QUOTES_ENDPOINT } =
    envResult.data;

  const newRequestUrl = new URL(
    QUOTEABLE_GET_RANDOM_QUOTES_ENDPOINT,
    QUOTEABLE_BASE_URL,
  );

  // Parse and validate query parameters
  const queryParams = event.rawQuery
    ? Object.fromEntries(new URLSearchParams(event.rawQuery))
    : {};
  const paramsResult = QuoteableQueryParamsSchema.safeParse(queryParams);

  // Illegal limit value => fallback to default behaviour of the Quoteable API when it is not provided.
  if (paramsResult.success && paramsResult.data.limit) {
    newRequestUrl.searchParams.set("limit", paramsResult.data.limit.toString());
  }

  try {
    const response = await fetchInsecure(newRequestUrl);

    if (!response.ok) {
      throw new Error(`Quoteable API returned ${response.status}`);
    }

    const data = z.array(QuoteableQuoteSchema).parse(await response.json());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error:
          error instanceof z.ZodError
            ? "Invalid response from Quoteable"
            : "Failed to fetch quotes via proxy.",
      }),
    };
  }
};
