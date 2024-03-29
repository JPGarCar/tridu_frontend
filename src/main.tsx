import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import AuthServiceProvider from "./context/AuthContext.tsx";
import {
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import ApiServiceProvider from "./context/ApiContext.tsx";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { CloseOutlined } from "@mui/icons-material";
import { ConfirmProvider } from "material-ui-confirm";

const queryClient = new QueryClient();

const themeLight = createTheme({
  palette: {
    background: {
      default: "#f7fafb",
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <AuthServiceProvider>
            <SnackbarProvider
              autoHideDuration={5000}
              action={(snackbarId) => (
                <IconButton onClick={() => closeSnackbar(snackbarId)}>
                  <CloseOutlined />
                </IconButton>
              )}
            >
              <ApiServiceProvider>
                <ThemeProvider theme={themeLight}>
                  <ConfirmProvider>
                    <CssBaseline />
                    <App />
                  </ConfirmProvider>
                </ThemeProvider>
              </ApiServiceProvider>
            </SnackbarProvider>
          </AuthServiceProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </DevSupport>
  </React.StrictMode>,
);
