import type { Config } from "@netlify/functions";

export const createDefaultRateLimitConfig = (): Config["rateLimit"] => {
  // The maximum number of requests to allow during the window.
  const windowLimit = 30;
  // The length of the window in seconds.
  const windowSize = 60;
  return {
    windowLimit,
    windowSize,
    aggregateBy: ["ip"],
  };
};
