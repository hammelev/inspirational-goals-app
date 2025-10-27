import { z } from "zod";

import { environmentVariables } from "../../env.schema";
import type { UnsplashImageType } from "./background-images.types";
import { UnsplashImageSchema } from "./background-images.types";

const {
  VITE_UNSPLASH_BASE_URL,
  VITE_UNSPLASH_GET_RANDOM_IMAGES_ENDPOINT,
  VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES,
  VITE_UNSPLASH_ACCESS_KEY,
} = environmentVariables;

export const fetchRandomImages = async (): Promise<UnsplashImageType[]> => {
  const url = new URL(
    VITE_UNSPLASH_GET_RANDOM_IMAGES_ENDPOINT,
    VITE_UNSPLASH_BASE_URL,
  );
  url.searchParams.append(
    "count",
    VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES.toString(),
  );

  const headers = new Headers();
  headers.set("authorization", `Client-ID ${VITE_UNSPLASH_ACCESS_KEY}`);

  const response = await fetch(url, { headers });

  if (!response.ok) {
    // Let the caller handle the error by throwing an exception
    throw new Error(
      `Failed to fetch background images. Status: ${response.status.toString()} ${response.statusText}`,
    );
  }

  const data = z.array(UnsplashImageSchema).parse(await response.json());

  return data;
};
