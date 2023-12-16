import {
    AppBar,
    Autocomplete,
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {AccountCircle, Search} from "@mui/icons-material";


const PrimaryAppBar = () => {

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" flexGrow={1}>
                    TriDu
                </Typography>
                <Box flexGrow={1/3}>
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
                </Box>
                <Box sx={{ ml: { xs: 0, sm: 0.5, md: 2}, flexGrow: 0 }}>
                    <IconButton size="large">
                        <AccountCircle />
                    </IconButton>

                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default PrimaryAppBar;