import { ImageSchema, type ImageType } from "#shared/api-types";
import { z } from "zod";

import { environmentVariables } from "../../env.schema";

const {
  VITE_IMAGES_ENDPOINT_GET_RANDOM_IMAGES,
  VITE_IMAGES_NUMBER_OF_RANDOM_IMAGES,
} = environmentVariables;

export const fetchRandomImages = async (): Promise<ImageType[]> => {
  const searchParams = new URLSearchParams();

  searchParams.append("count", VITE_IMAGES_NUMBER_OF_RANDOM_IMAGES.toString());

  const response = await fetch(
    `${VITE_IMAGES_ENDPOINT_GET_RANDOM_IMAGES}?${searchParams}`,
  );

  if (!response.ok) {
    // Let the caller handle the error by throwing an exception
    throw new Error(
      `Failed to fetch background images. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = z.array(ImageSchema).parse(await response.json());

  return data;
};
