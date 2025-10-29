import { useState } from "react";

import PrimaryButton from "../../components/PrimaryButton";
import PrimaryContainer from "../../components/PrimaryContainer";
import styles from "./goals.module.css";
import { useAppDispatch } from "../../app/hooks";
import { addGoal } from "./GoalsSlice";

export default function GoalForm() {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addGoal(description));
    setDescription("");
  };
  return (
    <PrimaryContainer className={styles["goal-form-container"]}>
      <div className={styles["header"]}>
        <h1>Add a Goal</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles["goal-form"]}>
        <input
          type="text"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
