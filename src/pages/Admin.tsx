import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbarServiceContext } from "../context/SnackbarContext.tsx";
import { useApiServiceContext } from "../context/ApiContext.tsx";

const Admin = () => {
  const { pushAlert } = useSnackbarServiceContext();

  const { getApiClient } = useApiServiceContext();

  const cleanUpGender = async () => {
    const api = await getApiClient();
    const response = await api.accounts_api_admin_action_clean_gender();

    pushAlert(response.data.toString(), "info");
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography>Actions</Typography>
      <Grid container gap={2}>
        <Grid>
          <Button
            onClick={() => {
              void cleanUpGender();
            }}
            variant={"contained"}
          >
            Clean Up Gender
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
