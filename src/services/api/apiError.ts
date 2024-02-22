import { AxiosError } from "axios";
import { Components } from "./openapi";

export const getAxiosError = (
  error: unknown,
): AxiosError<string, string> | null => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    // @ts-expect-error we know this is an axios error
    return error;
  }
  return null;
};

export const getErrorObjectSchema = (
  error: unknown,
): Components.Schemas.ErrorObjectSchema | null => {
  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "title" in error &&
    "details" in error &&
    typeof error.status === "number" &&
    typeof error.title === "string" &&
    typeof error.details === "string"
  ) {
    // @ts-ignore
    return error;
  }
  return null;
};
