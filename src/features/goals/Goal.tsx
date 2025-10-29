import { useCallback } from "react";

import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button";
import { deleteGoal, toggleGoalCompletion } from "./GoalsSlice";
import styles from "./goals.module.css";
import type { GoalType } from "./goals.types";

interface GoalProps {
  goal: GoalType;
}

export default function Goal({ goal }: GoalProps) {
  const dispatch = useAppDispatch();

  const { completed, description, id } = goal;

  const handleToggleCompletion = useCallback(
    () => dispatch(toggleGoalCompletion(id)),
    [dispatch, id],
  );
  const handleDelete = useCallback(
    () => dispatch(deleteGoal(id)),
    [dispatch, id],
  );
  return (
    <div className={`${styles.goal} ${completed ? styles.completed : ""}`}>
      <span>{description}</span>
      <div className={styles["goal-actions"]}>
        {completed ? (
          <Button
            variant="secondary"
            iconName="undo"
            onClick={handleToggleCompletion}
            title="Reactivate Goal"
          />
        ) : (
          <Button
            variant="primary"
            iconName="check"
            onClick={handleToggleCompletion}
            title="Complete Goal"
          />
        )}
        <Button
          variant="destructive"
          iconName="delete"
          onClick={handleDelete}
          title="Delete Goal"
        />
      </div>
    </div>
  );
}
