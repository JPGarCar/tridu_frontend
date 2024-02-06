import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiClient } from "../services/api/api.ts";
import type { Components } from "../services/api/openapi";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Error, Send } from "@mui/icons-material";
import { DateTime, Duration } from "luxon";
import {
  EditableRowStackSelectField,
  EditableRowStackSwitch,
  EditableRowStackTextField,
} from "../components/EditableRowComponents.tsx";
import { getAxiosError } from "../services/api/apiError.ts";
import SnackbarServiceProvider, {
  useSnackbarServiceContext,
} from "../context/SnackbarContext.tsx";
import { CommentCard } from "../components/Comments.tsx";
import * as Yup from "yup";
import CustomCard from "../components/CustomCard.tsx";

function ParticipantPICard(props: { userId: string }) {
  const { pushAlert } = useSnackbarServiceContext();

  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["getUserById", props.userId],
    queryFn: () =>
      getApiClient()
        .then((client) => client.accounts_api_get_user_by_id(props.userId))
        .then((res) => res.data),
  });

  const user = userQuery.data as Components.Schemas.UserSchema;

  const [isEditing, setIsEditing] = useState(false);

  const UserFormSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    dob: Yup.string()
      .required()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Must format YYYY-MM-DD"),
    gender: Yup.string().required(),
    email: Yup.string().required().email("Must be an email!"),
    phone: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: userQuery.isLoading
      ? {
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          email: "",
          phone: "",
        }
      : {
          firstName: user.first_name,
          lastName: user.last_name,
          dob: user.date_of_birth,
          gender: user.gender,
          email: user.email,
          phone: user.phone_number,
        },
    validationSchema: UserFormSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const apiClient = await getApiClient();
      const response = await apiClient.accounts_api_update_user(
        { user_id: user.id ?? 0 },
        {
          first_name: values.firstName,
          last_name: values.lastName,
          date_of_birth: values.dob,
          gender: values.gender,
          email: values.email,
          phone_number: values.phone,
        },
      );

      if (response.status == 201) {
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
        queryClient.setQueryData(["getUserById", props.userId], response.data);
        setIsEditing(false);
        pushAlert("Edits saved successfully!", "success");
      }
    },
  });

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  return userQuery.isLoading ? (
    <Skeleton />
  ) : (
    <CustomCard title={"Personal Info"}>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Stack spacing={2} sx={{ ml: 2 }}>
            <EditableRowStackTextField
              label={"First Name:"}
              data={formik.values.firstName}
              id={"firstName"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.firstName}
            />
            <EditableRowStackTextField
              label={"Last Name:"}
              data={formik.values.lastName}
              id={"lastName"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.lastName}
            />
            <Stack direction={"row"} spacing={4}>
              <EditableRowStackTextField
                label={"DOB (Y-M-D):"}
                data={formik.values.dob}
                id={"dob"}
                editing={isEditing}
                onChange={formik.handleChange}
                error={formik.errors.dob}
              />
              <EditableRowStackTextField
                label={"Age:"}
                data={Math.abs(
                  DateTime.fromISO(formik.values.dob ?? "").minus({
                    year: DateTime.now().year,
                  }).year,
                ).toString()}
                editing={false}
                id={"age"}
                onChange={formik.handleChange}
                error={undefined}
              />
            </Stack>
            <EditableRowStackSelectField
              label={"Gender:"}
              value={formik.values.gender}
              valueLabel={formik.values.gender}
              id={"gender"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.gender}
              options={[
                { value: "U", key: "Undefined" },
                {
                  value: "M",
                  key: "Male",
                },
                { value: "F", key: "Female" },
                { value: "D", key: "Gender Diverse" },
              ]}
            />
            <EditableRowStackTextField
              label={"Email:"}
              data={formik.values.email}
              id={"email"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <EditableRowStackTextField
              label={"Phone #:"}
              data={formik.values.phone}
              id={"phone"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.phone}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button onClick={handleEditButton}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing ? (
            <Button type={"submit"} color={"success"}>
              Save
            </Button>
          ) : null}
        </CardActions>
      </form>
    </CustomCard>
  );
}

