import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "../templates/PrimaryAppBar.tsx";
import {Outlet} from "react-router-dom";


const MainLayout = () => {
    return (
        <Box sx={{ height: "100%" }}>
            <CssBaseline />
            <PrimaryAppBar />
            <Box component="main" sx={{ height: "90%", overflow: "auto" }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainLayout;