import {
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
    Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getApiClient} from "../services/api/api.ts";
import type {Components} from "../services/api/openapi";
import {useState} from "react";
import {useFormik} from "formik";
import {Send} from "@mui/icons-material";
import {DateTime, Duration} from "luxon";
import {
    EditableRowStackNumberField,
    EditableRowStackSelectField, EditableRowStackSwitch,
    EditableRowStackTextField
} from "../components/EditableRowComponents.tsx";



function ParticipantPICard(props: {userId: string}) {

    const queryClient = useQueryClient();

    const userQuery = useQuery({
        queryKey: ['getUserById', props.userId],
        queryFn: () => getApiClient().then(client => client.accounts_api_get_user_by_id(props.userId)).then(res => res.data)
    });

    const user = (userQuery.data as Components.Schemas.UserSchema);

    const [isEditing, setIsEditing] = useState(false);

    const formik = useFormik({
        initialValues: userQuery.isLoading ? {
            firstName: "",
            lastName: "",
            dob: "",
            gender: "",
            email: "",
            phone: ""
        } : {
            firstName: user.first_name,
            lastName: user.last_name,
            dob: user.date_of_birth,
            gender: user.gender,
            email: user.email,
            phone: user.phone_number
        },
        enableReinitialize: true,
        onSubmit: async (values, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            const apiClient = await getApiClient();
            const response = await apiClient.accounts_api_update_user(
                {user_id: user.id ?? 0},
                {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    date_of_birth: values.dob,
                    gender: values.gender,
                    email: values.email,
                    phone_number: values.phone
                }
            );

            if (response.status == 201) {
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
                queryClient.setQueryData(['getUserById', props.userId], response.data);
                setIsEditing(false);
            }
        }
    })

    return (
        userQuery.isLoading ? <Skeleton /> : <Card>
            <Box textAlign={"center"} sx={{p: 0.75}}>
                <Typography variant={"h5"} component={"div"}>Personal Info</Typography>
            </Box>
            <Divider/>
            <form onSubmit={formik.handleSubmit}>
                <CardContent>
                    <Box sx={{pl: 2}}>
                        <Stack spacing={2}>
                            <EditableRowStackTextField label={"First Name:"} data={formik.values.firstName} id={"firstName"}
                                                       editing={isEditing} onChange={formik.handleChange}/>
                            <EditableRowStackTextField label={"Last Name:"} data={formik.values.lastName} id={"lastName"}
                                                       editing={isEditing} onChange={formik.handleChange}/>
                            <Stack direction={"row"} spacing={4}>
                                <EditableRowStackTextField label={"DOB (Y-M-D):"} data={formik.values.dob} id={"dob"}
                                                           editing={isEditing} onChange={formik.handleChange}/>
                                <EditableRowStackTextField label={"Age:"} data={Math.abs(DateTime.fromISO(formik.values.dob ?? "").minus({year: 2023}).year).toString()} editing={false} id={"age"}
                                                           onChange={formik.handleChange}/>
                            </Stack>
                            <EditableRowStackSelectField label={"Gender:"} data={formik.values.gender} id={"gender"} editing={isEditing}
                                                       onChange={formik.handleChange} options={[{value: "U", key: "Undefined"}, {value: "M", key: "Male"}, {value: "F", key: "Female"}]}/>
                            <EditableRowStackTextField label={"Email:"} data={formik.values.email} id={"email"} editing={isEditing}
                                                       onChange={formik.handleChange}/>
                            <EditableRowStackTextField label={"Phone #:"} data={formik.values.phone} id={"phone"} editing={isEditing}
                                                       onChange={formik.handleChange}/>
                        </Stack>
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button onClick={() => {
                        if (isEditing) {
                            formik.resetForm();
                            setIsEditing(false);
                        } else {
                            setIsEditing(true);
                        }
                    }}>{ isEditing ? "Cancel" : "Edit"}</Button>
                    {
                        isEditing ? <Button type={"submit"} color={"success"}>Save</Button> : null
                    }
                </CardActions>
            </form>
        </Card>
    );
}

