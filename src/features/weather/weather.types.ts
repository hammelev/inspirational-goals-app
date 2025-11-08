import type { OpenWeatherCurrentWeatherType } from "#shared/api-types";

export type WeatherSliceStateType = {
  currentWeather: OpenWeatherCurrentWeatherType | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
};
