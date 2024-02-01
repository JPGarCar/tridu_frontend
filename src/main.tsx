import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon";


const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <App/>
                </LocalizationProvider>
            </QueryClientProvider>
        </DevSupport>
    </React.StrictMode>,
)
