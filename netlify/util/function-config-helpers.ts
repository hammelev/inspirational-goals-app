import type { Config } from "@netlify/functions";

export const createDefaultRateLimitConfig = (): Config["rateLimit"] => {
  return {
    windowLimit: 30,
    windowSize: 60,
    aggregateBy: ["ip"],
  };
};