function ParticipantRaceListCard(props: {
        userId: string, activeParticipantId: number | null, setActiveParticipant: (arg0: Components.Schemas.ParticipantSchema) => void}) {

    const participantsQuery = useQuery({
        queryKey: ['getParticipantsForUser', props.userId],
        queryFn: () => getApiClient().then(client => client.participants_api_get_participants_for_user(props.userId)).then(res => res.data)
    });

    const participants = (participantsQuery.data as Components.Schemas.ParticipantSchema[]);

    return (
        participantsQuery.isLoading ? <Skeleton /> : <Card>
            <Box textAlign={"center"} sx={{p: 0.75}}>
                <Typography variant={"h5"} component={"div"}>Races</Typography>
            </Box>
            <Divider/>
            <CardContent>

                {
                    participants.length > 0 ? <Stack spacing={2}>
                        {
                            participants.map(participant => {
                                return (
                                    <Card sx={participant.id === props.activeParticipantId ? { border: 2, borderColor: 'success.main' } : {}} key={participant.id} onClick={() => { props.setActiveParticipant(participant); }} >
                                        <CardContent>
                                            {participant.race.name}
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </Stack> : <div>No races!</div>
                }


            </CardContent>
        </Card>
    );
}

function CommentInput(props: {participant_id: number, onCommentSubmit: () => void}) {

    const formik = useFormik({
        initialValues: {
            commentText: '',
        },
        onSubmit: async (values, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            const apiClient = await getApiClient();
            const response = await apiClient.participants_api_create_participant_comment(
                {
                    participant_id: props.participant_id,
                },
                { comment: values.commentText },
            );

            if (response.status == 201) {
                props.onCommentSubmit();
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
            } else {
                // todo
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl variant={"outlined"}>
                <InputLabel htmlFor={"commentText"}>Comment</InputLabel>
                <OutlinedInput
                    id={"commentText"} type={"text"} label={"Comment"} multiline
                    value={formik.values.commentText}
                    onChange={formik.handleChange}
                    endAdornment={
                        <InputAdornment position={"end"}><IconButton type={"submit"}><Send/></IconButton></InputAdornment>
                    }
                />
            </FormControl>
        </form>
    );
}

function ParticipantRaceCard(props: {participant: Components.Schemas.ParticipantSchema}) {

    const commentsQuery = useQuery({
        queryKey: ['getComments', props.participant.id],
        queryFn: () => getApiClient().then(client => client.participants_api_get_participant_comments(props.participant.id)).then(res => res.data)
    });

    const [isEditing, setIsEditing] = useState(false);

    const formik = useFormik({
        initialValues: {
            bib_num: props.participant.bib_number,
            is_ftt: props.participant.is_ftt,
            team: props.participant.team,
            swimTime: Duration.fromISO(props.participant.swim_time ?? "").shiftTo('minutes').minutes,
            city: props.participant.origin.city,
            province: props.participant.origin.province,
            country: props.participant.origin.country,
        },
        enableReinitialize: true,
        onSubmit: async (values, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            const apiClient = await getApiClient();
            const response = await apiClient.participants_api_update_participant(
                {participant_id: props.participant.id ?? 0},
                {
                    bib_number: values.bib_num,
                    is_ftt: values.is_ftt,
                    team: values.team,
                    swim_time: Duration.fromObject({ minutes: values.swimTime }).toISO(),
                    origin: {
                        city: values.city,
                        province: values.province,
                        country: values.country,
                    }
                }
            );

            if (response.status == 201) {
                formikHelpers.setSubmitting(false);
                setIsEditing(false);
            }
        }
    });

    const onCommentSubmit = () => {
        void commentsQuery.refetch();
    }

    return (
        <Card variant={"outlined"} sx={{height: "100%", display: "flex", flexDirection: "column"}}>
            <Box textAlign={"center"} sx={{p: 0.75}}>
                <Typography variant={"h5"}
                            component={"div"}>{props.participant.race.name} - {props.participant.bib_number}</Typography>
            </Box>
            <Divider/>
            <Grid container flexGrow={1}>
                <Grid xs>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container flexDirection={"column"}>
                            <Grid xs container spacing={2} sx={{p: 2}}>
                                <Grid xs={6}>
                                    <Stack spacing={2}>
                                        <EditableRowStackTextField label={"Bib #:"}
                                                                   data={formik.values.bib_num.toString()}
                                                                   editing={isEditing} id={"bib_num"}
                                                                   onChange={formik.handleChange}/>
                                        <EditableRowStackSwitch label={"Is FTT:"} checked={formik.values.is_ftt}
                                                                editing={isEditing} id={"is_ftt"}
                                                                onChange={formik.handleChange}/>
                                        <EditableRowStackTextField label={"Team:"} data={formik.values.team}
                                                                   editing={isEditing} id={"team"}
                                                                   onChange={formik.handleChange}/>
                                        <EditableRowStackNumberField label={"Swim Time (Minutes):"} data={formik.values.swimTime}
                                                                   editing={isEditing} id={"swimTime"}
                                                                   onChange={formik.handleChange}/>
                                    </Stack>
                                </Grid>
                                <Grid xs={6}>
                                    <Stack spacing={2}>
                                        <EditableRowStackTextField label={"City:"} data={formik.values.city}
                                                                   editing={isEditing} id={"city"}
                                                                   onChange={formik.handleChange}/>
                                        <EditableRowStackTextField label={"Province:"} data={formik.values.province}
                                                                   editing={isEditing} id={"province"}
                                                                   onChange={formik.handleChange}/>
                                        <EditableRowStackTextField label={"Country:"} data={formik.values.country}
                                                                   editing={isEditing} id={"country"}
                                                                   onChange={formik.handleChange}/>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid xs={2}>
                                <CardActions>
                                    <Button onClick={() => {
                                        if (isEditing) {
                                            formik.resetForm();
                                            setIsEditing(false);
                                        } else {
                                            setIsEditing(true);
                                        }
                                    }}>{isEditing ? "Cancel" : "Edit"}</Button>
                                    {
                                        isEditing ? <Button type={"submit"} color={"success"}>Save</Button> : null
                                    }
                                </CardActions>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Divider orientation={"vertical"} flexItem/>
                <Grid container xs={3} flexDirection={"column"} alignContent={"stretch"}>
                    <Grid xs sx={{p: 1, maxHeight: "100%", overflow: "auto"}}>
                        {
                            commentsQuery.isLoading ? <>Loading...</> : commentsQuery.isError ? <>Error...</> : commentsQuery.data == "" ? <>No
                                comments...</> : <Stack spacing={2} direction={"column-reverse"}>
                                {
                                    (commentsQuery.data as Components.Schemas.ParticipantCommentSchema[]).map(comment => {
                                            return (
                                                <Card key={comment.id}>
                                                    <CardContent>
                                                        {comment.comment}
                                                    </CardContent>
                                                    <CardActions>
                                                        <Typography variant={"caption"}>By: {comment.writer_name} | {comment.creation_date}</Typography>
                                                    </CardActions>
                                                </Card>
                                            );
                                        }
                                    )
                                }
                            </Stack>
                        }
                    </Grid>
                    <Divider flexItem/>
                    <Grid flexWrap={"nowrap"} sx={{p: 1}}>
                        <CommentInput participant_id={props.participant.id ?? 0} onCommentSubmit={onCommentSubmit}/>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

const Participant = () => {

    const {userId} = useParams();

    const [activeParticipant, setActiveParticipant] = useState<Components.Schemas.ParticipantSchema | null>(null);

    return (
        <Box sx={{ height: "100%", px: 5 }}>
            <Grid container spacing={4} sx={{ height: "100%", mt: 2 }}>
                <Grid xs={4}>
                    <Stack spacing={2}>
                        <ParticipantPICard userId={userId ?? ""} />
                        <ParticipantRaceListCard userId={userId ?? ""} activeParticipantId={activeParticipant?.id ?? null} setActiveParticipant={setActiveParticipant}/>
                    </Stack>
                </Grid>
                <Grid xs={8}>
                    {
                        activeParticipant != null ? <ParticipantRaceCard participant={activeParticipant}/> : <div>Select a race first!</div>
                    }
                </Grid>
            </Grid>
        </Box>
    );

}

export default Participant;