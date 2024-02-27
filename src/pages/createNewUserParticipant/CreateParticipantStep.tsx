import StepCardLayout from "./StepCardLayout.tsx";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DateTime, Duration } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { useApiServiceContext } from "../../context/ApiContext.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import CustomTabPanel from "../../components/CustomTabPanel.tsx";
import { useState } from "react";
import { Components } from "../../services/api/openapi";
import { EditableRowStackSwitch } from "../../components/EditableRowComponents.tsx";

function RelayTeamMemberPanel(props: {
  raceId: number;
  userId: number;
  userName: string;
  handleSuccess: () => void;
}) {
  const { getApiClient } = useApiServiceContext();

  const raceTypesQuery = useQuery({
    queryKey: ["raceTypes"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_race_type_api_get_race_types())
        .then((res) => res.data),
  });

  const [relayTeam, setRelayTeam] =
    useState<Components.Schemas.RelayTeamSchema | null>(null);

  const [isNewTeam, setIsNewTeam] = useState(false);

  const [teamName, setTeamName] = useState("");

  const teamNameFormik = useFormik({
    initialValues: {
      teamName: "",
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      try {
        const api = await getApiClient();
        const response =
          await api.participants_api_relay_team_api_get_relay_team_by_name({
            relay_team_name: values.teamName,
          });
        setRelayTeam(response.data);
      } catch {
        setIsNewTeam(true);
        setTeamName(values.teamName);
      }

      formikHelpers.setSubmitting(false);
    },
  });

  const createRelayTeamFormik = useFormik({
    initialValues: {
      bibNo: 0,
      name: teamName,
      raceType: 0,
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const api = await getApiClient();

      const response =
        await api.participants_api_relay_team_api_create_relay_team(null, {
          name: values.name,
          bib_number: values.bibNo,
          race_id: props.raceId,
          race_type_id: values.raceType,
        });

      setRelayTeam(response.data);
      formikHelpers.setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const relayTeamParticipantFormik = useFormik({
    initialValues: {
      location: "",
      waiver_signed: false,
    },
    onSubmit: async (values, formikHelpers) => {
      if (relayTeam?.id) {
        formikHelpers.setSubmitting(true);
        const api = await getApiClient();

        await api.participants_api_relay_team_api_add_participant_to_relay_team(
          { relay_team_id: relayTeam.id },
          {
            user_id: props.userId,
            team_id: relayTeam.id,
            location: values.location,
            waiver_signed: values.waiver_signed,
          },
        );

        props.handleSuccess();
        formikHelpers.setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Stack spacing={2}>
      <form onSubmit={teamNameFormik.handleSubmit}>
        <Grid direction={"row"} container gap={2} justifyContent={"center"}>
          <Grid>
            <TextField
              type={"text"}
              id={"teamName"}
              label={"Team Name"}
              error={
                teamNameFormik.errors.teamName != undefined &&
                teamNameFormik.touched.teamName
              }
              helperText={
                teamNameFormik.errors.teamName != undefined &&
                teamNameFormik.touched.teamName
                  ? teamNameFormik.errors.teamName
                  : ""
              }
              onChange={teamNameFormik.handleChange}
            />
          </Grid>
          <Grid>
            {teamNameFormik.isSubmitting ? (
              <CircularProgress />
            ) : (
              <Button type={"submit"} color={"success"}>
                Search Team
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {isNewTeam ? (
        <>
          <Divider />
          <form onSubmit={createRelayTeamFormik.handleSubmit}>
            <Stack spacing={2}>
              <Grid
                container
                direction={"row"}
                gap={2}
                spacing={2}
                flexWrap={"wrap"}
              >
                <Grid>
                  <TextField
                    type={"number"}
                    id={"bibNo"}
                    label={"Bib Number"}
                    error={
                      createRelayTeamFormik.errors.bibNo != undefined &&
                      createRelayTeamFormik.touched.bibNo
                    }
                    helperText={
                      createRelayTeamFormik.errors.bibNo != undefined &&
                      createRelayTeamFormik.touched.bibNo
                        ? createRelayTeamFormik.errors.bibNo
                        : ""
                    }
                    onChange={createRelayTeamFormik.handleChange}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label={"Team Name"}
                    value={createRelayTeamFormik.values.name}
                    id={"name"}
                    error={
                      createRelayTeamFormik.errors.name != undefined &&
                      createRelayTeamFormik.touched.name
                    }
                    helperText={
                      createRelayTeamFormik.errors.name != undefined &&
                      createRelayTeamFormik.touched.name
                        ? createRelayTeamFormik.errors.name
                        : ""
                    }
                    onChange={createRelayTeamFormik.handleChange}
                  />
                </Grid>
                <Grid>
                  {raceTypesQuery.isLoading ? (
                    <Skeleton variant={"rectangular"} />
                  ) : raceTypesQuery.isError || !raceTypesQuery.data ? (
                    <>Error...</>
                  ) : (
                    <FormControl>
                      <InputLabel id={`label-for-raceType`}>
                        Race Type
                      </InputLabel>
                      <Select
                        name={"raceType"}
                        id={"raceType"}
                        labelId={`label-for-raceType`}
                        error={
                          createRelayTeamFormik.errors.raceType != undefined &&
                          createRelayTeamFormik.touched.raceType
                        }
                        label={"Race Type"}
                        value={createRelayTeamFormik.values.raceType}
                        onChange={createRelayTeamFormik.handleChange}
                        sx={{ minWidth: 100 }}
                      >
                        {raceTypesQuery.data.map((raceType) => {
                          if (raceType.id && raceType.name) {
                            return (
                              <MenuItem key={raceType.id} value={raceType.id}>
                                {raceType.name}
                              </MenuItem>
                            );
                          }
                          return null;
                        })}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
              </Grid>
              {createRelayTeamFormik.isSubmitting ? (
                <CircularProgress />
              ) : (
                <Button
                  type={"submit"}
                  color={"success"}
                  disabled={relayTeam != null}
                >
                  Create Team
                </Button>
              )}
            </Stack>
          </form>
        </>
      ) : null}
      {relayTeam != null ? (
        <>
          <Divider />
          <form onSubmit={relayTeamParticipantFormik.handleSubmit}>
            <Stack spacing={2}>
              <Typography>
                Ready to add {props.userName} to {relayTeam.name}.
              </Typography>
              <TextField
                type={"text"}
                id={"location"}
                label={"Location"}
                error={
                  relayTeamParticipantFormik.errors.location != undefined &&
                  relayTeamParticipantFormik.touched.location
                }
                helperText={
                  relayTeamParticipantFormik.errors.location != undefined &&
                  relayTeamParticipantFormik.touched.location
                    ? relayTeamParticipantFormik.errors.location
                    : ""
                }
                onChange={relayTeamParticipantFormik.handleChange}
              />
              <EditableRowStackSwitch
                label={"Waiver Signed"}
                checked={relayTeamParticipantFormik.values.waiver_signed}
                editing={true}
                id={"waiver_signed"}
                onChange={relayTeamParticipantFormik.handleChange}
              />
              {relayTeamParticipantFormik.isSubmitting ? (
                <CircularProgress />
              ) : (
                <Button type={"submit"} color={"success"}>
                  Add to Team
                </Button>
              )}
            </Stack>
          </form>
        </>
      ) : null}
    </Stack>
  );
}

const CreateParticipantStep = (props: {
  userId: number;
  raceId: number;
  userName: string;
  handleSuccess: () => void;
  handleBack: () => void;
}) => {
  const { getApiClient } = useApiServiceContext();

  const ParticipantFormSchema = Yup.object({
    bibNo: Yup.number()
      .required()
      .positive("Must be positive!")
      .integer("Must be a full integer!"),
    isFtt: Yup.boolean().required(),
    team: Yup.string(),
    swimTime: Yup.object().required(),
    city: Yup.string(),
    province: Yup.string(),
    country: Yup.string(),
    raceType: Yup.number().required(),
    waiver_signed: Yup.boolean().required(),
  });

  const participantFormik = useFormik({
    initialValues: {
      bibNo: 0,
      isFtt: false,
      team: "",
      swimTime: Duration.fromObject({ minutes: 0 }),
      city: "",
      province: "",
      country: "",
      raceType: 0,
      waiver_signed: true,
    },
    validationSchema: ParticipantFormSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const apiClient = await getApiClient();
      await apiClient.accounts_api_create_user_participant(
        { user_id: props.userId },
        {
          bib_number: values.bibNo,
          is_ftt: values.isFtt,
          team: values.team,
          swim_time: values.swimTime.toISO(),
          origin: {
            city: values.city,
            province: values.province,
            country: values.country,
          },
          race_id: props.raceId,
          race_type_id: values.raceType,
          waiver_signed: values.waiver_signed,
        },
      );

      props.handleSuccess();
    },
  });

  const raceTypesQuery = useQuery({
    queryKey: ["raceTypes"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_race_type_api_get_race_types())
        .then((res) => res.data),
  });

  const [panelIndex, setPanelIndex] = useState(0);

  return (
    <StepCardLayout
      instructions={`Finally, complete ${props.userName} information for the race.`}
    >
      <Tabs
        value={panelIndex}
        onChange={(_event, newValue: number) => {
          setPanelIndex(newValue);
        }}
        variant={"fullWidth"}
      >
        <Tab label="Individual" id={"individual"} />
        <Tab label="Relay Team Member" id={"relayTeamMember"} />
      </Tabs>
      <CustomTabPanel index={0} value={panelIndex}>
        <form onSubmit={participantFormik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type={"number"}
              id={"bibNo"}
              label={"Bib Number"}
              error={
                participantFormik.errors.bibNo != undefined &&
                participantFormik.touched.bibNo
              }
              helperText={
                participantFormik.errors.bibNo != undefined &&
                participantFormik.touched.bibNo
                  ? participantFormik.errors.bibNo
                  : ""
              }
              onChange={participantFormik.handleChange}
            />
            <EditableRowStackSwitch
              label={"Waiver Signed"}
              checked={participantFormik.values.waiver_signed}
              editing={true}
              id={"waiver_signed"}
              onChange={participantFormik.handleChange}
            />
            <TextField
              type={"text"}
              id={"team"}
              label={"Team"}
              error={
                participantFormik.errors.team != undefined &&
                participantFormik.touched.team
              }
              helperText={
                participantFormik.errors.team != undefined &&
                participantFormik.touched.team
                  ? participantFormik.errors.team
                  : ""
              }
              onChange={participantFormik.handleChange}
            />

            <TextField
              type={"text"}
              id={"city"}
              label={"City"}
              error={
                participantFormik.errors.city != undefined &&
                participantFormik.touched.city
              }
              helperText={
                participantFormik.errors.city != undefined &&
                participantFormik.touched.city
                  ? participantFormik.errors.city
                  : ""
              }
              onChange={participantFormik.handleChange}
            />
            <TextField
              type={"text"}
              id={"province"}
              label={"Province"}
              error={
                participantFormik.errors.province != undefined &&
                participantFormik.touched.province
              }
              helperText={
                participantFormik.errors.province != undefined &&
                participantFormik.touched.province
                  ? participantFormik.errors.province
                  : ""
              }
              onChange={participantFormik.handleChange}
            />
            <TextField
              type={"text"}
              id={"country"}
              label={"Country"}
              error={
                participantFormik.errors.country != undefined &&
                participantFormik.touched.country
              }
              helperText={
                participantFormik.errors.country != undefined &&
                participantFormik.touched.country
                  ? participantFormik.errors.country
                  : ""
              }
              onChange={participantFormik.handleChange}
            />

            <TimePicker
              label={"Swim Time"}
              value={DateTime.fromISO(
                participantFormik.values.swimTime.toISOTime(),
              )}
              name={"swimTime"}
              onChange={(value) => {
                void participantFormik.setFieldValue(
                  "swimTime",
                  Duration.fromISOTime(
                    value?.toISOTime({
                      includePrefix: true,
                      includeOffset: false,
                    }) ?? "",
                  ),
                  true,
                );
              }}
              views={["minutes", "seconds"]}
              format={"mm:ss"}
              slotProps={{
                textField: {
                  error:
                    participantFormik.errors.swimTime != undefined &&
                    participantFormik.touched.swimTime != undefined,
                  helperText:
                    participantFormik.errors.swimTime != undefined &&
                    participantFormik.touched.swimTime != undefined
                      ? participantFormik.errors.swimTime.invalidReason
                      : "",
                },
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  id={"isFtt"}
                  checked={participantFormik.values.isFtt}
                  onChange={participantFormik.handleChange}
                />
              }
              label={"Is FTT"}
            />

            {raceTypesQuery.isLoading ? (
              <Skeleton variant={"rectangular"} />
            ) : raceTypesQuery.isError || !raceTypesQuery.data ? (
              <>Error...</>
            ) : (
              <FormControl>
                <InputLabel id={`label-for-raceType`}>Race Type</InputLabel>
                <Select
                  name={"raceType"}
                  id={"raceType"}
                  labelId={`label-for-raceType`}
                  error={
                    participantFormik.errors.raceType != undefined &&
                    participantFormik.touched.raceType
                  }
                  label={"Race Type"}
                  value={participantFormik.values.raceType}
                  onChange={participantFormik.handleChange}
                  sx={{ minWidth: 100 }}
                >
                  {raceTypesQuery.data.map((raceType) => {
                    if (raceType.id && raceType.name) {
                      return (
                        <MenuItem key={raceType.id} value={raceType.id}>
                          {raceType.name}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
            )}

            <Grid container>
              <Grid flexGrow={1}>
                <Button
                  type={"button"}
                  color={"error"}
                  fullWidth
                  onClick={props.handleBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid flexGrow={1}>
                {participantFormik.isSubmitting ? (
                  <CircularProgress />
                ) : (
                  <Button type={"submit"} color={"success"} fullWidth>
                    Finish Individual
                  </Button>
                )}
              </Grid>
            </Grid>
          </Stack>
        </form>
      </CustomTabPanel>
      <CustomTabPanel index={1} value={panelIndex}>
        <RelayTeamMemberPanel
          raceId={props.raceId}
          userId={props.userId}
          userName={props.userName}
          handleSuccess={props.handleSuccess}
        />
      </CustomTabPanel>
    </StepCardLayout>
  );
};

export default CreateParticipantStep;
