import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import UserIconMenu from "./UserIconMenu.tsx";
import { useAuthServiceContext } from "../context/AuthContext.tsx";
import UserSearchAutocomplete from "../components/UserSearchAutocomplete.tsx";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { KeyboardArrowDown, MenuSharp } from "@mui/icons-material";
import { useState } from "react";

const menuItems = [
  { title: "Heats", url: "/heats" },
  { title: "Bib Numbers", url: "/bibNumbers" },
  { title: "Create Participants", url: "/participants/create" },
];

const adminMenuItems = [
  { title: "Bulk Upload", url: "/data/upload" },
  { title: "Admin Actions", url: "/admin" },
  { title: "CheckIns", url: "/checkins" },
  { title: "Races", url: "/races" },
];

const PrimaryAppBar = () => {
  const { isLoggedIn } = useAuthServiceContext();

  const navigator = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const [adminAnchorElNav, setAdminAnchorElNav] = useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAdminOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAdminAnchorElNav(event.currentTarget);
  };
  const handleAdminCloseNavMenu = () => {
    setAdminAnchorElNav(null);
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
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleAdminOpenNavMenu}
                  endIcon={<KeyboardArrowDown />}
                >
                  Admin
                </Button>
                <Grid>
                  <Menu
                    open={Boolean(adminAnchorElNav)}
                    anchorEl={adminAnchorElNav}
                    onClose={handleAdminCloseNavMenu}
                    sx={{ display: { xs: "none", md: "block" } }}
                  >
                    {adminMenuItems.map(({ title, url }, index) => {
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
                </Grid>
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
                <Divider />
                {adminMenuItems.map(({ title, url }, index) => {
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
          {isLoggedIn ? <UserSearchAutocomplete /> : <></>}
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
