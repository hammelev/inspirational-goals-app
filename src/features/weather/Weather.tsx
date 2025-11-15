import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/button/Button";
import LoadingIndicator from "../../components/loading-indicator/LoadingIndicator";
import PrimaryContainer from "../../components/primary-container/PrimaryContainer";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useLoadingState } from "../../hooks/useLoadingState";
import { useGeoLocationErrorCodes } from "../../types/types";
import { getCurrentWeather, selectCurrentWeather } from "./WeatherSlice";
import styles from "./weather.module.css";

export default function Weather() {
  const dispatch = useAppDispatch();
  const {
    coordinates,
    errorCode,
    loading: geoLocationLoading,
    retry,
  } = useGeoLocation();
  const currentWeather = useAppSelector(selectCurrentWeather);
  const { showWeatherLoader } = useLoadingState();

  const locationPermissionDeniedErrorMessage =
    "To see weather, allow access to your location";
  const unknownLocationErrorMessage = "Unknown error - try again later";

  useEffect(() => {
    if (coordinates) {
      void dispatch(getCurrentWeather({ cords: coordinates }));
    }
  }, [coordinates, dispatch]);

  if (errorCode === useGeoLocationErrorCodes.BROWSER_NOT_SUPPORTED) {
    return <> </>;
  }

  return (
    <PrimaryContainer className={styles["weather-container"]}>
      {showWeatherLoader && geoLocationLoading && (
        <LoadingIndicator size="small" isContainerLoader={true} />
      )}
      {errorCode ? (
        <div className={styles["weather-error-container"]}>
          <span>
            {errorCode === useGeoLocationErrorCodes.PERMISSION_DENIED
              ? locationPermissionDeniedErrorMessage
              : unknownLocationErrorMessage}
          </span>
          <Button
            className={styles["weather-error-refresh-button"]}
            onClick={retry}
            variant="primary"
            iconName="autorenew"
            title="Retry"
          />
        </div>
      ) : (
        currentWeather && (
          <>
            <img
              src={currentWeather.weather[0].icon}
              alt={currentWeather.weather[0].description ?? "Weather icon"}
            />
            <div className={styles["weather-info-container"]}>
              <span>{`${currentWeather.main.temp}°C, ${currentWeather.weather[0].main}`}</span>
              <span>{currentWeather.name}</span>
            </div>
          </>
        )
      )}
    </PrimaryContainer>
  );
}
