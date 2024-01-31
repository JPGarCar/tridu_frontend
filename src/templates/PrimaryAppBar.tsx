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
import {name} from "axios";


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
                    <Grid>
                        <ButtonBase onClick={() => {navigator("/heats")}}>
                            <Typography variant="button">
                                Heats
                            </Typography>
                        </ButtonBase>
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