import type { GoalType } from "./goals.types";
import { GoalSchema } from "./goals.types";

const STORAGE_KEY = "goals";

const getGoals = (): GoalType[] => {
  const goals = window.localStorage.getItem(STORAGE_KEY);
  if (!goals) return [];
  try {
    const goalsParsed = GoalSchema.array().parse(JSON.parse(goals));
    return goalsParsed;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    return [];
  }
};

const saveGoals = (goals: GoalType[]): void => {
  try {
    GoalSchema.array().parse(goals);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export { getGoals, saveGoals };
