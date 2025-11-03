import { isAnyOf } from "@reduxjs/toolkit";

import type { startAppListeningType } from "../../app/listenerMiddleware";
import { addGoal, deleteGoal, toggleGoalCompletion } from "./GoalsSlice";
import { saveGoals } from "./goals.repository";

export const listenForUpdatesToGoals = (
  startListening: startAppListeningType,
) => {
  startListening({
    matcher: isAnyOf(addGoal, deleteGoal, toggleGoalCompletion),
    effect: (_, listenerApi) => {
      try {
        saveGoals(listenerApi.getState().goals.goals);
      } catch (e) {
        console.error("Failed to save goals:", e);
      }
    },
  });
};
