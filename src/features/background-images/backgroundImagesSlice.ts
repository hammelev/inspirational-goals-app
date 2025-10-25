import {
    createSlice,
    createAsyncThunk,
    isPending,
    isRejected
} from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";


import type {
    UnsplashImageType,
    BackGroundImageFetchReasonsType,
    BackgroundImagesSliceStateType
} from "./background-images.types";
import { BACKGROUND_IMAGE_FETCH_REASONS } from "./background-images.types";
import { fetchRandomImages } from "./unsplash.service";

const numberOfImagesToGetInput = Number(import.meta.env.VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES);

const numberOfImagesToGet =
    (0 < numberOfImagesToGetInput && numberOfImagesToGetInput <= 30) ?
    numberOfImagesToGetInput :
    10;

const onInitLoadNumOfImages = numberOfImagesToGet * 2

export const fetchRandomBackgroundImages = createAsyncThunk<
    { newImages: UnsplashImageType[], fetchReason: BackGroundImageFetchReasonsType },
    { fetchReason: BackGroundImageFetchReasonsType},
    { rejectValue: string }
>(
    'backgroundImages/fetch',
    async ( {fetchReason }, { rejectWithValue }
    ) => {
        try {
            const newImages = fetchReason === BACKGROUND_IMAGE_FETCH_REASONS.INIT ?
             await fetchRandomImages(onInitLoadNumOfImages):
             await fetchRandomImages(numberOfImagesToGet);

            return { newImages, fetchReason }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown network error occurred.');
        }
    }
);

export const navigateForward = (): ThunkAction<void, { backgroundImages: BackgroundImagesSliceStateType }, unknown, Action> => (dispatch, getState) => {
    const { currentDisplayImageIndex, images } = getState().backgroundImages;

    if (currentDisplayImageIndex < images.length - 1) {
        dispatch(setCurrentDisplayImageIndex(currentDisplayImageIndex + 1));
    } else {
        void dispatch(fetchRandomBackgroundImages({fetchReason:BACKGROUND_IMAGE_FETCH_REASONS.FORWARD}));
    }
};

export const navigateBackward = (): ThunkAction<void, { backgroundImages: BackgroundImagesSliceStateType }, unknown, Action> => (dispatch, getState) => {
    const { currentDisplayImageIndex } = getState().backgroundImages;

    if (0 < currentDisplayImageIndex) {
        dispatch(setCurrentDisplayImageIndex(currentDisplayImageIndex - 1));
    } else {
        void dispatch(fetchRandomBackgroundImages({fetchReason:BACKGROUND_IMAGE_FETCH_REASONS.BACKWARD}));
    }
};

const initialState: BackgroundImagesSliceStateType = {
    images: [],
    currentDisplayImageIndex: 0,
    isLoading: false,
    hasError: false,
    errorMessage: null
}

const backgroundImagesSlice = createSlice({
    name: 'backgroundImages',
    initialState,
    reducers: {
        setCurrentDisplayImageIndex(state, action: { payload: number }) {
            state.currentDisplayImageIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomBackgroundImages.fulfilled, (state, action) => {
            switch (action.payload.fetchReason) {
                case BACKGROUND_IMAGE_FETCH_REASONS.INIT:
                    state.images = action.payload.newImages;
                    // Set the initial index to the middle
                    state.currentDisplayImageIndex = Math.max(0, Math.floor((action.payload.newImages.length / 2 )) - 1);
                    break;
                case BACKGROUND_IMAGE_FETCH_REASONS.FORWARD:
                    state.images = state.images.concat(action.payload.newImages);
                    state.currentDisplayImageIndex += 1;
                    break;
                case BACKGROUND_IMAGE_FETCH_REASONS.BACKWARD:
                    state.images = action.payload.newImages.concat(state.images);
                    state.currentDisplayImageIndex = Math.max(0, action.payload.newImages.length - 1);
                    break;
            }
            state.isLoading = false;
        });
        builder.addMatcher(isPending(fetchRandomBackgroundImages), (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null;
        });
        builder.addMatcher(isRejected(fetchRandomBackgroundImages), (state, action) => {
            state.errorMessage = action.payload ?? 'An unknown error occurred.';
            state.hasError = true;
            state.isLoading = false;
        });


    }
});

export const selectCurrentBackgroundImage = (state: { backgroundImages: BackgroundImagesSliceStateType }): UnsplashImageType | undefined => state.backgroundImages.images[state.backgroundImages.currentDisplayImageIndex];

export const selectIsLoading = (state: { backgroundImages: BackgroundImagesSliceStateType }) => state.backgroundImages.isLoading;

export const {
    setCurrentDisplayImageIndex
} = backgroundImagesSlice.actions;

export default backgroundImagesSlice.reducer;