import PrimaryContainer from "../../components/PrimaryContainer";
import styles from "./goals.module.css";

export default function Goals() {
  return (
    <PrimaryContainer className={styles["goals"]}>
      <h1>My Goals</h1>
      <hr />
    </PrimaryContainer>
  );
}
