import PrimaryAppBar from "../templates/PrimaryAppBar.tsx";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

const MainLayout = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      sx={{ height: "100%" }}
      flexWrap={"nowrap"}
    >
      <Grid>
        <PrimaryAppBar />
      </Grid>
      <Grid component="main" sx={{ pt: 8 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
