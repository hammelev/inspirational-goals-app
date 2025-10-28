import { environmentVariables } from "../../env.schema";
import type { Coordinates } from "../../types/types";
import { OpenWheatherCurrentWheatherSchema } from "./weather.types";
import type { OpenWheatherCurrentWheatherType } from "./weather.types";

const {
  VITE_OPEN_WEATHER_BASE_URL,
  VITE_OPEN_WEATHER_GET_CURRENT_WEATHER_ENDPOINT,
  VITE_OPEN_WEATHER_ACCESS_KEY,
} = environmentVariables;

export const fetchCurrentWeather = async (
  cords: Coordinates,
): Promise<OpenWheatherCurrentWheatherType> => {
  const url = new URL(
    VITE_OPEN_WEATHER_GET_CURRENT_WEATHER_ENDPOINT,
    VITE_OPEN_WEATHER_BASE_URL,
  );

  url.searchParams.append("appid", VITE_OPEN_WEATHER_ACCESS_KEY);
  url.searchParams.append("units", "metric");
  url.searchParams.append("lat", cords.latitude.toString());
  url.searchParams.append("lon", cords.longitude.toString());

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch current weather. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = OpenWheatherCurrentWheatherSchema.parse(await response.json());

  return data;
};
