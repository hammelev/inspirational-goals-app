import { z } from "zod";

export const GoalSchema = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export type GoalType = z.infer<typeof GoalSchema>;

export interface GoalsStateType {
  goals: GoalType[];
}

export type GoalTypeSaveResultType =
  | {
      success: true;
      payload: GoalType[];
    }
  | {
      success: false;
      error: string;
    };
