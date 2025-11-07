import { QuoteableQuoteSchema } from "#shared/api-types.ts";
import { ErrorCodes } from "#shared/error-codes.ts";
import https from "https";
import { z } from "zod";

import {
  QuoteableQueryParamsSchema,
  QuoteableSchema,
} from "../types/input-types";
import {
  createReponseRequestFailed,
  createResponseFromZodError,
} from "../util/response-helpers";

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
  });
}

const envResult = QuoteableSchema.safeParse(process.env);

if (!envResult.success) {
  console.error(
    "Invalid environment configuration:",
    JSON.stringify(z.treeifyError(envResult.error), null, 2),
  );
}

export default async (request: Request) => {
  // If environment validation failed, return error response
  if (!envResult.success) {
    return createResponseFromZodError(
      ErrorCodes.INVALID_SERVER_CONFIG,
      envResult.error,
    );
  }

  const { QUOTEABLE_BASE_URL, QUOTEABLE_ENDPOINT_GET_RANDOM_QUOTES } =
    envResult.data;

  const newRequestUrl = new URL(
    QUOTEABLE_ENDPOINT_GET_RANDOM_QUOTES,
    QUOTEABLE_BASE_URL,
  );

  // Parse and validate query parameters
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());
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

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createResponseFromZodError(
        ErrorCodes.INVALID_RESPONSE_FROM_API,
        error,
      );
    }
    return createReponseRequestFailed(
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};
