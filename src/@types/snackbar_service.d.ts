import { AlertColor } from "@mui/material";
import React from "react";

export interface SnackbarServiceProps {
  pushAlert: (message: string, severity: AlertColor) => void;
  handleSnackbarClose: (
    event: React.SyntheticEvent | Event,
    reason: string,
  ) => void;
  snackbarState: {
    message: string;
    isOpen: boolean;
    severity: AlertColor;
  };
}
