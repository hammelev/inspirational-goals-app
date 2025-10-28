import PrimaryButton from "../../components/PrimaryButton";
import PrimaryContainer from "../../components/PrimaryContainer";
import styles from "./goals.module.css";

export default function GoalForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Add goal submission logic here
  };
  return (
    <PrimaryContainer className={styles["goal-form-container"]}>
      <div className={styles["header"]}>
        <h1>Add a Goal</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles["goal-form"]}>
        <input
          type="text"
          aria-label="Enter your goal"
          placeholder="Enter your goal"
          className={styles["goal-form-input-text"]}
        />
        <PrimaryButton
          type="submit"
          iconName="add_2"
          className={`${styles["goal-form-submit-button"]}`}
        />
      </form>
    </PrimaryContainer>
  );
}
