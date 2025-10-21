import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type {
    UnsplashImageType,
    BackgroundImagesSliceStateType
} from "./background-images-types";

export const fetchRandomBackgroundImages = createAsyncThunk<
    UnsplashImageType,
    void,
    { rejectValue: string }
>(
    'backgroundImages/fetchRandomBackgroundImages',
    async (_, { rejectWithValue }) => {
        const url = import.meta.env.VITE_UNSPLASH_BASE_URL + import.meta.env.VITE_UNSPLASH_GET_RANDOM_IMAGES_ENDPOINT;

        const headers = new Headers();
        headers.set('authorization', `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);

        try {
            const response = await fetch(url, { headers });

            if (!response.ok) {
                return rejectWithValue('Failed to fetch background image.');
            }

            const data = await response.json() as UnsplashImageType;
            return data;

        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown network error occurred.');
        }
    }
);

const initialState: BackgroundImagesSliceStateType = {
    image: null,
    isLoading: false,
    hasError: false,
    errorMessage: null
}

const backgroundImagesSlice = createSlice({
    name: 'backgroundImages',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomBackgroundImages.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchRandomBackgroundImages.fulfilled, (state, action) => {
            state.image = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchRandomBackgroundImages.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.payload ?? 'An unknown error occurred.';
        });
    }
});

export const selectBackgroundImage = (state: { backgroundImages: BackgroundImagesSliceStateType }) => state.backgroundImages.image;

export const { } = backgroundImagesSlice.actions;

export default backgroundImagesSlice.reducer;