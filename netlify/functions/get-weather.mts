import { OpenWeatherCurrentWeatherSchema } from "#shared/api-types.ts";
import { ErrorCodes } from "#shared/error-codes.ts";
import { z } from "zod";

import {
  OpenWeatherQueryParamsSchema,
  OpenWeatherSchema,
} from "../types/input-types";
import {
  createResponseFromZodError,
  createResponseRequestFailed,
} from "../util/response-helpers";

const envResult = OpenWeatherSchema.safeParse(process.env);

if (!envResult.success) {
  console.error(
    "Invalid environment configuration:",
    JSON.stringify(z.treeifyError(envResult.error), null, 2),
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
    OPEN_WEATHER_ACCESS_KEY,
    OPEN_WEATHER_BASE_URL,
    OPEN_WEATHER_ENDPOINT_GET_CURRENT_WEATHER,
    OPEN_WEATHER_BASE_URL_ICONS,
  } = envResult.data;

  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const paramsResult = OpenWeatherQueryParamsSchema.safeParse(queryParams);

  if (!paramsResult.success) {
    console.error("Invalid request parameters:", paramsResult.error);
    return createResponseFromZodError(
      ErrorCodes.INVALID_REQUEST_PARAMS,
      paramsResult.error,
    );
  }

  const newRequestUrl = new URL(
    OPEN_WEATHER_ENDPOINT_GET_CURRENT_WEATHER,
    OPEN_WEATHER_BASE_URL,
  );
  newRequestUrl.searchParams.set("appid", OPEN_WEATHER_ACCESS_KEY);
  newRequestUrl.searchParams.set("units", "metric");
  newRequestUrl.searchParams.set("lat", paramsResult.data.lat.toString());
  newRequestUrl.searchParams.set("lon", paramsResult.data.lon.toString());

  try {
    const response = await fetch(newRequestUrl);

    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`);
    }

    const data = OpenWeatherCurrentWeatherSchema.parse(await response.json());

    const dataWithFullIconsURL = {
      ...data,
      weather: data.weather.map((weather) => ({
        ...weather,
        // Construct full icon URL: base + icon code + extension
        icon: `${OPEN_WEATHER_BASE_URL_ICONS}/${weather.icon}.png`,
      })),
    };

    return new Response(JSON.stringify(dataWithFullIconsURL), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in get-weather function:", error);
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
