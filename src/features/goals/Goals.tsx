import PrimaryContainer from "../../components/PrimaryContainer";
import styles from "./goals.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectGoals } from "./GoalsSlice";
import Goal from "./Goal";

export default function Goals() {
  const goals = useAppSelector(selectGoals);

  return (
    <PrimaryContainer className={styles["goals"]}>
      <div className={styles["header"]}>
        <h1>My Goals</h1>
      </div>
      <ul className={styles["goals-list"]}>
        {goals.map((goal) => {
          return (
            <li key={goal.id}>
              <Goal goal={goal} />
            </li>
          );
        })}
      </ul>
    </PrimaryContainer>
  );
}
