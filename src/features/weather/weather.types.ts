import { z } from "zod";

export const OpenWheatherCurrentWheatherSchema = z.object({
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  main: z.object({
    temp: z.number().transform((value) => Math.round(value)),
    feels_like: z.number().transform((value) => Math.round(value)),
  }),
  name: z.string(),
});

export type OpenWheatherCurrentWheatherType = z.infer<
  typeof OpenWheatherCurrentWheatherSchema
>;

export type WeatherSliceStateType = {
  currentWeather: OpenWheatherCurrentWheatherType | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
};
