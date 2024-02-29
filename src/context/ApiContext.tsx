import React, { createContext, useContext } from "react";
import { ApiServiceProps } from "../@types/api-service";
import { useApiService } from "../services/api/ApiService.ts";
import { useAuthServiceContext } from "./AuthContext.tsx";
import { useSnackbar } from "notistack";

const ApiServiceContext = createContext<ApiServiceProps | null>(null);

export function ApiServiceProvider(props: React.PropsWithChildren<{}>) {
  const apiService = useApiService(useAuthServiceContext(), useSnackbar());

  return (
    <ApiServiceContext.Provider value={apiService}>
      {props.children}
    </ApiServiceContext.Provider>
  );
}

export function useApiServiceContext(): ApiServiceProps {
  const context = useContext(ApiServiceContext);

  if (context === null) {
    throw new Error("Error - You have to use the ApiServiceProvider.");
  }

  return context;
}

export default ApiServiceProvider;
