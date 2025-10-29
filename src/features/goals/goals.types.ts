export interface GoalType {
  id: string;
  description: string;
  completed: boolean;
}

export interface GoalsStateType {
  goals: GoalType[];
}
