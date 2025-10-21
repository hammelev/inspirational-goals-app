import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    fetchRandomBackgroundImages,
    selectBackgroundImage
} from './backgroundImagesSlice';


import styles from './background-images.module.css';

export default function BackgroundImage(){
    const dispatch = useAppDispatch();
    const image = useAppSelector(selectBackgroundImage);

    useEffect(() => {
        if (!image){
            dispatch(fetchRandomBackgroundImages());
        }
    }, [dispatch, image]);

    return (
        <>
            <img
                className={styles['background-image']}
                src={image?.urls.regular}
                alt={image?.alt_description}
            />
        </>
    )

}