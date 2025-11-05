import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { getGoals } from "./goals.repository";
import type { GoalsStateType } from "./goals.types";

const initializeState: () => GoalsStateType = () => {
  const savedgoals = getGoals();

  return {
    goals: savedgoals.success ? savedgoals.payload : [],
  };
};

const goalsSlice = createSlice({
  name: "goals",
  initialState: initializeState,
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
  selectors: {
    selectGoals: (state) => state.goals,
  },
});

export const { selectGoals } = goalsSlice.selectors;

export const { addGoal, deleteGoal, toggleGoalCompletion } = goalsSlice.actions;

export default goalsSlice.reducer;
