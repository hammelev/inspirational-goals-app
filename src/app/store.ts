// Slices
import { configureStore } from "@reduxjs/toolkit";

import backgroundImagesReducer from "../features/background-images/backgroundImagesSlice";
import inspirationalQuotesReducer from "../features/inspirational-quotes/inspirationalQuotesSlice";
import weatherReducer from "../features/weather/WeatherSlice";
import goalsReducer from "../features/goals/GoalsSlice";

const store = configureStore({
  reducer: {
    backgroundImages: backgroundImagesReducer,
    inspirationalQuotes: inspirationalQuotesReducer,
    goals: goalsReducer,
    weather: weatherReducer,
  },
});

export type AppStoreType = typeof store;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
