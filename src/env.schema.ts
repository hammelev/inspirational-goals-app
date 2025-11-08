import { z } from "zod";

/**
 * Makes empty strings undefined before passing to the schema.
 * Preserves the output type of the schema.
 */
const emptyStringIsUndefined = <T>(schema: z.ZodType<T>) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema);

const EnvironmentVariableSchema = z.object({
  // Quotes env variables
  VITE_QUOTES_ENDPOINT_RANDOM_QUOTES: z.string(),
  VITE_QUOTES_RANDOM_QUOTES_NUMBER: emptyStringIsUndefined(
    z.coerce.number().min(1).max(50).optional().default(10),
  ),
  // Unsplash env variables
  VITE_IMAGES_ENDPOINT_GET_RANDOM_IMAGES: z.string(),
  VITE_IMAGES_NUMBER_OF_RANDOM_IMAGES: emptyStringIsUndefined(
    z.coerce.number().min(1).max(30).optional().default(10),
  ),
  // Weather env variables
  VITE_WEATHER_ENDPOINT_GET_WEATHER: z.string(),
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
