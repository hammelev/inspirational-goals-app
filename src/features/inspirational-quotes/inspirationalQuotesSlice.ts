import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import type {
    InspirationalQuotesSliceStateType,
    QuoteableQuoteType
} from './inspirational-quotes.types';
import { fetchRandomInspirationalQuotes } from './quoteable.service';


export const fetchInspirationalQuotes = createAsyncThunk<
    QuoteableQuoteType[],
    undefined,
    { rejectValue: string }
>(
    'inspirationalQuotes/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchRandomInspirationalQuotes(5);

            return response;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown network error occurred.');
        }
    }
);

export const getNewQuote = (): ThunkAction<void, { inspirationalQuotes: InspirationalQuotesSliceStateType }, unknown, Action> => (dispatch, getState) => {
    const { currentQuoteIndex, quotes } = getState().inspirationalQuotes;

    if (currentQuoteIndex < quotes.length - 1) {
        dispatch(setCurrentQuoteIndex(currentQuoteIndex + 1));
    } else {
        void dispatch(fetchInspirationalQuotes());
    }
};


const initialState: InspirationalQuotesSliceStateType = {
    quotes: [],
    currentQuoteIndex: 0,
    isLoading: false,
    hasError: false,
    errorMessage: null
};

const inspirationalQuotesSlice = createSlice({
    name: 'inspirationalQuotes',
    initialState,
    reducers: {
        setCurrentQuoteIndex(state, action: { payload: number }) {
            state.currentQuoteIndex = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInspirationalQuotes.fulfilled, (state, action : { payload: QuoteableQuoteType[] }) => {
            state.quotes = action.payload;
            state.currentQuoteIndex = 0;
            state.isLoading = false;
        });
        builder.addMatcher(isPending(fetchInspirationalQuotes), (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.errorMessage = null;
        });
        builder.addMatcher(isRejected(fetchInspirationalQuotes), (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.payload ?? 'An unknown error occurred while fetching inspirational quotes.';
        });
    }
});

export const selectCurrentQuote = (state: { inspirationalQuotes: InspirationalQuotesSliceStateType }): QuoteableQuoteType | undefined => state.inspirationalQuotes.quotes[state.inspirationalQuotes.currentQuoteIndex];

export const {
    setCurrentQuoteIndex
} = inspirationalQuotesSlice.actions;

export default inspirationalQuotesSlice.reducer;
