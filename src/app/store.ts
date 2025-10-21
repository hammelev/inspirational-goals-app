import { configureStore } from "@reduxjs/toolkit";

// Slices
import backgroundImagesReducer from "../features/background-images/backgroundImagesSlice";

const store = configureStore({
    reducer: {
        backgroundImages: backgroundImagesReducer
    }
})

export type AppStoreType = typeof store;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;