export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const useGeoLocationErrorCodes = {
  BROWSER_NOT_SUPPORTED: "BROWSER_NOT_SUPPORTED",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  GEOLOCATION_ERROR: "GEOLOCATION_ERROR",
} as const;

export type useGeoLocationErrorCodesType =
  (typeof useGeoLocationErrorCodes)[keyof typeof useGeoLocationErrorCodes];
