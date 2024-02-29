import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { flatten } from "flat";

const race_id = 1;

const Admin = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { getApiClient } = useApiServiceContext();

  const cleanUpGender = async () => {
    const api = await getApiClient();
    const response = await api.accounts_api_admin_action_clean_gender();

    enqueueSnackbar(response.data.toString(), { variant: "info" });
  };

  const downloadInvalidSwimTimeParticipants = async () => {
    const api = await getApiClient();
    const response =
      await api.race_api_race_api_get_race_participants_with_invalid_swim_time({
        race_id: race_id,
      });

    const flattenedObjs = response.data.map((participant) =>
      flatten(participant),
    );

    const csv = Papa.unparse(flattenedObjs);
    const file = new File([csv], "InvalidSwimTimeParticipants.csv", {
      type: "text/csv;charset=utf-8",
    });
    saveAs(file);
  };

  const downloadParticipantEmailInfo = async () => {
    const api = await getApiClient();
    const response = await api.race_api_race_api_get_race_participations({
      race_id: race_id,
      limit: -1,
      active: true,
    });

    const flattenedObjs = response.data.map((participant) => ({
      FirstName: participant.user.first_name,
      LastName: participant.user.last_name,
      Email: participant.user.email,
    }));

    const csv = Papa.unparse(flattenedObjs);
    const file = new File([csv], "ParticipantsEmailInfo.csv", {
      type: "text/csv;charset=utf-8",
    });
    saveAs(file);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography>Actions</Typography>
      <Grid container rowSpacing={2} columnSpacing={2}>
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
        <Grid>
          <Button
            onClick={() => {
              void downloadInvalidSwimTimeParticipants();
            }}
            variant={"contained"}
          >
            Download Invalid Swim Time Participants
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={() => {
              void downloadParticipantEmailInfo();
            }}
            variant={"contained"}
          >
            Download Participant Email Info
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
