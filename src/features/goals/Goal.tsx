import type { GoalType } from "./goals.types";
import styles from "./goals.module.css";

export default function Goal({ goal }: { goal: GoalType }) {
  return (
    <div className={styles["goal"]}>
      <span>{goal.description}</span>
    </div>
  );
}
