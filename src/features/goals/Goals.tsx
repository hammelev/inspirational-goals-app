import { useAppSelector } from "../../app/hooks";
import PrimaryContainer from "../../components/PrimaryContainer";
import Goal from "./Goal";
import { selectGoals } from "./GoalsSlice";
import styles from "./goals.module.css";

export default function Goals() {
  const goals = useAppSelector(selectGoals);

  return (
    <PrimaryContainer className={styles["goals"]}>
      <div className={styles["header"]}>
        <h1>My Goals</h1>
      </div>
      <ul className={styles["goals-list"]}>
        {0 < goals.length ? (
          goals.map((goal) => (
            <li key={goal.id}>
              <Goal goal={goal} />
            </li>
          ))
        ) : (
          <li className={styles["goal-list-placeholder"]}>
            No goals yet. Add one to get started!
          </li>
        )}
      </ul>
    </PrimaryContainer>
  );
}
