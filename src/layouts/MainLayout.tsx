import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "../templates/PrimaryAppBar.tsx";
import AuthServiceProvider from "../context/AuthContext.tsx";
import {Outlet} from "react-router-dom";


const MainLayout = () => {
    return (
        <Box sx={{ height: "100%" }}>
            <AuthServiceProvider>
                <CssBaseline />
                <PrimaryAppBar />
                <Box component="main" sx={{ height: "90%", overflow: "auto" }}>
                    <Outlet />
                </Box>
            </AuthServiceProvider>
        </Box>
    )
}

export default MainLayout;