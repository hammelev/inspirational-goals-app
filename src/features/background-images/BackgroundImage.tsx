import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    fetchRandomBackgroundImages,
    selectCurrentBackgroundImage,
    selectIsLoading,
    navigateForward,
    navigateBackward
} from './backgroundImagesSlice';
import { BACKGROUND_IMAGE_FETCH_REASONS } from './background-images.types';

import styles from './background-images.module.css';

export default function BackgroundImage() {
    const dispatch = useAppDispatch();
    const image = useAppSelector(selectCurrentBackgroundImage);
    const isLoading = useAppSelector(selectIsLoading);

    const handleNavigation = (direction: 'back' | 'forward') => {
        if (direction === 'back') {
            dispatch(navigateBackward());
        } else if (direction === 'forward') {
            dispatch(navigateForward());
        }
    }

    useEffect(() => {
        if (!image) {
            dispatch(fetchRandomBackgroundImages({ fetchReason: BACKGROUND_IMAGE_FETCH_REASONS.INIT }));
        }
    }, [dispatch, image]);

    return (
        <>
            <img
                className={styles['background-image']}
                src={image?.urls.regular}
                alt={image?.alt_description}
            />
            <button
                className={`material-symbols-outlined ${styles['background-navigation-button']} ${styles['background-navigation-button-back']}`}
                onClick={() => handleNavigation('back')}
                disabled={isLoading}
            >
                arrow_back_ios
            </button>
            <button 
                className={`material-symbols-outlined ${styles['background-navigation-button']} ${styles['background-navigation-button-forward']}`}
                onClick={() => handleNavigation('forward')}
                disabled={isLoading}
            >
                arrow_forward_ios
            </button>
        </>
    )

}