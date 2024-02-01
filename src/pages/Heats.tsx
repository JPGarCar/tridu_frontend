import {Box, Button, ButtonBase, Card, CardContent, Divider, Skeleton, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SnackbarServiceProvider, {useSnackbarServiceContext} from "../context/SnackbarContext.tsx";
import {useState} from "react";
import {Components} from "../services/api/openapi";
import CustomCard from "../components/CustomCard.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getApiClient} from "../services/api/api.ts";
import {DateTime, Duration} from "luxon";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    EditableRowStackNumberField, EditableRowStackSelectField,
    EditableRowStackTextField,
    EditableRowStackTimeField
} from "../components/EditableRowComponents.tsx";
import LabelValueRow from "../components/LabelValueRow.tsx";
import {useNavigate} from "react-router-dom";


function HeatListCard(props: {activeHeatId: number, setActiveHeatId: (arg0: number) => void}) {

    const heatsQuery = useQuery({
        queryKey: ['heatsQuery'],
        queryFn: () => getApiClient().then(apiClient => apiClient.heats_api_get_heats_for_race({ race_id: 1 }).then(res => res.data))
    });

    const getFormattedHeatStartDateTime = (datetimeString: string) => {
        const dateTime = DateTime.fromISO(datetimeString);

        return dateTime.toFormat("LLL dd, t")
    }

    return (
      <CustomCard title={"Heats"}>
          <Grid sx={{ pt: 0 }}>
              <Button size={"small"} color={"success"}>New</Button>
          </Grid>
          <Divider />
          <Stack spacing={2} sx={{ mt: 2 }}>
              {
                  heatsQuery.isLoading
                      ? <Skeleton variant={"rectangular"} />
                      : heatsQuery.data === undefined
                          ? <div>Error...</div>
                          : heatsQuery.data.map(heat => {
                          return (
                              <Card sx={heat.id === props.activeHeatId ? {
                                  border: 2,
                                  borderColor: 'success.main'
                              } : {}} key={heat.id} onClick={() => {
                                  if (heat.id) {
                                      props.setActiveHeatId(heat.id);
                                  }
                              }}>
                                  <CardContent>
                                      <Typography variant={"body1"}>{`${heat.race_type.name} ${heat.termination} - ${heat.participant_count}/${heat.ideal_capacity}`}</Typography>
                                      <Typography variant={"caption"}>{getFormattedHeatStartDateTime(heat.start_datetime)}</Typography>
                                  </CardContent>
                              </Card>
                          );
                      })
              }
          </Stack>
      </CustomCard>
    );

}

function HeatInformationForm(props: {heat: Components.Schemas.HeatSchema, onHeatUpdate: (arg0: Components.Schemas.HeatSchema) => void}) {

    const { pushAlert } = useSnackbarServiceContext();

    const HeatFormSchema = Yup.object({
        termination: Yup.string().length(1, "Length must be 1!"),
        color: Yup.string(),
        startDateTime: Yup.date().required(),
        idealCapacity: Yup.number().required().min(0, "Min value is 0!"),
        pool: Yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            termination: props.heat.termination,
            color: props.heat.color,
            startDateTime: DateTime.fromISO(props.heat.start_datetime),
            idealCapacity: props.heat.ideal_capacity,
            pool: props.heat.pool,
        },
        validationSchema: HeatFormSchema,
        onSubmit: async (values) => {
            const api = await getApiClient();
            const response = await api.heats_api_update_heat(
                        //@ts-expect-error I don't know why this is happens!
            { heat_id: props.heat.id ?? undefined },
                {
                    termination: values.termination,
                    color: values.color,
                    start_datetime: values.startDateTime.toISO(),
                    ideal_capacity: values.idealCapacity,
                    pool: values.pool,
                }
            )

            if (response.status === 201) {
                props.onHeatUpdate(response.data);
                setIsEditing(false);
            }

        }
    })

    const [isEditing, setIsEditing] = useState(false);

    const handleEditButton = () => {
        if (isEditing) {
            formik.resetForm();
            pushAlert("Changes canceled!", "warning");
        }
        setIsEditing((prevState) => !prevState);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container flexDirection={"column"} sx={{ m: 2 }}>
                <Grid sx={{ ml: 2 }}>
                    <Stack spacing={2}>
                        <EditableRowStackTextField label={"Category: "} data={formik.values.termination} editing={isEditing}
                                                   id={"termination"} error={formik.errors.termination} onChange={formik.handleChange} />
                        <EditableRowStackTextField label={"Color: "} data={formik.values.color} editing={isEditing}
                                                   id={"color"} error={formik.errors.color} onChange={formik.handleChange} />
                        <EditableRowStackNumberField label={"Ideal Capacity: "} data={formik.values.idealCapacity}
                                                     editing={isEditing} id={"idealCapacity"} error={formik.errors.idealCapacity}
                                                     onChange={formik.handleChange} />
                        <EditableRowStackSelectField label={"Pool: "} value={formik.values.pool} valueLabel={formik.values.pool}
                                                     editing={isEditing} id={"pool"} error={formik.errors.pool} onChange={formik.handleChange}
                                                     options={[{key: "RECREATION", value: "Recreation"}, {key: "COMPETITIVE", value: "Competitive"}]} />
                        <EditableRowStackTimeField label={"Start Time: "} data={formik.values.startDateTime} editing={isEditing}
                                                   id={"startDateTime"} error={formik.errors.startDateTime}
                                                   setFieldValue={(arg0, arg1, arg2) => {void formik.setFieldValue(arg0, arg1, arg2)}}
                        />
                    </Stack>
                </Grid>
                <Grid>
                    <Button onClick={handleEditButton}>{isEditing ? "Cancel" : "Edit"}</Button>
                    {
                        isEditing ? <Button type={"submit"} color={"success"}>Save</Button> : null
                    }
                </Grid>
            </Grid>
        </form>
    );

}

