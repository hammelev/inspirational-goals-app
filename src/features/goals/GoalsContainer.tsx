import GoalForm from "./GoalForm";
import Goals from "./Goals";
import styles from "./goals.module.css";

export default function GoalsContainer() {
  return (
    <div className={styles["goals-container"]}>
      <GoalForm />
      <Goals />
    </div>
  );
}
