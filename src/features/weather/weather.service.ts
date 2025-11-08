import {
  OpenWeatherCurrentWeatherSchema,
  type OpenWeatherCurrentWeatherType,
} from "#shared/api-types";

import { environmentVariables } from "../../env.schema";
import type { Coordinates } from "../../types/types";

const { VITE_WEATHER_ENDPOINT_GET_WEATHER } = environmentVariables;

export const fetchCurrentWeather = async (
  cords: Coordinates,
): Promise<OpenWeatherCurrentWeatherType> => {
  const searchParams = new URLSearchParams();

  searchParams.append("lat", cords.latitude.toString());
  searchParams.append("lon", cords.longitude.toString());

  const response = await fetch(
    `${VITE_WEATHER_ENDPOINT_GET_WEATHER}?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch current weather. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = OpenWeatherCurrentWeatherSchema.parse(await response.json());

  return data;
};