function HeatParticipantList(props: {heatId: number}) {

    const navigator = useNavigate();

    const participantsQuery = useQuery({
        queryKey: ["getParticipantsForHeat", props.heatId],
        queryFn: () => getApiClient().then(client => client.participants_api_get_participants_for_heat({heat_id: props.heatId})).then(res => res.data)
    });

    const getFormattedSwimTime = (swimTimeString: string | null): string => {
        if (!swimTimeString) {
            return "";
        }

        const duration = Duration.fromISO(swimTimeString).shiftTo("minutes", "seconds");

        return duration.toFormat("mm:ss")
    }

    return (
        participantsQuery.isLoading
            ? <Skeleton variant={"rectangular"} />
            : participantsQuery.isError || participantsQuery.data === undefined
                ? <div>Error... {participantsQuery.error?.message}</div>
                : <Grid>
                    {
                        participantsQuery.data.map(participant => {
                            return (
                                <Grid key={participant.id} xs={6}>
                                    <Card>
                                        <ButtonBase sx={{ width: "100%", justifyContent: "start" }} onClick={() => {navigator(`/participants/${participant.user.id}`)}}>
                                            <CardContent>
                                                <Typography variant={"body1"}>{participant.bib_number} | {`${participant.user.first_name} ${participant.user.last_name}`}</Typography>
                                                <Typography variant={"body2"}>Swim Time: {getFormattedSwimTime(participant.swim_time ?? null)}</Typography>
                                            </CardContent>
                                        </ButtonBase>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
    );

}

function HeatAdditionalInformation(props: {heat: Components.Schemas.HeatSchema}) {

    const formattedAvgSwimTime = (avgSwimTimeString: string) => {
        const dateTime = Duration.fromISO(avgSwimTimeString).shiftTo('minutes', 'seconds');

        return dateTime.toFormat("mm:ss")
    }

    return (
        <Stack spacing={2} sx={{ m: 2 }}>
            <LabelValueRow label={"Average Swim Time: "} value={formattedAvgSwimTime(props.heat.avg_swim_time)} />
            <LabelValueRow label={"Amount of Participants: "} value={props.heat.participant_count.toString()} />
        </Stack>
    );

}

function HeatInformationCard(props: {heatId: number}) {

    const heatQuery = useQuery({
        queryKey: ["getHeatQuery", props.heatId],
        queryFn: () => getApiClient().then(api => api.heats_api_get_heat({heat_id: props.heatId})).then(res => res.data)
    });

    const heat = heatQuery.data;

    const queryClient = useQueryClient()

    const handelHeatUpdate = (heat: Components.Schemas.HeatSchema) => {
        queryClient.setQueryData(["getHeatQuery", heat.id], heat);
    }

    return (
        heatQuery.isLoading
            ? <Skeleton variant={"rectangular"} />
            : heatQuery.isError || !heat
                ? <div>Error...</div>
                : <Card variant={"outlined"} sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                    <Box textAlign={"center"} sx={{p: 0.75}}>
                        <Typography variant={"h5"}
                                    component={"div"}>{heat.race_type.name} - {heat.termination}</Typography>
                    </Box>
                    <Divider/>
                    <Grid container>
                        <Grid xs={8}>
                            <HeatInformationForm heat={heat} onHeatUpdate={handelHeatUpdate} />
                        </Grid>
                        <Grid xs>
                            <HeatAdditionalInformation heat={heat} />
                        </Grid>
                    </Grid>
                    <Divider flexItem />
                    <HeatParticipantList heatId={props.heatId} />
                </Card>
    );

}

const Heats = () => {

    const [activeHeatId, setActiveHeatId] = useState<number | null>(null);

    return (
        <SnackbarServiceProvider>
            <Box sx={{ height: "100%", px: 5 }}>
                <Grid container spacing={4} sx={{ height: "100%", mt: 2 }}>
                    <Grid xs={4}>
                        <HeatListCard activeHeatId={activeHeatId ?? -1} setActiveHeatId={setActiveHeatId} />
                    </Grid>
                    <Grid xs>
                        {
                            activeHeatId != null ? <HeatInformationCard heatId={activeHeatId} /> : <div>Select a heat first!</div>
                        }
                    </Grid>
                </Grid>
            </Box>
        </SnackbarServiceProvider>
    );
}

export default Heats;