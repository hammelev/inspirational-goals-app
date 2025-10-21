export interface UnsplashImageType {
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        thumb: string;
    };
    alt_description: string;
}

export interface BackgroundImagesSliceStateType {
    image: UnsplashImageType | null;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
};
