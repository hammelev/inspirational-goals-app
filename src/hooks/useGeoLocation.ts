import { useCallback, useEffect, useState } from "react";

import type { Coordinates, useGeoLocationErrorCodesType } from "../types/types";
import { useGeoLocationErrorCodes } from "../types/types";

export const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [errorCode, setErrorCode] =
    useState<useGeoLocationErrorCodesType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getLocation = useCallback((isRetry = false) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoordinates(newCoordinates);
      },
      () => {
        if (!isRetry) {
          setErrorCode(useGeoLocationErrorCodes.GEOLOCATION_ERROR);
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60 * 1000,
        timeout: 10 * 1000,
      },
    );
  }, []);

  // Check current permission state using the Permissions API
  const checkAndRequestLocation = useCallback(
    async (isRetry = false) => {
      setLoading(true);
      setErrorCode(null);
      // Query the current permission state
      const status = await navigator.permissions.query({
        name: "geolocation",
      });

      if (status.state === "granted") {
        // Permission already granted, get location
        getLocation();
        setLoading(false);
      } else if (status.state === "prompt") {
        // First time or previously cleared permission
        const userConsent = window.confirm(
          "This app needs your location to show accurate weather information. " +
            "Would you like to share your location?",
        );

        if (userConsent) {
          getLocation();
          setLoading(false);
        } else {
          setErrorCode(useGeoLocationErrorCodes.PERMISSION_DENIED);
          setLoading(false);
        }
      } else {
        // Permission was denied
        setErrorCode(useGeoLocationErrorCodes.PERMISSION_DENIED);
        if (isRetry) {
          getLocation(true);
          window.alert(
            "Location permissions not enabled.\n" +
              "Enable location permission and try again to see current weather",
          );
        }
        setLoading(false);
      }
    },
    [getLocation],
  );

  useEffect(() => {
    if (!navigator.permissions || !navigator.permissions.query) {
      setErrorCode(useGeoLocationErrorCodes.BROWSER_NOT_SUPPORTED);
      setLoading(false);
      return;
    }

    void checkAndRequestLocation();
  }, [checkAndRequestLocation]);

  const retry = () => {
    void checkAndRequestLocation(true);
  };
  return { coordinates, errorCode, loading, retry };
};
