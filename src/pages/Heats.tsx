import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { Components } from "../services/api/openapi";
import CustomCard from "../components/CustomCard.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime, Duration } from "luxon";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EditableRowStackNumberField,
  EditableRowStackSelectField,
  EditableRowStackTextField,
  EditableRowStackTimeField,
} from "../components/EditableRowComponents.tsx";
import LabelValueRow from "../components/LabelValueRow.tsx";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers";
import { DeleteSharp } from "@mui/icons-material";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import getChangedValues from "../services/helpers.ts";

const PoolOptions = [
  { key: "RECREATION", value: "Recreation" },
  { key: "COMPETITIVE", value: "Competitive" },
  { key: "NONE", value: undefined },
];

function CreateHeatDialog(props: {
  isOpen: boolean;
  handleClose: () => void;
  raceId: number;
}) {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { getApiClient } = useApiServiceContext();

  const HeatFormCreateSchema = Yup.object({
    raceId: Yup.number().required("Required!"),
    raceType: Yup.string().required("Required!"),
    termination: Yup.string()
      .required("Required!")
      .length(1, "Length must be 1!"),
    color: Yup.string(),
    startDateTime: Yup.date().required("Required!"),
    idealCapacity: Yup.number().required("Required!").min(0, "Min value is 0!"),
    pool: Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      raceId: props.raceId,
      raceType: "",
      termination: "",
      startDateTime: DateTime.now(),
      color: "",
      idealCapacity: 0,
      pool: null,
    },
    validationSchema: HeatFormCreateSchema,
    onSubmit: async (values, formikHelpers) => {
      const api = await getApiClient();
      const response = await api.heats_api_create_heat(null, {
        race_id: values.raceId,
        race_type_id: parseInt(values.raceType),
        termination: values.termination,
        start_datetime: values.startDateTime.toISO(),
        color: values.color,
        ideal_capacity: values.idealCapacity,
        pool: values.pool,
      });

      queryClient.setQueryData(
        ["heatsQuery"],
        (oldData: Components.Schemas.HeatSchema[]) => {
          oldData.push(response.data);
          return oldData;
        },
      );
      enqueueSnackbar("Heat created!", { variant: "success" });
      formikHelpers.resetForm();
      props.handleClose();
    },
  });

  const raceTypesQuery = useQuery({
    queryKey: ["raceTypes"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_race_type_api_get_race_types())
        .then((res) => res.data),
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
          <Stack spacing={2}>
            <TextField
              label={"Category"}
              value={formik.values.termination}
              onChange={formik.handleChange}
              id={"termination"}
              error={formik.errors.termination != undefined}
              helperText={formik.errors.termination ?? ""}
            />
            <TextField
              label={"Color"}
              value={formik.values.color}
              onChange={formik.handleChange}
              id={"color"}
              error={formik.errors.color != undefined}
              helperText={formik.errors.color ?? ""}
            />
            <TextField
              label={"Ideal Capacity"}
              value={formik.values.idealCapacity}
              onChange={formik.handleChange}
              type={"number"}
              id={"idealCapacity"}
              error={formik.errors.idealCapacity != undefined}
              helperText={formik.errors.idealCapacity ?? ""}
            />
            <TimePicker
              label={"Start Time"}
              value={formik.values.startDateTime}
              onChange={(value) => {
                void formik.setFieldValue("startDateTime", value, true);
              }}
              slotProps={{
                textField: {
                  error: formik.errors.startDateTime != undefined,
                  helperText: formik.errors.startDateTime?.invalidReason ?? "",
                },
              }}
            />
            <FormControl>
              <InputLabel id={`label-for-pool`}>Pool</InputLabel>
              <Select
                name={"pool"}
                id={"pool"}
                labelId={`label-for-pool`}
                error={formik.errors.pool != null}
                label={"Pool"}
                value={formik.values.pool}
                onChange={formik.handleChange}
              >
                {PoolOptions.map(({ key, value }) => {
                  return (
                    <MenuItem key={value} value={value}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {raceTypesQuery.isLoading ? (
              <Skeleton variant={"rectangular"} />
            ) : raceTypesQuery.isError || raceTypesQuery.data == undefined ? (
              <div>Error... </div>
            ) : (
              <FormControl>
                <InputLabel id={`label-for-raceType`}>Race Type</InputLabel>
                <Select
                  name={"raceType"}
                  id={"raceType"}
                  labelId={`label-for-raceType`}
                  error={formik.errors.raceType != null}
                  label={"Race Type"}
                  value={formik.values.raceType}
                  onChange={formik.handleChange}
                >
                  {raceTypesQuery.data.map((raceType) => {
                    if (raceType.id != null)
                      return (
                        <MenuItem key={raceType.id} value={raceType.id}>
                          {raceType.name}
                        </MenuItem>
                      );
                  })}
                </Select>
              </FormControl>
            )}
          </Stack>
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

function AutoScheduleDialog(props: {
  isOpen: boolean;
  handleClose: () => void;
  raceId: number;
}) {
  const { getApiClient } = useApiServiceContext();
  const { enqueueSnackbar } = useSnackbar();

  const [goodToSchedule, setGoodToSchedule] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAutoSchedule = async () => {
    if (goodToSchedule) {
      const api = await getApiClient();
      const response = await api.race_api_race_api_auto_schedule_race_heats({
        race_id: props.raceId,
      });

      if (response.data) {
        enqueueSnackbar("Auto scheduling successful!", { variant: "success" });
        props.handleClose();
      } else {
        enqueueSnackbar("There was an error, please check in with Admin!", {
          variant: "error",
        });
      }
    }
  };

  const handleCheckAutoSchedule = async () => {
    const api = await getApiClient();
    const response =
      await api.race_api_race_api_get_race_ready_for_auto_schedule_heats({
        race_id: props.raceId,
      });

    if (response.data.length == 0) {
      setGoodToSchedule(true);
    } else {
      setErrors(response.data);
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.handleClose();
      }}
    >
      <DialogTitle>Heat Auto Schedule Wizzard</DialogTitle>
      <DialogContent>
        <Typography>
          This wizard will automatically schedule ALL participants and relay
          teams. Any existing assignments will be overwritten!
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container alignContent={"center"}>
          <Grid xs={6}>
            <Typography>
              Before continuing, check to see if your settings are good for the
              auto scheduler.
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Button
              onClick={() => {
                void handleCheckAutoSchedule();
              }}
              variant={"outlined"}
              color={"secondary"}
            >
              Check Settings
            </Button>
          </Grid>
        </Grid>
        {goodToSchedule ? (
          <Typography>System looks good!</Typography>
        ) : errors.length > 0 ? (
          <Stack spacing={2}>
            {errors.map((error, index) => (
              <Alert severity={"warning"} key={index}>
                {error}
              </Alert>
            ))}
          </Stack>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          type={"button"}
          color={"success"}
          disabled={!goodToSchedule}
          onClick={() => {
            void handleAutoSchedule();
          }}
        >
          Auto Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function HeatListCard(props: {
  activeHeatId: number;
  setActiveHeatId: (arg0: number) => void;
}) {
  const raceId = 1;

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { getApiClient } = useApiServiceContext();

  const heatsQuery = useQuery({
    queryKey: ["heatsQuery"],
    queryFn: () =>
      getApiClient().then((apiClient) =>
        apiClient
          .race_api_race_api_get_race_heats({ race_id: raceId })
          .then((res) => res.data),
      ),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isAutoScheduleDialogOpen, setIsAutoScheduleDialogOpen] =
    useState(false);

  const getFormattedHeatStartDateTime = (datetimeString: string) => {
    const dateTime = DateTime.fromISO(datetimeString);

    return dateTime.toFormat("t");
  };

  const handleHeatDelete = async (heatId: number) => {
    const api = await getApiClient();
    await api.heats_api_delete_heat({ heat_id: heatId });

    queryClient.setQueryData(
      ["heatsQuery"],
      (oldData: Components.Schemas.HeatSchema[]) => {
        return oldData.filter((value) => value.id != heatId);
      },
    );
    enqueueSnackbar("Heat deleted!", { variant: "success" });
  };

  return (
    <CustomCard title={"Heats"}>
      <CreateHeatDialog
        isOpen={isDialogOpen}
        handleClose={() => {
          setIsDialogOpen(false);
        }}
        raceId={raceId}
      />
      <AutoScheduleDialog
        isOpen={isAutoScheduleDialogOpen}
        handleClose={() => {
          setIsAutoScheduleDialogOpen(false);
          void heatsQuery.refetch();
        }}
        raceId={raceId}
      />
      <Grid sx={{ pt: 0, pb: 2 }} container gap={2}>
        <Grid>
          <Button
            size={"small"}
            color={"success"}
            variant={"outlined"}
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            New
          </Button>
        </Grid>
        <Grid>
          <Button
            size={"small"}
            variant={"outlined"}
            color={"success"}
            onClick={() => {
              setIsAutoScheduleDialogOpen(true);
            }}
          >
            Auto Schedule
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {heatsQuery.isLoading ? (
            <Skeleton variant={"rectangular"} />
          ) : heatsQuery.data === undefined ? (
            <div>Error...</div>
          ) : (
            heatsQuery.data.map((heat) => {
              return (
                <Card
                  sx={
                    heat.id === props.activeHeatId
                      ? {
                          border: 2,
                          borderColor: "success.main",
                        }
                      : {}
                  }
                  key={heat.id}
                >
                  <CardContent>
                    <Grid container>
                      <Grid
                        xs={10}
                        onClick={() => {
                          if (heat.id) {
                            props.setActiveHeatId(heat.id);
                          }
                        }}
                      >
                        <Typography
                          variant={"body1"}
                        >{`${heat.race_type.name} ${heat.termination} - ${heat.participant_count}/${heat.ideal_capacity}`}</Typography>
                        <Typography variant={"caption"}>
                          {getFormattedHeatStartDateTime(heat.start_datetime)} |{" "}
                          {heat.pool} Pool
                        </Typography>
                      </Grid>
                      <Grid xs>
                        <IconButton
                          onClick={() => {
                            void handleHeatDelete(heat.id ?? -1);
                          }}
                        >
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
      </Box>
    </CustomCard>
  );
}

function HeatInformationForm(props: {
  heat: Components.Schemas.HeatSchema;
  onHeatUpdate: (arg0: Components.Schemas.HeatSchema) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { getApiClient } = useApiServiceContext();

  const HeatFormSchema = Yup.object({
    termination: Yup.string().length(1, "Length must be 1!"),
    color: Yup.string(),
    start_datetime: Yup.date().required(),
    ideal_capacity: Yup.number().required().min(0, "Min value is 0!"),
    pool: Yup.string().notRequired(),
  });

  const initalValues = useMemo(() => {
    return {
      termination: props.heat.termination,
      color: props.heat.color,
      start_datetime: DateTime.fromISO(props.heat.start_datetime),
      ideal_capacity: props.heat.ideal_capacity,
      pool: props.heat.pool,
    };
  }, [props.heat]);

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: HeatFormSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initalValues);

      if ("start_datetime" in changedValues && changedValues.start_datetime) {
        // @ts-expect-error We must return an ISO string, so its fine
        changedValues.start_datetime = changedValues.start_datetime.toISO();
      }

      const api = await getApiClient();
      const response = await api.heats_api_update_heat(
        //@ts-expect-error I don't know why this is happens!
        { heat_id: props.heat.id ?? undefined },
        changedValues,
      );

      props.onHeatUpdate(response.data);
      setIsEditing(false);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      enqueueSnackbar("Changes canceled!", { variant: "warning" });
    }
    setIsEditing((prevState) => !prevState);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container flexDirection={"column"} sx={{ m: 2 }}>
        <Grid sx={{ ml: 2 }}>
          <Stack spacing={2}>
            <EditableRowStackTextField
              label={"Category: "}
              data={formik.values.termination}
              editing={isEditing}
              id={"termination"}
              error={formik.errors.termination}
              onChange={formik.handleChange}
            />
            <EditableRowStackTextField
              label={"Color: "}
              data={formik.values.color}
              editing={isEditing}
              id={"color"}
              error={formik.errors.color}
              onChange={formik.handleChange}
            />
            <EditableRowStackNumberField
              label={"Ideal Capacity: "}
              data={formik.values.ideal_capacity}
              editing={isEditing}
              id={"ideal_capacity"}
              error={formik.errors.ideal_capacity}
              onChange={formik.handleChange}
            />
            <EditableRowStackSelectField
              label={"Pool: "}
              value={formik.values.pool}
              valueLabel={formik.values.pool}
              editing={isEditing}
              id={"pool"}
              error={formik.errors.pool}
              onChange={formik.handleChange}
              options={PoolOptions}
            />
            <EditableRowStackTimeField
              label={"Start Time: "}
              data={formik.values.start_datetime}
              editing={isEditing}
              id={"start_datetime"}
              error={formik.errors.start_datetime}
              setFieldValue={(arg0, arg1, arg2) => {
                void formik.setFieldValue(arg0, arg1, arg2);
              }}
            />
          </Stack>
        </Grid>
        <Grid>
          <Button onClick={handleEditButton}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing ? (
            <Button type={"submit"} color={"success"}>
              Save
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </form>
  );
}

function HeatParticipantList(props: { heatId: number }) {
  const navigator = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const participantsQuery = useQuery({
    queryKey: ["getParticipantsForHeat", props.heatId],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.heats_api_get_heat_participations({
            heat_id: props.heatId,
          }),
        )
        .then((res) => res.data),
  });

  const getFormattedSwimTime = (swimTimeString: string | null): string => {
    if (!swimTimeString) {
      return "";
    }

    const duration = Duration.fromISO(swimTimeString).shiftTo(
      "minutes",
      "seconds",
    );

    return duration.toFormat("mm:ss");
  };

  return participantsQuery.isLoading ? (
    <Skeleton variant={"rectangular"} />
  ) : participantsQuery.isError || participantsQuery.data === undefined ? (
    <div>Error... {participantsQuery.error?.message}</div>
  ) : (
    <Grid container spacing={2}>
      {participantsQuery.data
        .sort((a, b) => b.swim_time?.localeCompare(a.swim_time ?? "") ?? -1)
        .map((participant) => {
          return (
            <Grid key={participant.id} xs={6}>
              <Card>
                <ButtonBase
                  sx={{ width: "100%", justifyContent: "start" }}
                  onClick={() => {
                    navigator(`/participants/${participant.user.id}`);
                  }}
                >
                  <CardContent>
                    <Typography variant={"body1"}>
                      {participant.bib_number} |{" "}
                      {`${participant.user.first_name} ${participant.user.last_name}`}
                    </Typography>
                    <Typography variant={"body2"}>
                      Swim Time:{" "}
                      {getFormattedSwimTime(participant.swim_time ?? null)}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

function HeatAdditionalInformation(props: {
  heat: Components.Schemas.HeatSchema;
}) {
  const formattedAvgSwimTime = (avgSwimTimeString: string) => {
    const dateTime = Duration.fromISO(avgSwimTimeString).shiftTo(
      "minutes",
      "seconds",
    );

    return dateTime.toFormat("mm:ss");
  };

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <LabelValueRow
        label={"Average Swim Time: "}
        value={formattedAvgSwimTime(props.heat.avg_swim_time)}
      />
      <LabelValueRow
        label={"Amount of Participants: "}
        value={props.heat.participant_count.toString()}
      />
    </Stack>
  );
}

function HeatInformationCard(props: { heatId: number }) {
  const { getApiClient } = useApiServiceContext();

  const heatQuery = useQuery({
    queryKey: ["getHeatQuery", props.heatId],
    queryFn: () =>
      getApiClient()
        .then((api) => api.heats_api_get_heat({ heat_id: props.heatId }))
        .then((res) => res.data),
  });

  const heat = heatQuery.data;

  const queryClient = useQueryClient();

  const handelHeatUpdate = (heat: Components.Schemas.HeatSchema) => {
    queryClient.setQueryData(["getHeatQuery", heat.id], heat);
    queryClient.setQueryData(
      ["heatsQuery"],
      (oldHeats: Components.Schemas.HeatSchema[]) => {
        const index = oldHeats.findIndex(
          (heatFromList) => heatFromList.id == heat.id,
        );
        const newHeats = oldHeats;
        if (index > -1) {
          newHeats[index] = heat;
        }
        return newHeats;
      },
    );
  };

  return heatQuery.isLoading ? (
    <Skeleton variant={"rectangular"} />
  ) : heatQuery.isError || !heat ? (
    <div>Error...</div>
  ) : (
    <Card
      variant={"outlined"}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box textAlign={"center"} sx={{ p: 0.75 }}>
        <Typography variant={"h5"} component={"div"}>
          {heat.race_type.name} - {heat.termination}
        </Typography>
      </Box>
      <Divider />
      <Grid container>
        <Grid xs={8}>
          <HeatInformationForm heat={heat} onHeatUpdate={handelHeatUpdate} />
        </Grid>
        <Grid xs>
          <HeatAdditionalInformation heat={heat} />
        </Grid>
      </Grid>
      <Divider flexItem />
      <Box sx={{ p: 2 }}>
        <HeatParticipantList heatId={props.heatId} />
      </Box>
    </Card>
  );
}

const Heats = () => {
  const [activeHeatId, setActiveHeatId] = useState<number | null>(null);

  return (
    <Box sx={{ height: "100%", px: 5 }}>
      <Grid container spacing={4} sx={{ height: "100%", mt: 2 }}>
        <Grid xs={4}>
          <HeatListCard
            activeHeatId={activeHeatId ?? -1}
            setActiveHeatId={setActiveHeatId}
          />
        </Grid>
        <Grid xs>
          {activeHeatId != null ? (
            <HeatInformationCard heatId={activeHeatId} />
          ) : (
            <div>Select a heat first!</div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Heats;
