import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
        id: uuidv4(),
        description: action.payload,
        completed: false,
      });
    },
    deleteGoal(state, action: { payload: string }) {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
    toggleGoalCompletion(state, action: { payload: string }) {
      const goal = state.goals.find((goal) => goal.id === action.payload);
      if (goal) {
        goal.completed = !goal.completed;
      }
    },
  },
});

export const selectGoals = (state: { goals: GoalsStateType }) =>
  state.goals.goals;

export const { addGoal, deleteGoal, toggleGoalCompletion } = goalsSlice.actions;

export default goalsSlice.reducer;
