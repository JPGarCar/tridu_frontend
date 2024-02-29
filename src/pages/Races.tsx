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
import { useMemo, useState } from "react";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import getChangedValues from "../services/helpers.ts";
import { useSnackbar } from "notistack";
import {
  EditableRowStackMultiSelectField,
  EditableRowStackSwitch,
} from "../components/EditableRowComponents.tsx";

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

  const { enqueueSnackbar } = useSnackbar();

  const checkinsQuery = useQuery({
    queryKey: ["checkinsQuery"],
    queryFn: () =>
      getApiClient().then((apiClient) =>
        apiClient.checkins_api_get_checkins().then((res) => res.data),
      ),
  });

  const checkinOptions = useMemo(() => {
    if (checkinsQuery.data) {
      return checkinsQuery.data.map((checkin) => ({
        key: checkin.name,
        value: checkin.id ?? -1,
      }));
    }
    return null;
  }, [checkinsQuery.data]);

  const RaceTypePatchSchema = Yup.object({
    name: Yup.string().required(),
    participants_allowed: Yup.number().default(0).min(0),
    ftt_allowed: Yup.number().default(0).min(0),
    needs_swim_time: Yup.boolean().required().default(true),
    checkins: Yup.array().of(Yup.object()).notRequired(),
  });

  const initialValues: Components.Schemas.RaceTypeSchema = useMemo(() => {
    return props.raceType == null
      ? {
          name: "",
          participants_allowed: 0,
          ftt_allowed: 0,
          needs_swim_time: true,
          checkins: [],
        }
      : {
          name: props.raceType.name,
          participants_allowed: props.raceType.participants_allowed,
          ftt_allowed: props.raceType.ftt_allowed,
          needs_swim_time: props.raceType.needs_swim_time,
          checkins: props.raceType.checkins ?? [],
        };
  }, [props.raceType]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RaceTypePatchSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);

      const api = await getApiClient();
      const response = await api.race_api_race_type_api_update_race_type(
        { race_type_id: props.raceType?.id ?? 0 },
        changedValues,
      );

      props.handleClose(response.data);
      enqueueSnackbar(
        `${props.raceType?.name} Race Type updated successfully!`,
        { variant: "success" },
      );
    },
  });

  const getMultiSelectValues = () => {
    return formik.values.checkins?.map((checkin) => checkin.id ?? -1) ?? [];
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.handleClose(null);
      }}
      fullWidth={true}
      maxWidth={"lg"}
    >
      <DialogTitle>Update Race Type</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container columnSpacing={2}>
            <Grid>
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
                <EditableRowStackSwitch
                  label={"Needs Swim Time"}
                  checked={formik.values.needs_swim_time}
                  editing={true}
                  id={"needs_swim_time"}
                  onChange={formik.handleChange}
                />
              </Stack>
            </Grid>
            <Grid>
              <EditableRowStackMultiSelectField
                label={"Check Ins"}
                value={getMultiSelectValues()}
                valueLabel={null}
                editing={true}
                id={"checkins"}
                error={undefined}
                options={checkinOptions}
                onChange={(event) => {
                  void formik.setFieldValue(
                    "checkins",
                    checkinsQuery.data?.filter((checkin) =>
                      //@ts-expect-error We know its right
                      event.target.value?.includes(checkin.id),
                    ) ?? [],
                  );
                }}
              />
            </Grid>
          </Grid>
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
                          <Typography variant={"subtitle2"}>
                            {raceType.needs_swim_time
                              ? "Needs Swim Time"
                              : "No Swim Time Needed"}
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
