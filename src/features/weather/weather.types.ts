import type { OpenWeatherCurrentWeatherType } from "#shared/api-types.ts";

export type WeatherSliceStateType = {
  currentWeather: OpenWeatherCurrentWeatherType | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
};
