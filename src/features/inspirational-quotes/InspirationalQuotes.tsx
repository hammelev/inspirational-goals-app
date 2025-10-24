import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './inspirational-quotes.module.css';
import {
    getNewQuote,
    selectCurrentQuote
} from './inspirationalQuotesSlice';


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
        <div className={styles.quote}>
            <span>{quote?.content}</span>
            <div className={styles['quote-author-and-button-container']}>
                <span className={styles['quote-author']}>- {quote?.author}</span>
                <button
                    onClick={handleGetNewQuote}
                    className={`material-symbols-outlined ${styles['quote-update-button']}`
                    }>
                    autorenew
                </button>

            </div>

        </div>

    )

}