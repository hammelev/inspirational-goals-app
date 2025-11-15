import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PrimaryContainer from "../../components/primary-container/PrimaryContainer";
import styles from "./background-images.module.css";
import { BACKGROUND_IMAGE_FETCH_REASONS } from "./background-images.types";
import {
  fetchRandomBackgroundImages,
  navigateBackward,
  navigateForward,
  selectCurrentBackgroundImage,
  selectIsLoading,
} from "./backgroundImagesSlice";

export default function BackgroundImage() {
  const dispatch = useAppDispatch();
  const image = useAppSelector(selectCurrentBackgroundImage);
  const isLoading = useAppSelector(selectIsLoading);

  const handleNavigation = (direction: "back" | "forward") => {
    switch (direction) {
      case "back":
        dispatch(navigateBackward());
        break;
      case "forward":
        dispatch(navigateForward());
        break;
    }
  };

  useEffect(() => {
    if (!image) {
      void dispatch(
        fetchRandomBackgroundImages({
          fetchReason: BACKGROUND_IMAGE_FETCH_REASONS.INIT,
        }),
      );
    }
  }, [dispatch, image]);

  return (
    image && (
      <>
        <img
          className={styles["background-image"]}
          src={image.urls.regular}
          alt={image.alt_description}
        />
        <PrimaryContainer
          className={styles["background-image-credit"]}
          aria-label="Photo attribution"
        >
          Photo by{" "}
          <a
            href={image.user.links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.user?.name}{" "}
          </a>
          <br /> on{" "}
          <a
            href={image.provider.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.provider.name}
          </a>
        </PrimaryContainer>
        <button
          className={`material-symbols-outlined ${styles["background-navigation-button"]} ${styles["background-navigation-button-back"]}`}
          onClick={() => {
            handleNavigation("back");
          }}
          disabled={isLoading}
        >
          arrow_back_ios
        </button>
        <button
          className={`material-symbols-outlined ${styles["background-navigation-button"]} ${styles["background-navigation-button-forward"]}`}
          onClick={() => {
            handleNavigation("forward");
          }}
          disabled={isLoading}
        >
          arrow_back_ios
        </button>
      </>
    )
  );
}
