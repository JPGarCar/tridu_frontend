import {
    AppBar,
    Box, ButtonBase,
    Toolbar,
    Typography
} from "@mui/material";
import UserIconMenu from "./UserIconMenu.tsx";
import {useAuthServiceContext} from "../context/AuthContext.tsx";
import SearchAutocomplete from "../components/SearchAutocomplete.tsx";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

const PrimaryAppBar = () => {

    const { isLoggedIn } = useAuthServiceContext();

    const navigator = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid flexGrow={1} container spacing={3} alignItems={"center"} flexWrap={"nowrap"}>
                    <Grid>
                        <ButtonBase onClick={() => {navigator("/")}}>
                            <Typography variant="h6">
                                TriDu App
                            </Typography>
                        </ButtonBase>
                    </Grid>
                    <Grid spacing={2} container>
                        <Grid>
                            <ButtonBase onClick={() => {navigator("/heats")}}>
                                <Typography variant="button">
                                    Heats
                                </Typography>
                            </ButtonBase>
                        </Grid>
                        <Grid>
                            <ButtonBase onClick={() => {navigator("/participants/create")}}>
                                <Typography variant="button">
                                    Create Participant
                                </Typography>
                            </ButtonBase>
                        </Grid>
                        <Grid>
                            <ButtonBase onClick={() => {navigator("/data/upload")}}>
                                <Typography variant="button">
                                    Bulk Upload
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>
                <Box flexGrow={1/3}>
                    {
                        isLoggedIn ?
                            <SearchAutocomplete />
                        :
                            <></>
                    }
                </Box>
                <Box sx={{ ml: { xs: 0, sm: 0.5, md: 2}, flexGrow: 0 }}>
                    { isLoggedIn ? <UserIconMenu /> : <> </>}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default PrimaryAppBar;