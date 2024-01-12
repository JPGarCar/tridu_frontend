import {
    AppBar,
    Autocomplete,
    Box,
    InputAdornment,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Search} from "@mui/icons-material";
import UserIconMenu from "./UserIconMenu.tsx";
import {useAuthServiceContext} from "../context/AuthContext.tsx";


const PrimaryAppBar = () => {

    const { isLoggedIn } = useAuthServiceContext();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" flexGrow={1}>
                    TriDu App
                </Typography>
                <Box flexGrow={1/3}>
                    {
                        isLoggedIn ?
                            <Autocomplete
                                sx={{ my: 1 }}
                                freeSolo={true}
                                filterOptions={(x) => x}
                                options={[]}
                                renderInput={
                                    (params) =>
                                        <TextField {...params} size="small" variant="outlined" label="Search" InputProps={{ ...params.InputProps, endAdornment: <InputAdornment position="end"> <Search /> </InputAdornment> }} />
                                }
                            />
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