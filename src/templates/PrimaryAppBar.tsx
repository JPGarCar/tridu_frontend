import {
  AppBar,
  Box,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import UserIconMenu from "./UserIconMenu.tsx";
import { useAuthServiceContext } from "../context/AuthContext.tsx";
import SearchAutocomplete from "../components/SearchAutocomplete.tsx";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuSharp } from "@mui/icons-material";
import { useState } from "react";

const menuItems = [
  { title: "Heats", url: "/heats" },
  { title: "Races", url: "/races" },
  { title: "Create Participants", url: "/participants/create" },
  { title: "Bulk Upload", url: "/data/upload" },
  { title: "Admin", url: "/admin" },
];

const PrimaryAppBar = () => {
  const { isLoggedIn } = useAuthServiceContext();

  const navigator = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar component={"nav"}>
      <Toolbar>
        <Grid
          flexGrow={1}
          container
          spacing={3}
          alignItems={"center"}
          flexWrap={"nowrap"}
        >
          <Grid>
            <ButtonBase
              onClick={() => {
                navigator("/");
              }}
            >
              <Typography variant="h6">TriDu App</Typography>
            </ButtonBase>
          </Grid>
          {isLoggedIn ? (
            <>
              <Grid display={{ xs: "none", md: "flex" }} spacing={2} container>
                {menuItems.map(({ title, url }, index) => {
                  return (
                    <Grid key={index}>
                      <ButtonBase
                        onClick={() => {
                          navigator(url);
                        }}
                      >
                        <Typography variant="button">{title}</Typography>
                      </ButtonBase>
                    </Grid>
                  );
                })}
              </Grid>
              <IconButton
                onClick={handleOpenNavMenu}
                size={"large"}
                color={"inherit"}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuSharp />
              </IconButton>
              <Menu
                open={Boolean(anchorElNav)}
                anchorEl={anchorElNav}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {menuItems.map(({ title, url }, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigator(url);
                      }}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : null}
        </Grid>
        <Box flexGrow={1 / 3}>
          {isLoggedIn ? <SearchAutocomplete /> : <></>}
        </Box>
        <Box sx={{ ml: { xs: 0, sm: 0.5, md: 2 }, flexGrow: 0 }}>
          {isLoggedIn ? <UserIconMenu /> : <> </>}
        </Box>
        <Box sx={{ ml: { xs: 0, sm: 0.5, md: 0.5 }, flexGrow: 0 }}>
          <Typography variant={"caption"}>{APP_VERSION}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
