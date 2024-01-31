import {AxiosError} from "axios";


export const getAxiosError = (error: unknown): AxiosError<string, string> | null => {
    if (error && typeof error === "object" && "isAxiosError" in error) {
        // @ts-ignore
        return error;
    }
    return null;
}