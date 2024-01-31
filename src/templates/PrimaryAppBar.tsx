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


const PrimaryAppBar = () => {

    const { isLoggedIn } = useAuthServiceContext();

    const navigator = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box flexGrow={1}>
                    <ButtonBase onClick={() => {navigator("/")}}>
                        <Typography variant="h6">
                            TriDu App
                        </Typography>
                    </ButtonBase>
                </Box>
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