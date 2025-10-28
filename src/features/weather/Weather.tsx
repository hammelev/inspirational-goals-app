import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RefreshButton from "../../components/RefreshButton";
import { environmentVariables } from "../../env.schema";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useGeoLocationErrorCodes } from "../../types/types.ts";
import { getCurrentWeather, selectCurrentWeather } from "./WeatherSlice";
import styles from "./weather.module.css";

export default function Weather() {
  const dispatch = useAppDispatch();
  const { coordinates, errorCode, retry } = useGeoLocation();
  const currentWheather = useAppSelector(selectCurrentWeather);

  useEffect(() => {
    if (coordinates) {
      void dispatch(getCurrentWeather({ cords: coordinates }));
    }
  }, [coordinates, dispatch]);

  if (errorCode === useGeoLocationErrorCodes.BROWSER_NOT_SUPPORTED) {
    return <> </>;
  }

  return (
    <div className={styles["weather-container"]}>
      {errorCode ? (
        <div className={styles["weather-error-container"]}>
          <span>
            {errorCode === useGeoLocationErrorCodes.PERMISSION_DENIED
              ? "To see weather, allow access to your location"
              : "Unknown error - try again later"}
          </span>
          <RefreshButton
            className={styles["weather-error-refresh-button"]}
            onClick={retry}
          />
        </div>
      ) : (
        <>
          <img
            src={`${environmentVariables.VITE_OPEN_WEATHER_ICON_BASE_URL}${currentWheather?.weather[0].icon}.png`}
            alt={currentWheather?.weather[0].description}
          />
          <div className={styles["weather-info-container"]}>
            <span>{`${currentWheather?.main.temp}°C, ${currentWheather?.weather[0].main}`}</span>
            <span>{currentWheather?.name}</span>
          </div>
        </>
      )}
    </div>
  );
}
