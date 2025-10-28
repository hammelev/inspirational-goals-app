import { z } from "zod";

export const OpenWeatherCurrentWeatherSchema = z.object({
  weather: z
    .array(
      z.object({
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    )
    .nonempty(),
  main: z.object({
    temp: z.number().transform((value) => Math.round(value)),
    feels_like: z.number().transform((value) => Math.round(value)),
  }),
  name: z.string(),
});

export type OpenWeatherCurrentWeatherType = z.infer<
  typeof OpenWeatherCurrentWeatherSchema
>;

export type WeatherSliceStateType = {
  currentWeather: OpenWeatherCurrentWeatherType | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
};
