import { type ErrorCode, ErrorCodes } from "#shared/error-codes.ts";
import { type ZodError, z } from "zod";

export const createResponseFromZodError = (
  errorCode: ErrorCode,
  zodError: ZodError,
) => {
  return new Response(
    JSON.stringify({
      error: {
        code: errorCode,
        details: JSON.stringify(z.treeifyError(zodError), null, 2),
      },
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const createResponseRequestFailed = (errorString: string) => {
  return new Response(
    JSON.stringify({
      error: {
        code: ErrorCodes.API_REQUEST_FAILED,
        message: errorString,
      },
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