function ParticipantRaceListCard(props: {
  userId: string;
  activeParticipantId: number | null;
  setActiveParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
}) {
  const participantsQuery = useQuery({
    queryKey: ["getParticipantsForUser", props.userId],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.participants_api_get_participants_for_user(props.userId),
        )
        .then((res) => res.data),
  });

  const participants = participantsQuery.isLoading
    ? null
    : (participantsQuery.data as Components.Schemas.ParticipantSchema[]);

  useEffect(() => {
    if (participants && participants.length == 1) {
      props.setActiveParticipant(participants[0]);
    }
  }, [participants, props]);

  return participantsQuery.isLoading ? (
    <Skeleton />
  ) : (
    <CustomCard title={"Races"}>
      {participants ? (
        participants.length > 0 ? (
          <Stack spacing={2}>
            {participants.map((participant) => {
              return (
                <Card
                  sx={
                    participant.id === props.activeParticipantId
                      ? {
                          border: 2,
                          borderColor: "success.main",
                        }
                      : {}
                  }
                  key={participant.id}
                  onClick={() => {
                    props.setActiveParticipant(participant);
                  }}
                >
                  <CardContent>{participant.race.name}</CardContent>
                </Card>
              );
            })}
          </Stack>
        ) : (
          <div>No races!</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </CustomCard>
  );
}

function CommentInput(props: {
  participant_id: number;
  onCommentSubmit: () => void;
}) {
  const { pushAlert } = useSnackbarServiceContext();

  const formik = useFormik({
    initialValues: {
      commentText: "",
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const apiClient = await getApiClient();
      const response =
        await apiClient.participants_api_create_participant_comment(
          {
            participant_id: props.participant_id,
          },
          { comment: values.commentText },
        );

      if (response.status == 201) {
        props.onCommentSubmit();
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
        pushAlert("Comment added!", "success");
      } else {
        // todo
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl variant={"outlined"} fullWidth>
        <InputLabel htmlFor={"commentText"}>Comment</InputLabel>
        <OutlinedInput
          id={"commentText"}
          type={"text"}
          label={"Comment"}
          multiline
          value={formik.values.commentText}
          onChange={formik.handleChange}
          endAdornment={
            <InputAdornment position={"end"}>
              <IconButton type={"submit"}>
                <Send />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

function ParticipantInformation(props: {
  setParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
  participant: Components.Schemas.ParticipantSchema;
}) {
  const { pushAlert } = useSnackbarServiceContext();

  const swimTimeCreator = (swimTime: string | null): string => {
    if (swimTime == null) {
      return "N/A";
    }

    const duration = Duration.fromISO(swimTime).shiftTo("minutes", "seconds");

    return duration.toFormat("mm:ss");
  };

  const swimTimeDestructor = (swimTime: string): Duration | null => {
    if (swimTime == "") {
      return null;
    }
    const minutes = swimTime.substring(0, swimTime.indexOf(":"));
    const seconds = swimTime.substring(swimTime.indexOf(":") + 1);

    return Duration.fromObject({
      minutes: parseInt(minutes),
      second: parseInt(seconds),
    });
  };

  const ParticipantFormSchema = Yup.object({
    bib_num: Yup.number()
      .required()
      .positive("Must be positive!")
      .integer("Must be a full integer!"),
    is_ftt: Yup.boolean().required(),
    team: Yup.string().notRequired(),
    swimTime: Yup.string()
      .notRequired()
      .matches(/^\d{2}:\d{2}$/, "Must be in format MM:SS"),
    city: Yup.string().notRequired(),
    province: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      bib_num: props.participant.bib_number,
      is_ftt: props.participant.is_ftt,
      team: props.participant.team,
      swimTime: swimTimeCreator(props.participant.swim_time ?? null),
      city: props.participant.origin?.city ?? "",
      province: props.participant.origin?.province ?? "",
      country: props.participant.origin?.country ?? "",
      location: props.participant.location,
    },
    enableReinitialize: true,
    validationSchema: ParticipantFormSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const apiClient = await getApiClient();
      const response = await apiClient.participants_api_update_participant(
        { participant_id: props.participant.id ?? 0 },
        {
          bib_number: values.bib_num,
          is_ftt: values.is_ftt,
          team: values.team,
          swim_time: swimTimeDestructor(values.swimTime)?.toISO(),
          origin: {
            city: values.city,
            province: values.province,
            country: values.country,
          },
          location: values.location,
        },
      );

      if (response.status == 201) {
        formikHelpers.setSubmitting(false);
        props.setParticipant(response.data);
        setIsEditing(false);
        pushAlert("Edits saved successfully!", "success");
      }
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const deactivateParticipant = async () => {
    const api = await getApiClient();
    const response = await api.participants_api_deactivate_participant(
      props.participant.id ?? 0,
    );

    if (response.status == 201) {
      props.setParticipant(response.data);
    }

    return null;
  };

  const reactivateParticipant = async () => {
    const api = await getApiClient();
    const response = await api.participants_api_reactivate_participant(
      props.participant.id ?? 0,
    );

    if (response.status == 201) {
      props.setParticipant(response.data);
    }

    return null;
  };

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container flexDirection={"column"} sx={{ m: 2 }}>
        <Grid xs container spacing={2} sx={{ ml: 2 }}>
          <Grid xs={6}>
            <Stack spacing={2}>
              <EditableRowStackTextField
                label={"Bib #:"}
                data={formik.values.bib_num.toString()}
                editing={isEditing}
                id={"bib_num"}
                onChange={formik.handleChange}
                error={formik.errors.bib_num}
              />
              <EditableRowStackSwitch
                label={"Is FTT:"}
                checked={formik.values.is_ftt}
                editing={isEditing}
                id={"is_ftt"}
                onChange={formik.handleChange}
              />
              <EditableRowStackTextField
                label={"Team:"}
                data={formik.values.team}
                editing={isEditing}
                id={"team"}
                onChange={formik.handleChange}
                error={formik.errors.team}
              />
              <EditableRowStackTextField
                label={"Swim Time (MM:SS):"}
                data={formik.values.swimTime}
                editing={isEditing}
                id={"swimTime"}
                onChange={formik.handleChange}
                error={formik.errors.swimTime}
              />
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Stack spacing={2}>
              <EditableRowStackTextField
                label={"City:"}
                data={formik.values.city}
                editing={isEditing}
                id={"city"}
                onChange={formik.handleChange}
                error={formik.errors.city}
              />
              <EditableRowStackTextField
                label={"Province:"}
                data={formik.values.province}
                editing={isEditing}
                id={"province"}
                onChange={formik.handleChange}
                error={formik.errors.province}
              />
              <EditableRowStackTextField
                label={"Country:"}
                data={formik.values.country}
                editing={isEditing}
                id={"country"}
                onChange={formik.handleChange}
                error={formik.errors.country}
              />
              <EditableRowStackTextField
                label={"Location:"}
                data={formik.values.location}
                editing={isEditing}
                id={"location"}
                onChange={formik.handleChange}
                error={formik.errors.location}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid xs>
          <Button onClick={handleEditButton}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing ? (
            <Button type={"submit"} color={"success"}>
              Save
            </Button>
          ) : null}
          {props.participant.is_active ? (
            <Button
              color={"error"}
              onClick={() => {
                void deactivateParticipant();
              }}
            >
              De-Activate
            </Button>
          ) : (
            <Button
              color={"success"}
              onClick={() => {
                void reactivateParticipant();
              }}
            >
              Re-Activate
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

function ParticipantRaceType(props: {
  setParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
  participant: Components.Schemas.ParticipantSchema;
}) {
  const raceTypesQuery = useQuery({
    queryKey: ["getRaceTypes"],
    queryFn: () =>
      getApiClient().then((client) =>
        client.race_api_get_race_types().then((res) => res.data),
      ),
  });

  const [isEditing, setIsEditing] = useState(false);

  const { pushAlert } = useSnackbarServiceContext();

  const formik = useFormik({
    initialValues: {
      raceTypeId: props.participant.race_type.id,
    },
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const raceType = getRaceType(values.raceTypeId ?? 0);

      const api = await getApiClient();

      try {
        const response =
          await api.participants_api_change_participant_race_type(
            { participant_id: props.participant.id ?? 0 },
            raceType,
          );

        setIsEditing(false);
        props.setParticipant(response.data);
        formikHelpers.setSubmitting(false);
        pushAlert("Race type edit saved successfully!", "success");
      } catch (e) {
        const error = getAxiosError(e);

        if (error != null) {
          pushAlert(error.response?.data ?? "There was an error", "error");
        }
      }

      return null;
    },
  });

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  const getRaceType = (
    id: number,
  ): Components.Schemas.RaceTypeSchema | undefined => {
    if (raceTypesQuery.data == undefined) {
      return undefined;
    }

    return raceTypesQuery.data.find((raceType) => {
      return raceType.id == id;
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {raceTypesQuery.isLoading || raceTypesQuery.data == undefined ? (
        <Skeleton variant={"text"} />
      ) : (
        <EditableRowStackSelectField
          label={"Race Type:"}
          value={formik.values.raceTypeId}
          valueLabel={getRaceType(formik.values.raceTypeId ?? 0)?.name}
          editing={isEditing}
          id={"raceTypeId"}
          options={raceTypesQuery.data.map((racetype) => ({
            value: racetype.id ?? 0,
            key: racetype.name,
          }))}
          onChange={formik.handleChange}
          error={formik.errors.raceTypeId}
        />
      )}
      <Button onClick={handleEditButton}>
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      {isEditing ? (
        <Button type={"submit"} color={"success"}>
          Save
        </Button>
      ) : null}
    </form>
  );
}

function ParticipantRaceHeat(props: {
  setParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
  participant: Components.Schemas.ParticipantSchema;
}) {
  const raceHeatsQuery = useQuery({
    queryKey: ["getRaceHeats"],
    queryFn: () =>
      getApiClient().then((client) =>
        client
          .heats_api_get_heats_for_race({
            race_id: props.participant.race.id ?? 0,
          })
          .then((res) => res.data),
      ),
  });

  const [isEditing, setIsEditing] = useState(false);

  const { pushAlert } = useSnackbarServiceContext();

  const formik = useFormik({
    initialValues: {
      heatId: props.participant.heat?.id ?? -1,
    },
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const heat = getHeat(values.heatId);

      const api = await getApiClient();

      try {
        const response = await api.participants_api_change_participant_heat(
          { participant_id: props.participant.id ?? 0 },
          heat,
        );
        props.setParticipant(response.data);
        formikHelpers.setSubmitting(false);
        setIsEditing(false);
        pushAlert("Heat saved successfully!", "success");
      } catch (e) {
        const error = getAxiosError(e);

        if (error != null) {
          pushAlert(error.response?.data ?? "There was an error", "error");
        }
      }

      return null;
    },
  });

  const getHeat = (id: number): Components.Schemas.HeatSchema | undefined => {
    if (raceHeatsQuery.data == undefined) {
      return undefined;
    }

    return raceHeatsQuery.data.find((heat) => {
      return heat.id == id;
    });
  };

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  const handleRemoveButton = async () => {
    const api = await getApiClient();

    try {
      const response = await api.participants_api_remove_participant_heat({
        participant_id: props.participant.id ?? 0,
      });
      props.setParticipant(response.data);
      pushAlert("Removed from heat!", "success");
    } catch (e) {
      const error = getAxiosError(e);
      if (error != null) {
        pushAlert(error.response?.data ?? "There was an error", "error");
      }
    }

    return null;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {raceHeatsQuery.isLoading || raceHeatsQuery.data == undefined ? (
        <Skeleton variant={"text"} />
      ) : (
        <EditableRowStackSelectField
          label={"Heat:"}
          value={formik.values.heatId}
          valueLabel={getHeat(formik.values.heatId)?.name ?? "No Heat"}
          editing={isEditing}
          id={"heatId"}
          options={raceHeatsQuery.data.map((heat) => ({
            value: heat.id ?? 0,
            key: heat.name,
          }))}
          onChange={formik.handleChange}
          error={formik.errors.heatId}
        />
      )}
      {props.participant.heat == null ? (
        <Button onClick={handleEditButton}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      ) : (
        <Button
          onClick={() => {
            void handleRemoveButton();
          }}
          color={"warning"}
        >
          Remove
        </Button>
      )}

      {isEditing ? (
        <Button type={"submit"} color={"success"}>
          Save
        </Button>
      ) : null}
    </form>
  );
}

function ParticipantRaceCard(props: {
  participant: Components.Schemas.ParticipantSchema;
  setParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
}) {
  const commentsQuery = useQuery({
    queryKey: ["getComments", props.participant.id],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.participants_api_get_participant_comments(
            props.participant.id ?? 0,
          ),
        )
        .then((res) => res.data),
  });

  const refreshComments = () => {
    void commentsQuery.refetch();
  };

  return (
    <Card
      variant={"outlined"}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box textAlign={"center"} sx={{ p: 0.75 }}>
        <Typography variant={"h5"} component={"div"}>
          {props.participant.race.name} - {props.participant.bib_number}
        </Typography>
        {props.participant.is_active ? null : (
          <Alert sx={{ m: 2 }} icon={<Error />} severity={"error"}>
            Inactive participant! Participant will not show up on heat or other
            exports.
          </Alert>
        )}
      </Box>
      <Divider />
      <Grid container flexGrow={1}>
        <Grid xs>
          <ParticipantInformation
            setParticipant={props.setParticipant}
            participant={props.participant}
          />
          <Divider flexItem />
          <Grid sx={{ m: 2 }}>
            <ParticipantRaceType
              setParticipant={props.setParticipant}
              participant={props.participant}
            />
            <ParticipantRaceHeat
              setParticipant={props.setParticipant}
              participant={props.participant}
            />
          </Grid>
        </Grid>
        <Divider orientation={"vertical"} flexItem />
        <Grid
          container
          xs={4}
          flexDirection={"column"}
          alignContent={"stretch"}
        >
          <Grid xs sx={{ p: 1, maxHeight: "100%", overflow: "auto" }}>
            {commentsQuery.isLoading ? (
              <>Loading...</>
            ) : commentsQuery.isError ? (
              <>Error...</>
            ) : commentsQuery.data == "" ? (
              <>No comments...</>
            ) : (
              <Stack spacing={2} direction={"column-reverse"}>
                {(
                  commentsQuery.data as Components.Schemas.ParticipantCommentSchema[]
                ).map((comment) => {
                  return (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onCommentDelete={refreshComments}
                    />
                  );
                })}
              </Stack>
            )}
          </Grid>
          <Divider flexItem />
          <Grid flexWrap={"nowrap"} sx={{ p: 1 }}>
            <CommentInput
              participant_id={props.participant.id ?? 0}
              onCommentSubmit={refreshComments}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

const Participant = () => {
  const { userId } = useParams();

  const [activeParticipant, setActiveParticipant] =
    useState<Components.Schemas.ParticipantSchema | null>(null);

  return (
    <SnackbarServiceProvider>
      <Box sx={{ height: "100%", px: 5 }}>
        <Grid container spacing={4} sx={{ height: "100%", mt: 2 }}>
          <Grid xs={4}>
            <Stack spacing={2}>
              <ParticipantPICard userId={userId ?? ""} />
              <ParticipantRaceListCard
                userId={userId ?? ""}
                activeParticipantId={activeParticipant?.id ?? null}
                setActiveParticipant={setActiveParticipant}
              />
            </Stack>
          </Grid>
          <Grid xs>
            {activeParticipant != null ? (
              <ParticipantRaceCard
                participant={activeParticipant}
                setParticipant={setActiveParticipant}
              />
            ) : (
              <div>Select a race first!</div>
            )}
          </Grid>
        </Grid>
      </Box>
    </SnackbarServiceProvider>
  );
};

export default Participant;
