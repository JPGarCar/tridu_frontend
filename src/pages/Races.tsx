import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CustomCard from "../components/CustomCard.tsx";
import { DeleteSharp, Edit } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Components } from "../services/api/openapi";
import { useState } from "react";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import getChangedValues from "../services/helpers.ts";
import { useSnackbarServiceContext } from "../context/SnackbarContext.tsx";

function CreateRaceTypeDialog(props: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { getApiClient } = useApiServiceContext();

  const HeatFormCreateSchema = Yup.object({
    name: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: HeatFormCreateSchema,
    onSubmit: async (values) => {
      const api = await getApiClient();
      const response = await api.race_api_race_type_api_create_race_type(null, {
        name: values.name,
      });

      queryClient.setQueryData(
        ["getRaceTypes"],
        (oldData: Components.Schemas.RaceTypeSchema[]) => {
          oldData.push(response.data);
          return oldData;
        },
      );
      props.handleClose();
    },
  });

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.handleClose();
      }}
    >
      <DialogTitle>Create Heat</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            label={"Name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            id={"name"}
            error={formik.errors.name != undefined}
            helperText={formik.errors.name ?? ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          <Button type={"submit"} color={"success"}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function EditRaceTypeDialog(props: {
  isOpen: boolean;
  handleClose: (arg0: Components.Schemas.RaceTypeSchema | null) => void;
  raceType: Components.Schemas.RaceTypeSchema | null;
}) {
  const { getApiClient } = useApiServiceContext();

  const { pushAlert } = useSnackbarServiceContext();

  const HeatFormCreateSchema = Yup.object({
    name: Yup.string().required(),
    participants_allowed: Yup.number().default(0).min(0),
    ftt_allowed: Yup.number().default(0).min(0),
  });

  const initialValues =
    props.raceType == null
      ? {
          name: "",
          participants_allowed: 0,
          ftt_allowed: 0,
        }
      : {
          name: props.raceType.name,
          participants_allowed: props.raceType.participants_allowed,
          ftt_allowed: props.raceType.ftt_allowed,
        };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: HeatFormCreateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);

      const api = await getApiClient();
      const response = await api.race_api_race_type_api_update_race_type(
        { race_type_id: props.raceType?.id ?? 0 },
        changedValues,
      );

      props.handleClose(response.data);
      pushAlert(
        `${props.raceType?.name} Race Type updated successfully!`,
        "success",
      );
    },
  });

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.handleClose(null);
      }}
    >
      <DialogTitle>Update Race Type</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label={"Name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              id={"name"}
              error={formik.errors.name != undefined}
              helperText={formik.errors.name ?? ""}
            />
            <TextField
              label={"Participants Allowed"}
              type={"number"}
              value={formik.values.participants_allowed}
              onChange={formik.handleChange}
              id={"participants_allowed"}
              error={formik.errors.participants_allowed != undefined}
              helperText={formik.errors.participants_allowed ?? ""}
            />
            <TextField
              label={"FTT Participants Allowed"}
              type={"number"}
              value={formik.values.ftt_allowed}
              onChange={formik.handleChange}
              id={"ftt_allowed"}
              error={formik.errors.ftt_allowed != undefined}
              helperText={formik.errors.ftt_allowed ?? ""}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose(null);
            }}
          >
            Cancel
          </Button>
          <Button type={"submit"} color={"success"}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const Races = () => {
  const queryClient = useQueryClient();

  const { getApiClient } = useApiServiceContext();

  const [editRaceTypeDialogInfo, setEditRaceTypeDialogInfo] = useState<{
    isOpen: boolean;
    raceType: Components.Schemas.RaceTypeSchema | null;
  }>({
    isOpen: false,
    raceType: null,
  });

  const [createRaceTypeDialogIsOpen, setCreateRaceTypeDialogIsOpen] =
    useState(false);

  const raceTypesQuery = useQuery({
    queryKey: ["getRaceTypes"],
    queryFn: () =>
      getApiClient().then((client) =>
        client.race_api_race_type_api_get_race_types().then((res) => res.data),
      ),
  });

  const racesQuery = useQuery({
    queryKey: ["getRaces"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_race_api_get_races())
        .then((res) => res.data),
  });

  const handleEditDialogClose = (
    raceType: Components.Schemas.RaceTypeSchema | null,
  ) => {
    if (raceType != null) {
      queryClient.setQueryData(
        ["getRaceTypes"],
        (oldRaceTypes: Components.Schemas.RaceTypeSchema[]) => {
          const index = oldRaceTypes.findIndex(
            (raceTypeFromList) => raceTypeFromList.id == raceType.id,
          );
          const newRaceTypes = oldRaceTypes;
          if (index > -1) {
            newRaceTypes[index] = raceType;
          }
          return newRaceTypes;
        },
      );
    }

    setEditRaceTypeDialogInfo({
      isOpen: false,
      raceType: null,
    });
  };

  return (
    <Grid container justifyContent={"space-around"} sx={{ mt: 4 }}>
      <Grid xs={5}>
        <CustomCard title={"Races"}>
          <Grid sx={{ pt: 0, pb: 2 }}>
            <Button
              size={"small"}
              color={"success"}
              variant={"outlined"}
              disabled
            >
              New
            </Button>
          </Grid>
          <Divider />
          <Stack spacing={2} sx={{ mt: 2 }}>
            {racesQuery.isLoading ? (
              <Skeleton variant={"rectangular"} />
            ) : racesQuery.data === undefined ? (
              <div>Error...</div>
            ) : (
              racesQuery.data.map((race) => {
                return (
                  <Card key={race.id}>
                    <CardContent>
                      <Grid container>
                        <Grid xs={10}>
                          <Typography variant={"body1"}>{race.name}</Typography>
                        </Grid>
                        <Grid xs>
                          <IconButton disabled>
                            <DeleteSharp color={"error"} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Stack>
        </CustomCard>
      </Grid>
      <Grid xs={5}>
        <CustomCard title={"Race Types"}>
          <Grid sx={{ pt: 0, pb: 2 }}>
            <Button
              size={"small"}
              color={"success"}
              variant={"outlined"}
              onClick={() => {
                setCreateRaceTypeDialogIsOpen(true);
              }}
            >
              New
            </Button>
            <CreateRaceTypeDialog
              isOpen={createRaceTypeDialogIsOpen}
              handleClose={() => {
                setCreateRaceTypeDialogIsOpen(false);
              }}
            />
            <EditRaceTypeDialog
              isOpen={editRaceTypeDialogInfo.isOpen}
              handleClose={handleEditDialogClose}
              raceType={editRaceTypeDialogInfo.raceType}
            />
          </Grid>
          <Divider />
          <Stack spacing={2} sx={{ mt: 2 }}>
            {raceTypesQuery.isLoading ? (
              <Skeleton variant={"rectangular"} />
            ) : raceTypesQuery.data === undefined ? (
              <div>Error...</div>
            ) : (
              raceTypesQuery.data.map((raceType) => {
                return (
                  <Card key={raceType.id}>
                    <CardContent>
                      <Grid container>
                        <Grid xs={9}>
                          <Typography variant={"body1"}>
                            {raceType.name}
                          </Typography>
                        </Grid>
                        <Grid xs container justifyContent={"space-around"}>
                          <IconButton
                            onClick={() => {
                              setEditRaceTypeDialogInfo({
                                raceType: raceType,
                                isOpen: true,
                              });
                            }}
                          >
                            <Edit color={"success"} />
                          </IconButton>
                          <IconButton disabled>
                            <DeleteSharp color={"error"} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Stack>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Races;
