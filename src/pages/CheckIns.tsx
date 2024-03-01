import {
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
  IconButton,
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
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EditableRowStackSelectField,
  EditableRowStackTextField,
} from "../components/EditableRowComponents.tsx";
import { useNavigate } from "react-router-dom";
import { DeleteSharp } from "@mui/icons-material";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import getChangedValues from "../services/helpers.ts";

function CreateCheckInDialog(props: {
  isOpen: boolean;
  handleClose: () => void;
  checkIns: Components.Schemas.CheckInSchema[];
}) {
  const queryClient = useQueryClient();

  const { getApiClient } = useApiServiceContext();

  const CheckInCreateSchema: Yup.ObjectSchema<Components.Schemas.CreateCheckInSchema> =
    Yup.object({
      name: Yup.string().required(),
      positive_action: Yup.string().required(),
      negative_action: Yup.string().required(),
      depends_on: Yup.lazy(() =>
        CheckInCreateSchema.default(null).notRequired(),
      ).optional(),
    });

  const formik = useFormik<Components.Schemas.CreateCheckInSchema>({
    initialValues: {
      name: "",
      positive_action: "Check-In",
      negative_action: "Check-Out",
      depends_on: null,
    },
    validationSchema: CheckInCreateSchema,
    onSubmit: async (values) => {
      const api = await getApiClient();
      const response = await api.checkins_api_create_checkin(null, values);

      queryClient.setQueryData(
        ["checkinsQuery"],
        (oldData: Components.Schemas.CheckInSchema[]) => {
          oldData.push(response.data);
          return oldData;
        },
      );
      props.handleClose();
    },
  });

  const options = useMemo(() => {
    const options = props.checkIns.map((checkIn) => {
      return { key: checkIn.name, value: checkIn.id ?? -1 };
    });

    options.push({ key: "", value: -1 });

    return options;
  }, [props.checkIns]);

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
              label={"Name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              id={"name"}
              error={formik.errors.name != undefined}
              helperText={formik.errors.name ?? ""}
            />
            <TextField
              label={"Positive Action Verb:"}
              value={formik.values.positive_action}
              onChange={formik.handleChange}
              id={"positive_action"}
              error={formik.errors.positive_action != undefined}
              helperText={formik.errors.positive_action ?? ""}
            />
            <TextField
              label={"Negative Action Verb"}
              value={formik.values.negative_action}
              onChange={formik.handleChange}
              id={"negative_action"}
              error={formik.errors.negative_action != undefined}
              helperText={formik.errors.negative_action ?? ""}
            />
            <EditableRowStackSelectField
              label={"Depends On:"}
              value={formik.values.depends_on?.id ?? -1}
              valueLabel={formik.values.depends_on?.name ?? ""}
              editing={true}
              id={"depends_on"}
              error={formik.errors.depends_on}
              options={options}
              onChange={(event) => {
                void formik.setFieldValue(
                  "depends_on",
                  props.checkIns.find(
                    (checkin) => checkin.id === event.target.value,
                  ),
                );
              }}
            />
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

function CheckInListCard(props: {
  activeCheckInId: number;
  setActiveCheckInId: (arg0: number) => void;
}) {
  const queryClient = useQueryClient();

  const { getApiClient } = useApiServiceContext();

  const checkinsQuery = useQuery({
    queryKey: ["checkinsQuery"],
    queryFn: () =>
      getApiClient().then((apiClient) =>
        apiClient.checkins_api_get_checkins().then((res) => res.data),
      ),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleHeatDelete = async (checkinId: number) => {
    const api = await getApiClient();
    await api.checkins_api_delete_checkin({ check_in_id: checkinId });

    queryClient.setQueryData(
      ["checkinsQuery"],
      (oldData: Components.Schemas.CheckInSchema[]) => {
        return oldData.filter((value) => value.id != checkinId);
      },
    );
  };

  return (
    <CustomCard title={"CheckIns"}>
      {checkinsQuery.data == undefined ? (
        <Skeleton />
      ) : (
        <CreateCheckInDialog
          isOpen={isDialogOpen}
          handleClose={() => {
            setIsDialogOpen(false);
          }}
          checkIns={checkinsQuery.data}
        />
      )}
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
      </Grid>
      <Divider />
      <Stack spacing={2} sx={{ mt: 2 }}>
        {checkinsQuery.isLoading ? (
          <Skeleton variant={"rectangular"} />
        ) : checkinsQuery.data === undefined ? (
          <div>Error...</div>
        ) : (
          checkinsQuery.data.map((checkin) => {
            return (
              <Card
                sx={
                  checkin.id === props.activeCheckInId
                    ? {
                        border: 2,
                        borderColor: "success.main",
                      }
                    : {}
                }
                key={checkin.id}
              >
                <CardContent>
                  <Grid container>
                    <Grid
                      xs={10}
                      onClick={() => {
                        if (checkin.id) {
                          props.setActiveCheckInId(checkin.id);
                        }
                      }}
                    >
                      <Typography variant={"body1"}>{checkin.name}</Typography>
                    </Grid>
                    <Grid xs>
                      <IconButton
                        onClick={() => {
                          void handleHeatDelete(checkin.id ?? -1);
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
    </CustomCard>
  );
}

function CheckinInformationForm(props: {
  checkin: Components.Schemas.CheckInSchema;
  onCheckinUpdate: (arg0: Components.Schemas.CheckInSchema) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { getApiClient } = useApiServiceContext();

  const checkinsQuery = useQuery({
    queryKey: ["checkinsQuery"],
    queryFn: () =>
      getApiClient().then((apiClient) =>
        apiClient.checkins_api_get_checkins().then((res) => res.data),
      ),
  });

  //@ts-expect-error Unknown error here
  const CheckinPatchSchema: Yup.ObjectSchema<Components.Schemas.PatchCheckInSchema> =
    Yup.object({
      name: Yup.string().required(),
      positive_action: Yup.string().required(),
      negative_action: Yup.string().required(),
      depends_on: Yup.lazy(() =>
        CheckinPatchSchema.default(null).notRequired(),
      ).optional(),
    });

  const initialValues = useMemo(() => {
    return {
      name: props.checkin.name,
      positive_action: props.checkin.positive_action,
      negative_action: props.checkin.negative_action,
      depends_on: props.checkin.depends_on ?? null,
    };
  }, [props.checkin]);

  const options = useMemo(() => {
    if (checkinsQuery.data != undefined) {
      return checkinsQuery.data.map((checkIn) => {
        return { key: checkIn.name, value: checkIn.id ?? -1 };
      });
    }
    return null;
  }, [checkinsQuery.data]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CheckinPatchSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);

      const api = await getApiClient();
      const response = await api.checkins_api_update_checkin(
        { check_in_id: props.checkin.id ?? -1 },
        changedValues,
      );

      props.onCheckinUpdate(response.data);
      enqueueSnackbar("CheckIn updated successfully!", { variant: "success" });
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
              label={"Name: "}
              data={formik.values.name}
              editing={isEditing}
              id={"name"}
              error={formik.errors.name}
              onChange={formik.handleChange}
            />
            <EditableRowStackTextField
              label={"Positive Action Verb: "}
              data={formik.values.positive_action}
              editing={isEditing}
              id={"positive_action"}
              error={formik.errors.positive_action}
              onChange={formik.handleChange}
            />
            <EditableRowStackTextField
              label={"Negative Action Verb: "}
              data={formik.values.negative_action}
              editing={isEditing}
              id={"negative_action"}
              error={formik.errors.negative_action}
              onChange={formik.handleChange}
            />
            {checkinsQuery.isLoading ? (
              <Skeleton />
            ) : checkinsQuery.isError || checkinsQuery.data === undefined ? (
              <>Error...</>
            ) : (
              <EditableRowStackSelectField
                label={"Depends On:"}
                value={formik.values.depends_on?.id ?? -1}
                valueLabel={formik.values.depends_on?.name ?? ""}
                editing={isEditing}
                id={"depends_on"}
                error={formik.errors.depends_on}
                options={options}
                onChange={(event) => {
                  void formik.setFieldValue(
                    "depends_on",
                    checkinsQuery.data.find(
                      (checkin) => checkin.id === event.target.value,
                    ),
                  );
                }}
              />
            )}
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

function CheckinRaceTypesList(props: { checkinId: number }) {
  const navigator = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const raceTypesQuery = useQuery({
    queryKey: ["getRaceTypesForCheckin", props.checkinId],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.checkins_api_get_check_in_race_types({
            check_in_id: props.checkinId,
          }),
        )
        .then((res) => res.data),
  });

  return raceTypesQuery.isLoading ? (
    <Skeleton variant={"rectangular"} />
  ) : raceTypesQuery.isError || raceTypesQuery.data === undefined ? (
    <div>Error... {raceTypesQuery.error?.message}</div>
  ) : (
    <Grid container spacing={2}>
      {raceTypesQuery.data.map((raceType) => {
        return (
          <Grid key={raceType.id} xs={6}>
            <Card>
              <ButtonBase
                sx={{ width: "100%", justifyContent: "start" }}
                onClick={() => {
                  navigator(`/races`);
                }}
              >
                <CardContent>
                  <Typography variant={"body1"}>{raceType.name}</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

function CheckinInformationCard(props: { checkinId: number }) {
  const { getApiClient } = useApiServiceContext();

  const checkinQuery = useQuery({
    queryKey: ["getCheckinQuery", props.checkinId],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.checkins_api_get_checkin({ check_in_id: props.checkinId }),
        )
        .then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const handelCheckinUpdate = (checkin: Components.Schemas.CheckInSchema) => {
    queryClient.setQueryData(["getCheckinQuery", checkin.id], checkin);
  };

  return checkinQuery.isLoading ? (
    <Skeleton variant={"rectangular"} />
  ) : checkinQuery.isError || !checkinQuery.data ? (
    <div>Error...</div>
  ) : (
    <Card
      variant={"outlined"}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box textAlign={"center"} sx={{ p: 0.75 }}>
        <Typography variant={"h5"} component={"div"}>
          {checkinQuery.data.name}
        </Typography>
      </Box>
      <Divider />
      <Grid>
        <CheckinInformationForm
          checkin={checkinQuery.data}
          onCheckinUpdate={handelCheckinUpdate}
        />
      </Grid>
      <Divider flexItem />
      <Box sx={{ p: 2 }}>
        <CheckinRaceTypesList checkinId={props.checkinId} />
      </Box>
    </Card>
  );
}

const Checkins = () => {
  const [activeCheckinId, setActiveCheckinId] = useState<number | null>(null);

  return (
    <Box sx={{ height: "100%", px: 5 }}>
      <Grid container spacing={4} sx={{ height: "100%", mt: 2 }}>
        <Grid xs={4}>
          <CheckInListCard
            activeCheckInId={activeCheckinId ?? -1}
            setActiveCheckInId={setActiveCheckinId}
          />
        </Grid>
        <Grid xs>
          {activeCheckinId != null ? (
            <CheckinInformationCard checkinId={activeCheckinId} />
          ) : (
            <div>Select a CheckIn first!</div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkins;
