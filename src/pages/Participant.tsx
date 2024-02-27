import {
  Alert,
  Box,
  Button,
  ButtonBase,
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
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useSnackbarServiceContext } from "../context/SnackbarContext.tsx";
import { CommentCard } from "../components/Comments.tsx";
import * as Yup from "yup";
import CustomCard from "../components/CustomCard.tsx";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import getChangedValues from "../services/helpers.ts";

function ParticipantPICard(props: { userId: string }) {
  const { pushAlert } = useSnackbarServiceContext();

  const { getApiClient } = useApiServiceContext();

  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["getUserById", props.userId],
    queryFn: () =>
      getApiClient()
        .then((client) => client.accounts_api_get_user_by_id(props.userId))
        .then((res) => res.data),
  });

  const user = userQuery.data;

  const [isEditing, setIsEditing] = useState(false);

  const UserFormSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    date_of_birth: Yup.string()
      .required()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Must format YYYY-MM-DD"),
    gender: Yup.string().required(),
    email: Yup.string().required().email("Must be an email!"),
    phone: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues:
      userQuery.isLoading || user == undefined
        ? {
            first_name: "",
            last_name: "",
            date_of_birth: "",
            gender: "",
            email: "",
            phone: "",
          }
        : {
            first_name: user.first_name,
            last_name: user.last_name,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            email: user.email,
            phone: user.phone_number,
          },
    validationSchema: UserFormSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      if (user) {
        const changedValues = getChangedValues(values, {
          first_name: user.first_name,
          last_name: user.last_name,
          date_of_birth: user.date_of_birth,
          gender: user.gender,
          email: user.email,
          phone: user.phone_number,
        });

        const apiClient = await getApiClient();
        const response = await apiClient.accounts_api_update_user(
          { user_id: user.id ?? -1 },
          changedValues,
        );

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
              data={formik.values.first_name}
              id={"first_name"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.first_name}
            />
            <EditableRowStackTextField
              label={"Last Name:"}
              data={formik.values.last_name}
              id={"last_name"}
              editing={isEditing}
              onChange={formik.handleChange}
              error={formik.errors.last_name}
            />
            <Stack direction={"row"} spacing={4}>
              <EditableRowStackTextField
                label={"DOB (Y-M-D):"}
                data={formik.values.date_of_birth}
                id={"date_of_birth"}
                editing={isEditing}
                onChange={formik.handleChange}
                error={formik.errors.date_of_birth}
              />
              <EditableRowStackTextField
                label={"Age:"}
                data={Math.abs(
                  DateTime.fromISO(formik.values.date_of_birth ?? "").minus({
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
  setActiveParticipantInfo: (arg0: { id: number; type: string } | null) => void;
}) {
  const { getApiClient } = useApiServiceContext();

  const participantsQuery = useQuery({
    queryKey: ["getParticipantsForUser", props.userId],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.accounts_api_get_user_participations(props.userId),
        )
        .then((res) => res.data),
  });

  const participations = participantsQuery.isLoading
    ? null
    : (participantsQuery.data as Components.Schemas.ParticipationSchema[]);

  useEffect(() => {
    if (
      props.activeParticipantId == null &&
      participations &&
      participations.length == 1
    ) {
      props.setActiveParticipantInfo({
        id: participations[0].id,
        type: participations[0].type,
      });
    }
  }, [participations, props.activeParticipantId, participantsQuery.data]);
  // we add only activeParticipantId so that we run this when activeParticipantId is null and also when participantsQuery has some data!

  return participantsQuery.isLoading ? (
    <Skeleton />
  ) : (
    <CustomCard title={"Races"}>
      {participations ? (
        participations.length > 0 ? (
          <Stack spacing={2}>
            {participations.map((participation) => {
              return (
                <Card
                  sx={
                    participation.id === props.activeParticipantId
                      ? {
                          border: 2,
                          borderColor: "success.main",
                        }
                      : {}
                  }
                  key={participation.id}
                  onClick={() => {
                    props.setActiveParticipantInfo({
                      id: participation.id,
                      type: participation.type,
                    });
                  }}
                >
                  <CardContent>
                    <Typography>
                      {participation.race.name} | {participation.type}
                    </Typography>
                  </CardContent>
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

  const { getApiClient } = useApiServiceContext();

  const formik = useFormik({
    initialValues: {
      commentText: "",
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const apiClient = await getApiClient();
      await apiClient.participants_api_participant_api_create_participant_comment(
        {
          participant_id: props.participant_id,
        },
        { comment: values.commentText },
      );

      props.onCommentSubmit();
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
      pushAlert("Comment added!", "success");
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

  const { getApiClient } = useApiServiceContext();

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
    swim_time: Yup.string()
      .notRequired()
      .matches(/^\d{2}:\d{2}$/, "Must be in format MM:SS"),
    city: Yup.string().notRequired(),
    province: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
  });

  const initialValues = {
    bib_num: props.participant.bib_number,
    is_ftt: props.participant.is_ftt,
    team: props.participant.team,
    swim_time: swimTimeCreator(props.participant.swim_time ?? null),
    origin: {
      city: props.participant.origin?.city ?? "",
      province: props.participant.origin?.province ?? "",
      country: props.participant.origin?.country ?? "",
    },
    location: props.participant.location,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: ParticipantFormSchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);

      if ("swim_time" in changedValues) {
        // @ts-expect-error okay to send null, sending undefined doesnt work
        changedValues.swim_time =
          swimTimeDestructor(changedValues.swim_time ?? "")?.toISO() ?? null;
      }

      const apiClient = await getApiClient();
      const response =
        await apiClient.participants_api_participant_api_update_participant(
          { participant_id: props.participant.id ?? 0 },
          changedValues,
        );

      pushAlert("Edits saved successfully!", "success");
      props.setParticipant(response.data);
      setIsEditing(false);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const deactivateParticipant = async () => {
    const api = await getApiClient();
    const response =
      await api.participants_api_participant_api_deactivate_participant(
        props.participant.id ?? 0,
      );

    props.setParticipant(response.data);

    return null;
  };

  const reactivateParticipant = async () => {
    const api = await getApiClient();
    const response =
      await api.participants_api_participant_api_reactivate_participant(
        props.participant.id ?? 0,
      );

    props.setParticipant(response.data);

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
                data={formik.values.swim_time}
                editing={isEditing}
                id={"swim_time"}
                onChange={formik.handleChange}
                error={formik.errors.swim_time}
              />
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Stack spacing={2}>
              <EditableRowStackTextField
                label={"City:"}
                data={formik.values.origin.city}
                editing={isEditing}
                id={"origin.city"}
                onChange={formik.handleChange}
                error={formik.errors.origin?.city}
              />
              <EditableRowStackTextField
                label={"Province:"}
                data={formik.values.origin.province}
                editing={isEditing}
                id={"origin.province"}
                onChange={formik.handleChange}
                error={formik.errors.origin?.city}
              />
              <EditableRowStackTextField
                label={"Country:"}
                data={formik.values.origin.country}
                editing={isEditing}
                id={"origin.country"}
                onChange={formik.handleChange}
                error={formik.errors.origin?.country}
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

function RelayTeamInformation(props: {
  relayTeam: Components.Schemas.RelayTeamSchema;
  setRelayTeam: (arg0: Components.Schemas.RelayTeamSchema) => void;
}) {
  const { pushAlert } = useSnackbarServiceContext();

  const { getApiClient } = useApiServiceContext();

  const RelayTeamParticipantFormSchema = Yup.object({
    bib_num: Yup.number()
      .required()
      .positive("Must be positive!")
      .integer("Must be a full integer!"),
    team: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      bib_num: props.relayTeam.bib_number,
      team: props.relayTeam.name,
    },
    enableReinitialize: true,
    validationSchema: RelayTeamParticipantFormSchema,
    onSubmit: async (values) => {
      const apiClient = await getApiClient();
      const response =
        await apiClient.participants_api_relay_team_api_update_relay_team(
          { relay_team_id: props.relayTeam.id ?? 0 },
          {
            bib_number: values.bib_num,
            name: values.team,
          },
        );

      pushAlert("Edits saved successfully!", "success");
      props.setRelayTeam(response.data);
      setIsEditing(false);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  const deactivateRelayTeam = async () => {
    if (props.relayTeam.id) {
      const api = await getApiClient();
      const response =
        await api.participants_api_relay_team_api_deactivate_relay_team({
          relay_team_id: props.relayTeam.id,
        });

      props.setRelayTeam(response.data);
    }
  };

  const reactivateRelayTeam = async () => {
    if (props.relayTeam.id) {
      const api = await getApiClient();
      const response =
        await api.participants_api_relay_team_api_reactivate_relay_team({
          relay_team_id: props.relayTeam.id,
        });

      props.setRelayTeam(response.data);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ m: 2 }}>
        <Box sx={{ pl: 2 }}>
          <EditableRowStackTextField
            label={"Bib #:"}
            data={formik.values.bib_num.toString()}
            editing={isEditing}
            id={"bib_num"}
            onChange={formik.handleChange}
            error={formik.errors.bib_num}
          />
        </Box>
        <Box sx={{ pl: 2 }}>
          <EditableRowStackTextField
            label={"Team Name:"}
            data={formik.values.team}
            editing={isEditing}
            id={"team"}
            onChange={formik.handleChange}
            error={formik.errors.team}
          />
        </Box>
        <Grid container direction={"row"} gap={2}>
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
          <Grid>
            {props.relayTeam.is_active ? (
              <Button
                color={"error"}
                onClick={() => {
                  void deactivateRelayTeam();
                }}
              >
                De-Activate
              </Button>
            ) : (
              <Button
                color={"success"}
                onClick={() => {
                  void reactivateRelayTeam();
                }}
              >
                Re-Activate
              </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}

function RelayTeamParticipantInformation(props: {
  setRelayParticipant: (
    arg0: Components.Schemas.RelayTeamParticipantSchema,
  ) => void;
  relayParticipant: Components.Schemas.RelayTeamParticipantSchema;
}) {
  const { pushAlert } = useSnackbarServiceContext();

  const { getApiClient } = useApiServiceContext();

  const RelayTeamParticipantFormSchema = Yup.object({
    city: Yup.string().notRequired(),
    province: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
  });

  const initialValues = {
    origin: {
      city: props.relayParticipant.origin?.city ?? "",
      province: props.relayParticipant.origin?.province ?? "",
      country: props.relayParticipant.origin?.country ?? "",
    },
    location: props.relayParticipant.location,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: RelayTeamParticipantFormSchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);

      const apiClient = await getApiClient();
      const response =
        await apiClient.participants_api_relay_team_api_update_relay_participant(
          {
            relay_team_id: props.relayParticipant.team.id ?? 0,
            relay_participant_id: props.relayParticipant.id ?? 0,
          },
          changedValues,
        );

      pushAlert("Edits saved successfully!", "success");
      props.setRelayParticipant(response.data);
      setIsEditing(false);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container flexDirection={"column"} sx={{ m: 2 }} gap={2}>
        <Grid xs sx={{ ml: 2 }}>
          <Stack spacing={2}>
            <EditableRowStackTextField
              label={"City:"}
              data={formik.values.origin.city}
              editing={isEditing}
              id={"origin.city"}
              onChange={formik.handleChange}
              error={formik.errors.origin?.city}
            />
            <EditableRowStackTextField
              label={"Province:"}
              data={formik.values.origin.province}
              editing={isEditing}
              id={"origin.province"}
              onChange={formik.handleChange}
              error={formik.errors.origin?.province}
            />
            <EditableRowStackTextField
              label={"Country:"}
              data={formik.values.origin.country}
              editing={isEditing}
              id={"origin.country"}
              onChange={formik.handleChange}
              error={formik.errors.origin?.country}
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
        <Grid xs>
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

function RaceTypeField<T>(props: {
  raceType: Components.Schemas.RaceTypeSchema;
  onChangeRaceType: (raceType: Components.Schemas.RaceTypeSchema) => Promise<T>;
}) {
  const { getApiClient } = useApiServiceContext();

  const [isEditing, setIsEditing] = useState(false);

  const raceTypesQuery = useQuery({
    queryKey: ["getRaceTypes"],
    queryFn: () =>
      getApiClient().then((client) =>
        client.race_api_race_type_api_get_race_types().then((res) => res.data),
      ),
    enabled: isEditing,
    initialData: () => [props.raceType],
  });

  const { pushAlert } = useSnackbarServiceContext();

  const formik = useFormik({
    initialValues: {
      raceTypeId: props.raceType.id ?? -1,
    },
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const raceType = getRaceType(values.raceTypeId);

      if (raceType) {
        await props.onChangeRaceType(raceType);

        setIsEditing(false);
        formikHelpers.setSubmitting(false);
        pushAlert("Race type edit saved successfully!", "success");
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
    if (props.raceType.id == id) {
      return props.raceType;
    }

    return raceTypesQuery.data.find((raceType) => {
      return raceType.id == id;
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <EditableRowStackSelectField
        label={"Race Type:"}
        value={formik.values.raceTypeId}
        valueLabel={getRaceType(formik.values.raceTypeId)?.name}
        editing={isEditing}
        id={"raceTypeId"}
        options={raceTypesQuery.data.map((racetype) => ({
          value: racetype.id ?? 0,
          key: racetype.name,
        }))}
        onChange={formik.handleChange}
        error={formik.errors.raceTypeId}
      />
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

function ParticipantRaceType(props: {
  setParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
  participant: Components.Schemas.ParticipantSchema;
}) {
  const { getApiClient } = useApiServiceContext();

  const handleChangeRaceType = async (
    raceType: Components.Schemas.RaceTypeSchema,
  ) => {
    const api = await getApiClient();

    const response =
      await api.participants_api_participant_api_change_participant_race_type(
        { participant_id: props.participant.id ?? 0 },
        raceType,
      );

    props.setParticipant(response.data);

    return response.data;
  };

  if (props.participant.race_type.id == undefined) {
    return <>Error... The participant must have a race type already!</>;
  }

  return (
    <RaceTypeField
      raceType={props.participant.race_type}
      onChangeRaceType={handleChangeRaceType}
    />
  );
}

function RelayTeamRaceType(props: {
  setRelayTeam: (arg0: Components.Schemas.RelayTeamSchema) => void;
  relayTeam: Components.Schemas.RelayTeamSchema;
}) {
  const { getApiClient } = useApiServiceContext();

  const handleChangeRaceType = async (
    raceType: Components.Schemas.RaceTypeSchema,
  ) => {
    const api = await getApiClient();

    const response =
      await api.participants_api_relay_team_api_change_relay_team_race_type(
        { relay_team_id: props.relayTeam.id ?? 0 },
        raceType,
      );

    props.setRelayTeam(response.data);

    return response.data;
  };

  if (props.relayTeam.race_type.id == undefined) {
    return <>Error... The participant must have a race type already!</>;
  }

  return (
    <RaceTypeField
      raceType={props.relayTeam.race_type}
      onChangeRaceType={handleChangeRaceType}
    />
  );
}

function RaceHeatField<T>(props: {
  raceId: number;
  heat: Components.Schemas.HeatSchema | null;
  raceTypeId: number;
  onChangeHeat: (heat: Components.Schemas.HeatSchema) => Promise<T>;
  onRemoveHeat: () => Promise<T>;
}) {
  const { getApiClient } = useApiServiceContext();

  const [isEditing, setIsEditing] = useState(false);

  const raceHeatsQuery = useQuery({
    queryKey: ["getRaceHeats"],
    queryFn: () =>
      getApiClient().then((client) =>
        client
          .race_api_race_api_get_race_heats({
            race_id: props.raceId,
            race_type_id: props.raceTypeId,
          })
          .then((res) => res.data),
      ),
    enabled: isEditing,
    initialData: () => (props.heat == null ? [] : [props.heat]),
  });

  const { pushAlert } = useSnackbarServiceContext();

  const formik = useFormik({
    initialValues: {
      heatId: props.heat?.id ?? -1,
    },
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const heat = getHeat(values.heatId);

      if (heat) {
        await props.onChangeHeat(heat);

        formikHelpers.setSubmitting(false);
        setIsEditing(false);
        pushAlert("Heat saved successfully!", "success");
      }
    },
  });

  const getHeat = (id: number): Components.Schemas.HeatSchema | undefined => {
    if (props.heat && props.heat.id == id) {
      return props.heat;
    }

    return raceHeatsQuery.data.find((heat) => {
      return heat.id == id;
    });
  };

  const getHeatName = (heat: Components.Schemas.HeatSchema | null): string => {
    if (heat) {
      return `${heat.name} | ${heat.race_type.name}`;
    }
    return "No Heat";
  };

  const handleEditButton = () => {
    if (isEditing) {
      formik.resetForm();
      pushAlert("Changes canceled!", "warning");
    }
    setIsEditing((prevState) => !prevState);
  };

  const handleRemoveButton = async () => {
    await props.onRemoveHeat();
    pushAlert("Removed from heat!", "success");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <EditableRowStackSelectField
        label={"Heat:"}
        value={formik.values.heatId}
        valueLabel={getHeatName(getHeat(formik.values.heatId) ?? null)}
        editing={isEditing}
        id={"heatId"}
        options={raceHeatsQuery.data.map((heat) => ({
          value: heat.id ?? 0,
          key: getHeatName(heat),
        }))}
        onChange={formik.handleChange}
        error={formik.errors.heatId}
      />
      {props.heat?.id == null ? (
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

function ParticipantRaceHeat(props: {
  setParticipant: (arg0: Components.Schemas.ParticipantSchema) => void;
  participant: Components.Schemas.ParticipantSchema;
}) {
  const { getApiClient } = useApiServiceContext();

  const handleChangeHeat = async (heat: Components.Schemas.HeatSchema) => {
    const api = await getApiClient();

    const response =
      await api.participants_api_participant_api_change_participant_heat({
        participant_id: props.participant.id ?? -1,
        heat_id: heat.id ?? -1,
      });
    props.setParticipant(response.data);
    return response.data;
  };

  const handleRemoveHeat = async () => {
    const api = await getApiClient();

    const response =
      await api.participants_api_participant_api_remove_participant_heat({
        participant_id: props.participant.id ?? 0,
      });
    props.setParticipant(response.data);
    return response.data;
  };

  if (props.participant.race.id == undefined) {
    return <>Error... Participant must have a race assigned!</>;
  }

  return (
    <RaceHeatField
      raceId={props.participant.race.id}
      heat={props.participant.heat ?? null}
      raceTypeId={props.participant.race_type.id ?? -1}
      onChangeHeat={handleChangeHeat}
      onRemoveHeat={handleRemoveHeat}
    />
  );
}

function RelayTeamRaceHeat(props: {
  setRelayTeam: (arg0: Components.Schemas.RelayTeamSchema) => void;
  relayTeam: Components.Schemas.RelayTeamSchema;
}) {
  const { getApiClient } = useApiServiceContext();

  const handleChangeHeat = async (heat: Components.Schemas.HeatSchema) => {
    const api = await getApiClient();

    const response =
      await api.participants_api_relay_team_api_change_relay_team_heat({
        relay_team_id: props.relayTeam.id ?? -1,
        heat_id: heat.id ?? -1,
      });
    props.setRelayTeam(response.data);
    return response.data;
  };

  const handleRemoveHeat = async () => {
    const api = await getApiClient();

    const response =
      await api.participants_api_relay_team_api_remove_relay_team_heat({
        relay_team_id: props.relayTeam.id ?? 0,
      });
    props.setRelayTeam(response.data);
    return response.data;
  };

  if (props.relayTeam.race.id == undefined) {
    return <>Error... Relay Team must have a race assigned!</>;
  }

  return (
    <RaceHeatField
      raceId={props.relayTeam.race.id}
      heat={props.relayTeam.heat ?? null}
      raceTypeId={props.relayTeam.race_type.id ?? -1}
      onChangeHeat={handleChangeHeat}
      onRemoveHeat={handleRemoveHeat}
    />
  );
}

function ParticipantRaceCard(props: { participantId: number }) {
  const { getApiClient } = useApiServiceContext();

  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: ["getComments", props.participantId],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.participants_api_participant_api_get_participant_comments(
            props.participantId,
          ),
        )
        .then((res) => res.data),
  });

  const participantQuery = useQuery({
    queryKey: ["getParticipant", props.participantId],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.participants_api_participant_api_get_participant({
            participant_id: props.participantId,
          }),
        )
        .then((res) => res.data),
  });

  const refreshComments = () => {
    void commentsQuery.refetch();
  };

  const setParticipant = (
    participant: Components.Schemas.ParticipantSchema,
  ) => {
    queryClient.setQueryData(
      ["getParticipant", props.participantId],
      participant,
    );
  };

  const deleteParticipantComment = async (comment_id: number) => {
    const api = await getApiClient();
    await api.participants_api_comment_api_delete_participant_comment({
      comment_id: comment_id,
    });
  };

  return (
    <Card
      variant={"outlined"}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box textAlign={"center"} sx={{ p: 0.75 }}>
        {participantQuery.isLoading ? (
          <Skeleton />
        ) : participantQuery.isError || participantQuery.data == undefined ? (
          <>Error...</>
        ) : (
          <>
            <Typography variant={"h5"} component={"div"}>
              {participantQuery.data.race.name} -{" "}
              {participantQuery.data.bib_number}
            </Typography>
            {participantQuery.data.is_active ? null : (
              <Alert sx={{ m: 2 }} icon={<Error />} severity={"error"}>
                Inactive participant! Participant will not show up on heat or
                other exports.
              </Alert>
            )}
          </>
        )}
      </Box>
      <Divider />
      <Grid container flexGrow={1}>
        {participantQuery.isLoading ? (
          <Skeleton />
        ) : participantQuery.isError || participantQuery.data == undefined ? (
          <>Error...</>
        ) : (
          <Grid xs>
            <ParticipantInformation
              setParticipant={setParticipant}
              participant={participantQuery.data}
            />
            <Divider flexItem />
            <Grid sx={{ m: 2 }}>
              <ParticipantRaceType
                setParticipant={setParticipant}
                participant={participantQuery.data}
              />
              <ParticipantRaceHeat
                setParticipant={setParticipant}
                participant={participantQuery.data}
              />
            </Grid>
          </Grid>
        )}
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
            ) : commentsQuery.data === undefined ? (
              <>No comments...</>
            ) : (
              <Stack spacing={2} direction={"column-reverse"}>
                {commentsQuery.data.map((comment) => {
                  return (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onCommentDelete={refreshComments}
                      deleteCommentApiCall={deleteParticipantComment}
                    />
                  );
                })}
              </Stack>
            )}
          </Grid>
          <Divider flexItem />
          <Grid flexWrap={"nowrap"} sx={{ p: 1 }}>
            {participantQuery.isLoading ? (
              <Skeleton />
            ) : participantQuery.isError ||
              participantQuery.data == undefined ? (
              <>Error...</>
            ) : (
              <CommentInput
                participant_id={participantQuery.data.id ?? 0}
                onCommentSubmit={refreshComments}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

function RelayParticipantRaceCard(props: { relayParticipantId: number }) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const relayParticipantQuery = useQuery({
    queryKey: ["getRelayParticipant", props.relayParticipantId],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.participants_api_relay_team_api_get_relay_participant({
            relay_participant_id: props.relayParticipantId,
          }),
        )
        .then((res) => res.data),
  });

  const commentsQuery = useQuery({
    queryKey: ["getComments", relayParticipantQuery.data?.team.id],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.participants_api_relay_team_api_get_relay_team_comments(
            props.relayParticipantId,
          ),
        )
        .then((res) => res.data),
    enabled: relayParticipantQuery.data != undefined,
  });

  const relayTeamMembersQuery = useQuery({
    queryKey: ["getRelayTeammembers", relayParticipantQuery.data?.team.id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.participants_api_relay_team_api_get_relay_team_participants({
            relay_team_id: relayParticipantQuery.data?.team.id ?? -1,
          }),
        )
        .then((res) => res.data),
    enabled: relayParticipantQuery.data != undefined,
  });

  const refreshComments = () => {
    void commentsQuery.refetch();
  };

  const deleteRelayTeamComment = async (comment_id: number) => {
    const api = await getApiClient();
    await api.participants_api_comment_api_delete_relay_team_comment({
      comment_id: comment_id,
    });
  };

  const setRelayParticipant = (
    participant: Components.Schemas.RelayTeamParticipantSchema,
  ) => {
    queryClient.setQueryData(
      ["getRelayParticipant", props.relayParticipantId],
      participant,
    );
  };

  const setRelayTeam = (relayTeam: Components.Schemas.RelayTeamSchema) => {
    const relayParticipant = relayParticipantQuery.data;

    if (relayParticipant) {
      relayParticipant.team = relayTeam;

      setRelayParticipant(relayParticipant);
    }
  };

  return (
    <Card
      variant={"outlined"}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box textAlign={"center"} sx={{ p: 0.75 }}>
        {relayParticipantQuery.isLoading ? (
          <Skeleton />
        ) : relayParticipantQuery.isError ||
          relayParticipantQuery.data == undefined ? (
          <>Error...</>
        ) : (
          <>
            <Typography variant={"h5"} component={"div"}>
              {relayParticipantQuery.data.team.race.name} -{" "}
              {relayParticipantQuery.data.team.name}{" "}
              {relayParticipantQuery.data.team.bib_number}
            </Typography>
            {relayParticipantQuery.data.is_active ? null : (
              <Alert sx={{ m: 2 }} icon={<Error />} severity={"error"}>
                Inactive participant! Participant will not show up on heat or
                other exports.
              </Alert>
            )}
          </>
        )}
      </Box>
      <Divider />
      <Grid container flexGrow={1}>
        {relayParticipantQuery.isLoading ? (
          <Skeleton />
        ) : relayParticipantQuery.isError ||
          relayParticipantQuery.data == undefined ? (
          <>Error...</>
        ) : (
          <Grid xs>
            <Grid container direction={"row"}>
              <Grid flexGrow={1}>
                <RelayTeamParticipantInformation
                  setRelayParticipant={setRelayParticipant}
                  relayParticipant={relayParticipantQuery.data}
                />
              </Grid>
              <Divider orientation={"vertical"} flexItem />
              <Grid flexGrow={1}>
                <RelayTeamInformation
                  relayTeam={relayParticipantQuery.data.team}
                  setRelayTeam={setRelayTeam}
                />
              </Grid>
            </Grid>
            <Divider flexItem />
            <Grid sx={{ m: 2 }} container gap={4} spacing={2}>
              <Grid>
                <RelayTeamRaceType
                  setRelayTeam={setRelayTeam}
                  relayTeam={relayParticipantQuery.data.team}
                />
              </Grid>
              <Grid>
                <RelayTeamRaceHeat
                  setRelayTeam={setRelayTeam}
                  relayTeam={relayParticipantQuery.data.team}
                />
              </Grid>
            </Grid>
            <Divider flexItem />
            <Grid>
              <Box sx={{ m: 3 }}>
                <Typography variant={"h6"}>Team Members</Typography>
                {relayTeamMembersQuery.isLoading ? (
                  <Skeleton />
                ) : relayTeamMembersQuery.isError ||
                  relayTeamMembersQuery.data == undefined ? (
                  <>Error...</>
                ) : (
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {relayTeamMembersQuery.data
                      .filter(
                        (relayTeamParticipant) =>
                          relayTeamParticipant.id != props.relayParticipantId,
                      )
                      .map((relayTeamParticipant) => {
                        return (
                          <Card>
                            <ButtonBase
                              onClick={() => {
                                navigate(
                                  `/participants/${relayTeamParticipant.user.id}`,
                                );
                              }}
                            >
                              <Box sx={{ p: 2 }}>
                                {relayTeamParticipant.user.first_name}{" "}
                                {relayTeamParticipant.user.last_name}
                              </Box>
                            </ButtonBase>
                          </Card>
                        );
                      })}
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
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
            ) : commentsQuery.data === undefined ? (
              <>No comments...</>
            ) : (
              <Stack spacing={2} direction={"column-reverse"}>
                {commentsQuery.data.map((comment) => {
                  return (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onCommentDelete={refreshComments}
                      deleteCommentApiCall={deleteRelayTeamComment}
                    />
                  );
                })}
              </Stack>
            )}
          </Grid>
          <Divider flexItem />
          <Grid flexWrap={"nowrap"} sx={{ p: 1 }}>
            {relayParticipantQuery.isLoading ? (
              <Skeleton />
            ) : relayParticipantQuery.isError ||
              relayParticipantQuery.data == undefined ? (
              <>Error...</>
            ) : (
              <CommentInput
                participant_id={relayParticipantQuery.data.id ?? 0}
                onCommentSubmit={refreshComments}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

const Participant = () => {
  const { userId } = useParams();

  const [activeParticipantInfo, setActiveParticipantInfo] = useState<{
    id: number;
    type: string;
  } | null>(null);

  useEffect(() => {
    setActiveParticipantInfo(null);
  }, [userId]);

  return (
    <Box sx={{ height: "100%", px: 5 }}>
      <Grid container spacing={4} sx={{ height: "100%", mt: 2 }}>
        <Grid xs={4}>
          <Stack spacing={2}>
            <ParticipantPICard userId={userId ?? ""} />
            <ParticipantRaceListCard
              userId={userId ?? ""}
              activeParticipantId={activeParticipantInfo?.id ?? null}
              setActiveParticipantInfo={setActiveParticipantInfo}
            />
          </Stack>
        </Grid>
        <Grid xs>
          {activeParticipantInfo != null ? (
            activeParticipantInfo.type === "participant" ? (
              <ParticipantRaceCard participantId={activeParticipantInfo.id} />
            ) : (
              <RelayParticipantRaceCard
                relayParticipantId={activeParticipantInfo.id}
              />
            )
          ) : (
            <Typography>Select a race first!</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Participant;
