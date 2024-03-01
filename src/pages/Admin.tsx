import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { flatten } from "flat";
import { useMemo } from "react";
import { useFormik } from "formik";
import {
  EditableRowStackSelectField,
  EditableRowStackSwitch,
} from "../components/EditableRowComponents.tsx";
import { Components } from "../services/api/openapi";
import { useQuery } from "@tanstack/react-query";

import * as Yup from "yup";

const race_id = 1;

function RaceParticipantMassPatch() {
  const { getApiClient } = useApiServiceContext();

  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object({
    race: Yup.object().required(),
    waiver_signed: Yup.boolean().notRequired(),
    is_ftt: Yup.boolean().notRequired(),
    race_type: Yup.object().notRequired(),
  });

  const formik = useFormik<
    Components.Schemas.MassPatchParticipantSchema & {
      race_type: Components.Schemas.RaceTypeSchema | undefined;
      race: Components.Schemas.RaceSchema | undefined;
    }
  >({
    initialValues: {
      race: undefined,
      waiver_signed: false,
      is_ftt: false,
      race_type: undefined,
    },
    validationSchema: schema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const api = await getApiClient();
      const response = await api.race_api_race_api_patch_race_participants(
        {
          race_id: values.race?.id ?? -1,
          race_type_id: values.race_type?.id ?? undefined,
        },
        {
          waiver_signed: values.waiver_signed,
          is_ftt: values.is_ftt,
        },
      );

      enqueueSnackbar(`Changes done, ${response.data} isntances changed.`, {
        variant: "success",
      });
    },
  });

  const racesQuery = useQuery({
    queryKey: ["getRaces"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_race_api_get_races())
        .then((res) => res.data),
  });

  const racesOptions = useMemo(() => {
    return (
      racesQuery.data?.map((race) => {
        return { key: race.name, value: race.id ?? -1 };
      }) ?? []
    );
  }, [racesQuery.data]);

  const raceTypesQuery = useQuery({
    queryKey: ["raceTypes"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_race_type_api_get_race_types())
        .then((res) => res.data),
  });

  const raceTypeOptions = useMemo(() => {
    return (
      raceTypesQuery.data?.map((raceType) => {
        return { key: raceType.name, value: raceType.id ?? -1 };
      }) ?? []
    );
  }, [raceTypesQuery.data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container gap={2}>
        <Grid>
          {racesQuery.isLoading ? (
            <Skeleton />
          ) : racesQuery.isError || racesQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <EditableRowStackSelectField
              label={"Race:"}
              value={formik.values.race?.id}
              valueLabel={formik.values.race?.name}
              editing={true}
              id={"race"}
              error={formik.errors.race}
              options={racesOptions}
              onChange={(event) => {
                void formik.setFieldValue(
                  "race",
                  racesQuery.data.find(
                    (race) => race.id === event.target.value,
                  ),
                );
              }}
            />
          )}
        </Grid>
        <Grid>
          {raceTypesQuery.isLoading ? (
            <Skeleton />
          ) : raceTypesQuery.isError || raceTypesQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <EditableRowStackSelectField
              label={"Race Type:"}
              value={formik.values.race_type?.id}
              valueLabel={formik.values.race_type?.name}
              editing={true}
              id={"race_type"}
              error={formik.errors.race_type}
              options={raceTypeOptions}
              onChange={(event) => {
                void formik.setFieldValue(
                  "race_type",
                  raceTypesQuery.data.find(
                    (race_type) => race_type.id === event.target.value,
                  ),
                );
              }}
            />
          )}
        </Grid>
        <Grid>
          <EditableRowStackSwitch
            label={"Is FTT:"}
            checked={formik.values.is_ftt ?? false}
            editing={true}
            id={"is_ftt"}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid>
          <EditableRowStackSwitch
            label={"Waiver Signed:"}
            checked={formik.values.waiver_signed ?? false}
            editing={true}
            id={"waiver_signed"}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid>
          <Button variant="contained" type={"submit"} color={"success"}>
            Change
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

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

  const downloadAllParticipantInfo = async () => {
    const api = await getApiClient();
    const response =
      await api.race_api_race_api_get_race_participant_download_info({
        race_id: race_id,
        active: true,
      });

    const flattenedObjs = response.data.map((participant) =>
      flatten(participant),
    );

    const csv = Papa.unparse(flattenedObjs);
    const file = new File([csv], "ParticipantInfo.csv", {
      type: "text/csv;charset=utf-8",
    });
    saveAs(file);
  };

  const downloadAllRelayTeamInfo = async () => {
    const api = await getApiClient();
    const response =
      await api.race_api_race_api_get_race_relay_team_download_info({
        race_id: race_id,
        active: true,
      });

    const flattenedObjs = response.data.map((participant) =>
      flatten(participant),
    );

    const csv = Papa.unparse(flattenedObjs);
    const file = new File([csv], "RelayTeamInfo.csv", {
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
              void downloadAllParticipantInfo();
            }}
            variant={"contained"}
          >
            Download All Participant Info
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={() => {
              void downloadAllRelayTeamInfo();
            }}
            variant={"contained"}
          >
            Download All Relay Team Info
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
        <Grid>
          <Card>
            <CardContent>
              <Box sx={{ m: 1 }}>
                <Typography>Mass Edits: </Typography>
              </Box>
              <RaceParticipantMassPatch />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
