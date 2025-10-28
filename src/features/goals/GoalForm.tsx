import PrimaryButton from "../../components/PrimaryButton";
import PrimaryContainer from "../../components/PrimaryContainer";
import styles from "./goals.module.css";

export default function GoalForm() {
  return (
    <PrimaryContainer className={styles["goal-form-container"]}>
      <h1>Add a Goal</h1>
      <hr />
      <form className={styles["goal-form"]}>
        <input
          type="text"
          aria-label="Enter your goal"
          placeholder="Enter your goal"
          className={styles["goal-form-input-text"]}
        />
        <PrimaryButton
          type="submit"
          iconName="add_2"
          className={`material-symbols-outlined ${styles["goal-form-submit-button"]}`}
        />
      </form>
    </PrimaryContainer>
  );
}
