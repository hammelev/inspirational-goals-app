import styles from "./goals.module.css";
import type { GoalType } from "./goals.types";

interface GoalProps {
  goal: GoalType;
}

export default function Goal({ goal }: GoalProps) {
  return (
    <div className={styles["goal"]}>
      <span>{goal.description}</span>
    </div>
  );
}
