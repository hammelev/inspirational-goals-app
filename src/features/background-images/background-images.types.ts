import type { UnsplashImageType } from "#shared/api-types";

export const BACKGROUND_IMAGE_FETCH_REASONS = {
  INIT: "INIT",
  FORWARD: "FORWARD",
  BACKWARD: "BACKWARD",
} as const;

export type BackGroundImageFetchReasonsType =
  (typeof BACKGROUND_IMAGE_FETCH_REASONS)[keyof typeof BACKGROUND_IMAGE_FETCH_REASONS];

export interface BackgroundImagesSliceStateType {
  images: UnsplashImageType[];
  currentDisplayImageIndex: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}
