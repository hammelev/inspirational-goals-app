/**
 * Error codes for Netlify serverless functions
 * Used in error responses to provide machine-readable error identification
 */
export const ErrorCodes = {
  INVALID_SERVER_CONFIG: "INVALID_SERVER_CONFIG",
  INVALID_RESPONSE_FROM_API: "INVALID_RESPONSE_FROM_API",
  INVALID_REQUEST_PARAMS: "INVALID_REQUEST_PARAMS",
  API_REQUEST_FAILED: "API_REQUEST_FAILED",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
