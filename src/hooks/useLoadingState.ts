import { useAppSelector } from "../app/hooks";
import { selectIsLoading as selectImagesLoading } from "../features/background-images/backgroundImagesSlice";
import { selectIsLoading as selectQuotesLoading } from "../features/inspirational-quotes/inspirationalQuotesSlice";
import { selectIsLoading as selectWeatherLoading } from "../features/weather/WeatherSlice";

export const useLoadingState = () => {
  const isImagesLoading = useAppSelector(selectImagesLoading);
  const isQuotesLoading = useAppSelector(selectQuotesLoading);
  const isWeatherLoading = useAppSelector(selectWeatherLoading);

  return {
    showGlobalLoader: isImagesLoading,
    showQuotesLoader: isQuotesLoading && !isImagesLoading,
    showWeatherLoader: isWeatherLoading && !isImagesLoading,
  };
};
