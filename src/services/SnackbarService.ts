import {SnackbarServiceProps} from "../@types/snackbar_service";
import {useState} from "react";
import {AlertColor} from "@mui/material";


export function useSnackbarService(): SnackbarServiceProps {

    const [snackbarState, setSnackbarState] = useState<{isOpen: boolean, message: string, severity: AlertColor}>({
        isOpen: false,
        message: "",
        severity: "info",
    })

    const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason: string) => {
        if (reason === "timeout") {
            setSnackbarState((state) => ({
                ...state,
                isOpen: false,
            }));
        }

    }

    const pushAlert = (message: string, severity: AlertColor
    ) => {
        setSnackbarState({
            isOpen: true,
            message: message,
            severity: severity,
        });
    }

    return { pushAlert, snackbarState, handleSnackbarClose }
}