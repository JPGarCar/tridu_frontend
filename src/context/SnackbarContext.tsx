import {createContext, useContext} from "react";
import {SnackbarServiceProps} from "../@types/snackbar_service";
import {useSnackbarService} from "../services/SnackbarService.ts";
import {Alert, Snackbar} from "@mui/material";


const SnackbarServiceContext = createContext<SnackbarServiceProps | null>(null);


export function SnackbarServiceProvider(props: React.PropsWithChildren<{}>) {
    const snackbarServices = useSnackbarService();

    return (
        <SnackbarServiceContext.Provider value={snackbarServices}>
            <Snackbar open={snackbarServices.snackbarState.isOpen} autoHideDuration={5000} onClose={snackbarServices.handleSnackbarClose}>
                <Alert onClose={snackbarServices.handleSnackbarClose} severity={snackbarServices.snackbarState.severity}>
                    {snackbarServices.snackbarState.message}
                </Alert>
            </Snackbar>
            {props.children}
        </SnackbarServiceContext.Provider>
    );
}

export function useSnackbarServiceContext(): SnackbarServiceProps {
    const context = useContext(SnackbarServiceContext);

    if (context === null) {
        throw new Error("Error = You have to use the SnackbarServiceProvider.");
    }
    return context;
}

export default SnackbarServiceProvider;