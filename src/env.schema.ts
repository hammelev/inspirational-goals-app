import { z } from "zod";

/**
 * Makes empty strings undefined before passing to the schema.
 * Preserves the output type of the schema.
 */
const emptyStringIsUndefined = <T>(schema: z.ZodType<T>) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema);

const EnvironmentVariableSchema = z.object({
  // Quoteable env variables
  VITE_QUOTES_ENDPOINT_RANDOM_QUOTES: z.string(),
  VITE_QUOTES_RANDOM_QUOTES_NUMBER: emptyStringIsUndefined(
    z.coerce.number().min(1).max(50).optional().default(10),
  ),
  // Unsplash env variables
  VITE_UNSPLASH_ENDPOINT_GET_RANDOM_IMAGES: z.string(),
  VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES: emptyStringIsUndefined(
    z.coerce.number().min(1).max(30).optional().default(10),
  ),
  // Open Weather env variables
  VITE_OPEN_WEATHER_BASE_URL: z.url(),
  VITE_OPEN_WEATHER_GET_CURRENT_WEATHER_ENDPOINT: z.string(),
  VITE_OPEN_WEATHER_ICON_BASE_URL: z.url(),
  VITE_OPEN_WEATHER_ACCESS_KEY: z.string(),
});

export type EnvironmentVariablesType = z.infer<
  typeof EnvironmentVariableSchema
>;

export const environmentVariables = EnvironmentVariableSchema.parse(
  import.meta.env,
  {
    reportInput: true,
  },
);
