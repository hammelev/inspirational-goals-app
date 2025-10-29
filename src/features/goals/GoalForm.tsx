import { useState } from "react";

import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button";
import PrimaryContainer from "../../components/PrimaryContainer";
import { addGoal } from "./GoalsSlice";
import styles from "./goals.module.css";

export default function GoalForm() {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (description.trim() !== "") {
      dispatch(addGoal(description.trimEnd()));
      setDescription("");
    }
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
        <Button
          className={styles["goal-form-submit-button"]}
          iconName="add_2"
          title="Add goal"
          type="submit"
          variant="primary"
        />
      </form>
    </PrimaryContainer>
  );
}
