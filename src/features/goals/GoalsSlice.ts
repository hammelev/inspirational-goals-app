import { createSlice } from "@reduxjs/toolkit";
import type { GoalsStateType } from "./goals.types";

const initialState: GoalsStateType = {
  goals: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal(state, action: { payload: string }) {
      state.goals.push({
        id: crypto.randomUUID(),
        description: action.payload,
        completed: false,
      });
    },
  },
});

export const selectGoals = (state: { goals: GoalsStateType }) =>
  state.goals.goals;

export const { addGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
