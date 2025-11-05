import type { GoalType, GoalTypeSaveResultType } from "./goals.types";
import { GoalSchema } from "./goals.types";

const STORAGE_KEY = "goals";

const getGoals = (): GoalTypeSaveResultType => {
  const goals = window.localStorage.getItem(STORAGE_KEY);
  if (!goals) return { success: true, payload: [] };
  try {
    const goalsParsed = GoalSchema.array().parse(JSON.parse(goals));
    return { success: true, payload: goalsParsed };
  } catch (error) {
    console.error("Storage error when getting goals:", error);
    return { success: false, error: "Failed to get saved goals" };
  }
};

const saveGoals = (goals: GoalType[]): boolean => {
  try {
    GoalSchema.array().parse(goals);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    return true;
  } catch (error) {
    console.error("Storage error when saving goals:", error);
    return false;
  }
};

export { getGoals, saveGoals };
