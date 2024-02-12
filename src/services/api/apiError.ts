import { AxiosError } from "axios";

export const getAxiosError = (
  error: unknown,
): AxiosError<string, string> | null => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    // @ts-expect-error we know this is an axios error
    return error;
  }
  return null;
};
