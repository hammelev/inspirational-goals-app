import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PrimaryButton from "../../components/PrimaryButton";
import PrimaryContainer from "../../components/PrimaryContainer";
import styles from "./inspirational-quotes.module.css";
import { getNewQuote, selectCurrentQuote } from "./inspirationalQuotesSlice";

export default function InspirationalQuotes() {
  const dispatch = useAppDispatch();
  const quote = useAppSelector(selectCurrentQuote);

  useEffect(() => {
    dispatch(getNewQuote());
  }, [dispatch]);

  const handleGetNewQuote = () => {
    dispatch(getNewQuote());
  };

  return (
    <PrimaryContainer className={styles.quote}>
      <span>{quote?.content}</span>
      <div className={styles["quote-author-and-button-container"]}>
        <span className={styles["quote-author"]}>- {quote?.author}</span>
        <PrimaryButton
          onClick={handleGetNewQuote}
          className={styles["quote-update-button"]}
        />
      </div>
    </PrimaryContainer>
  );
}
