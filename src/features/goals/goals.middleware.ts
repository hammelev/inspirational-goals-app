import { isAnyOf } from "@reduxjs/toolkit";

import type { startAppListeningType } from "../../app/listenerMiddleware";
import {
  addGoal,
  deleteGoal,
  selectGoals,
  toggleGoalCompletion,
} from "./GoalsSlice";
import { saveGoals } from "./goals.repository";

export const listenForUpdatesToGoals = (
  startListening: startAppListeningType,
) => {
  startListening({
    matcher: isAnyOf(addGoal, deleteGoal, toggleGoalCompletion),
    effect: (_, listenerApi) => {
      saveGoals(selectGoals(listenerApi.getState()));
    },
  });
};
