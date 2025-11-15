import type { OpenWeatherCurrentWeatherType } from "#shared/api-types";
import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ZodError } from "zod";

import type { Coordinates } from "../../types/types";
import { fetchCurrentWeather } from "./weather.service";
import type { WeatherSliceStateType } from "./weather.types";

export const getCurrentWeather = createAsyncThunk<
  OpenWeatherCurrentWeatherType,
  { cords: Coordinates },
  { rejectValue: string }
>("weather/getWeather", async (args, { rejectWithValue }) => {
  try {
    const response = await fetchCurrentWeather(args.cords);

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      // Get detailed validation errors from the issues array
      const validationErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      return rejectWithValue(`Invalid weather data: ${validationErrors}`);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown network error occurred.");
  }
});

const initialState: WeatherSliceStateType = {
  currentWeather: null,
  isLoading: false,
  hasError: false,
  errorMessage: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCurrentWeather.fulfilled,
      (state, action: PayloadAction<OpenWeatherCurrentWeatherType>) => {
        state.isLoading = false;
        state.hasError = false;
        state.errorMessage = null;
        state.currentWeather = action.payload;
      },
    );
    builder.addMatcher(isPending(getCurrentWeather), (state) => {
      state.isLoading = true;
      state.hasError = false;
      state.errorMessage = null;
    });
    builder.addMatcher(
      isRejected(getCurrentWeather),
      (state, action: PayloadAction<string | undefined>) => {
        state.errorMessage = action.payload ?? "An unknown error occurred.";
        state.hasError = true;
        state.isLoading = false;
      },
    );
  },
});

export const selectCurrentWeather = (state: {
  weather: WeatherSliceStateType;
}): OpenWeatherCurrentWeatherType | null => state.weather.currentWeather;

export const selectIsLoading = (state: {
  weather: WeatherSliceStateType;
}): boolean => state.weather.isLoading;

export default weatherSlice.reducer;
