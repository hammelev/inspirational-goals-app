import type { UnsplashImageType } from "./background-images.types";

const BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL;
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const NUMBER_OF_IMAGES_TO_GET = import.meta.env.VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES;

export const fetchRandomImages = async (numOfImagesToGet = NUMBER_OF_IMAGES_TO_GET): Promise<UnsplashImageType[]> => {
    const url = new URL(BASE_URL + import.meta.env.VITE_UNSPLASH_GET_RANDOM_IMAGES_ENDPOINT);
    url.searchParams.append('count', numOfImagesToGet);

    const headers = new Headers();
    headers.set('authorization', `Client-ID ${API_KEY}`);

    const response = await fetch(url, { headers });

    if (!response.ok) {
        // Let the caller handle the error by throwing an exception
        throw new Error(`Failed to fetch background images. Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as UnsplashImageType[];

    return data;
};
