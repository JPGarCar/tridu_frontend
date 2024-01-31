import {AlertColor} from "@mui/material";

export interface SnackbarServiceProps {
    pushAlert: (message: string, severity: AlertColor) => void;
    handleSnackbarClose: (event: React.SyntheticEvent | Event, reason: string) => void;
    snackbarState: {
        message: string,
        isOpen: boolean,
        severity: AlertColor
    }
}