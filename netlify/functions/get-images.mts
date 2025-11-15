import {
  type ImageType,
  UnsplashImageSchema,
  type UnsplashImageType,
} from "#shared/api-types.ts";
import { ErrorCodes } from "#shared/error-codes.ts";
import type { Config } from "@netlify/functions";
import { z } from "zod";

import {
  UnsplashQueryParamsSchema,
  UnsplashSchema,
} from "../types/input-types";
import { createDefaultRateLimitConfig } from "../util/function-config-helpers";
import {
  createResponseFromZodError,
  createResponseRequestFailed,
} from "../util/response-helpers";

const envResult = UnsplashSchema.safeParse(process.env);

if (!envResult.success) {
  console.error(
    "Invalid environment configuration:",
    JSON.stringify(z.prettifyError(envResult.error), null, 2),
  );
}

export default async (request: Request) => {
  if (!envResult.success) {
    return createResponseFromZodError(
      ErrorCodes.INVALID_SERVER_CONFIG,
      envResult.error,
    );
  }

  const {
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_APP_NAME,
    UNSPLASH_BASE_URL,
    UNSPLASH_ENDPOINT_GET_RANDOM_IMAGES,
    UNSPLASH_WEBSITE_URL,
  } = envResult.data;

  const newRequestUrl = new URL(
    UNSPLASH_ENDPOINT_GET_RANDOM_IMAGES,
    UNSPLASH_BASE_URL,
  );

  const headers = new Headers();
  headers.set("authorization", `Client-ID ${UNSPLASH_ACCESS_KEY}`);

  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const paramsResult = UnsplashQueryParamsSchema.safeParse(queryParams);

  // Illegal count value => fallback to default behaviour of the Unsplash API when it is not provided.
  if (paramsResult.success && paramsResult.data.count) {
    newRequestUrl.searchParams.set("count", paramsResult.data.count.toString());
  }

  try {
    const response = await fetch(newRequestUrl, { headers });

    if (!response.ok) {
      throw new Error(`Unsplash API returned ${response.status}`);
    }

    // When count is equal to 1, Unsplash returns a single image not in an array.
    // Therefore, the union parse is needed before it is ensured that an array is returned to the client.
    const parsedData = z
      .union([UnsplashImageSchema, z.array(UnsplashImageSchema)])
      .parse(await response.json());

    const data: UnsplashImageType[] =
      parsedData instanceof Array ? parsedData : [parsedData];

    const dataEnriched: ImageType[] = data.map((image) => ({
      ...image,
      provider: {
        name: "Unsplash",
        link: UNSPLASH_WEBSITE_URL,
      },
      user: {
        ...image.user,
        links: {
          html: `${image.user.links.html}?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`,
        },
      },
    }));

    return new Response(JSON.stringify(dataEnriched), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in get-images function:", error);

    if (error instanceof z.ZodError) {
      return createResponseFromZodError(
        ErrorCodes.INVALID_RESPONSE_FROM_API,
        error,
      );
    }
    return createResponseRequestFailed(
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};

export const config: Config = {
  path: "/api/get-images",
  rateLimit: createDefaultRateLimitConfig(),
};
