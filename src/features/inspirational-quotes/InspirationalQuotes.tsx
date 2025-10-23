import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getNewQuote,
    selectCurrentQuote
} from './inspirationalQuotesSlice';

import styles from './inspirational-quotes.module.css';

export default function InspirationalQuotes() {
    const dispatch = useAppDispatch();
    const quote = useAppSelector(selectCurrentQuote);

    useEffect(() => {
        dispatch(getNewQuote());
    }, [dispatch]);

    const handleGetNewQuote = () => {
        dispatch(getNewQuote());
    }

    return (
        <>
            <div className={styles.quote}>
                <span>{quote?.content}</span>
                <span>- {quote?.author}</span>
            </div>

            <button
                onClick={handleGetNewQuote}
                className={`material-symbols-outlined ${styles['quote-update-button']}`
                }>
                autorenew
            </button>
        </>
    )

}