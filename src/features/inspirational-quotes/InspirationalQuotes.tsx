import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/button/Button";
import LoadingIndicator from "../../components/loading-indicator/LoadingIndicator";
import PrimaryContainer from "../../components/primary-container/PrimaryContainer";
import { useLoadingState } from "../../hooks/useLoadingState";
import styles from "./inspirational-quotes.module.css";
import { getNewQuote, selectCurrentQuote } from "./inspirationalQuotesSlice";

export default function InspirationalQuotes() {
  const dispatch = useAppDispatch();
  const quote = useAppSelector(selectCurrentQuote);
  const { showQuotesLoader } = useLoadingState();

  useEffect(() => {
    dispatch(getNewQuote());
  }, [dispatch]);

  const handleGetNewQuote = () => {
    dispatch(getNewQuote());
  };

  return (
    <PrimaryContainer className={styles.quote}>
      {showQuotesLoader && (
        <LoadingIndicator size="small" isContainerLoader={true} />
      )}
      <span className={styles["quote-text"]}>{quote?.content}</span>
      <div className={styles["quote-author-and-button-container"]}>
        <span className={styles["quote-author"]}>- {quote?.author}</span>
        <Button
          onClick={handleGetNewQuote}
          className={styles["quote-update-button"]}
          variant="primary"
          iconName="autorenew"
          title="Get New Quote"
        />
      </div>
    </PrimaryContainer>
  );
}
