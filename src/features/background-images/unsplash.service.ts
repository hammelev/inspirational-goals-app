import type { UnsplashImageType } from "./background-images.types";

const BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL;
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const MAX_ALLOWED_IMAGES_TO_FETCH = 30;

export const fetchRandomImages = async (numOfImagesToGet: number): Promise<UnsplashImageType[]> => {
    const url = new URL(BASE_URL + import.meta.env.VITE_UNSPLASH_GET_RANDOM_IMAGES_ENDPOINT);
    url.searchParams.append('count', Math.min(MAX_ALLOWED_IMAGES_TO_FETCH, numOfImagesToGet).toString());

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
