import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './background-images.module.css';
import { BACKGROUND_IMAGE_FETCH_REASONS } from './background-images.types';
import {
    fetchRandomBackgroundImages,
    selectCurrentBackgroundImage,
    selectIsLoading,
    navigateForward,
    navigateBackward
} from './backgroundImagesSlice';


export default function BackgroundImage() {
    const dispatch = useAppDispatch();
    const image = useAppSelector(selectCurrentBackgroundImage);
    const isLoading = useAppSelector(selectIsLoading);

    const handleNavigation = (direction: 'back' | 'forward') => {
        switch (direction) {
            case 'back':
                dispatch(navigateBackward());
                break;
            case 'forward':
                dispatch(navigateForward());
                break
        }
    }

    useEffect(() => {
        if (!image) {
            void dispatch(fetchRandomBackgroundImages({ fetchReason: BACKGROUND_IMAGE_FETCH_REASONS.INIT }));
        }
    }, [dispatch, image]);

    return (
        <>
            {image && (
                <img
                    className={styles['background-image']}
                    src={image.urls.regular}
                    alt={image.alt_description}
                />
            )}
            <button
                className={`material-symbols-outlined ${styles['background-navigation-button']} ${styles['background-navigation-button-back']}`}
                onClick={() => {handleNavigation('back')}}
                disabled={isLoading}
            >
                arrow_back_ios
            </button>
            <button
                className={`material-symbols-outlined ${styles['background-navigation-button']} ${styles['background-navigation-button-forward']}`}
                onClick={() => {handleNavigation('forward')}}
                disabled={isLoading}
            >
                arrow_forward_ios
            </button>
        </>
    )

}