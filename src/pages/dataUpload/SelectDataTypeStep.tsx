import StepCardLayout from "../createNewUserParticipant/StepCardLayout.tsx";
import * as Yup from "yup";
import {
    Button, Card,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import {DateTime} from "luxon";
import {useQuery} from "@tanstack/react-query";
import {getApiClient} from "../../services/api/api.ts";
import Grid from "@mui/material/Unstable_Grid2";

const dataTypeOptions: {name: string, schema: Yup.ObjectSchema<object>}[] = [
    {
        name: "Users",
        schema: Yup.object({
            first_name: Yup.string().required().trim(),
            last_name: Yup.string().required().trim(),
            email: Yup.string().email().trim(),
            phone_number: Yup.string().trim(),
            date_of_birth: Yup.date().required().transform((value, originalValue: string, context) => {
                let newValue;
                if (context.isType(value) && value.getFullYear() < DateTime.now().year) {
                    value.setUTCHours(0, 0, 0, 0);
                    return value;
                }

                if (!isNaN(parseInt(originalValue))) {
                    const age = parseInt(originalValue);
                    newValue = DateTime.now().toUTC().set({month: 1, day: 2, hour: 0, minute: 0, second: 0, millisecond: 0}).minus({year: age});
                } else {
                    newValue = DateTime.fromISO(originalValue).set({hour: 0, minute: 0, second: 0, millisecond: 0});
                }

                return newValue.isValid ? newValue.toJSDate() : new Date('');
            }),
            gender: Yup.string().default("U").trim(),
        })
    },
    {
        name: "Participants",
        schema: Yup.object({
            bib_number: Yup.number().required().positive("Bib Number must be positive!").integer("Bib Number must be a full integer!"),
            is_ftt: Yup.boolean().default(false),
            team: Yup.string().notRequired().trim(),
            swim_time: Yup.string().notRequired().matches(/^\d{2}:\d{2}$/, "Swim Time must be in format MM:SS"),
            city: Yup.string().notRequired().trim(),
            province: Yup.string().trim().notRequired().max(5, "Province should be max 5 characters, use short codes!"),
            country: Yup.string().notRequired().trim(),
            race_id: Yup.number().required("Race ID is required").positive("Race ID must be a positive integer").integer("Race ID must be an integer"),
            race_type_id: Yup.number().required("Race Type ID is required").positive("Race Type ID must be a positive integer").integer("Race Type ID must be an integer"),
            user_id: Yup.number().required("User ID is required").positive("User ID must be a positive integer").integer("User ID must be an integer"),
        })
    }
]

const SelectDataTypeStep = (props: {handelSuccess: (arg0: { name: string; schema: Yup.ObjectSchema<object> }) => void}) => {

    const formik = useFormik({
        initialValues: {
            dataType: "",
        },
        onSubmit: (values) => {
            const dataTypeSelected = dataTypeOptions.find((value) => value.name == values.dataType);
            if (dataTypeSelected) {
                props.handelSuccess(dataTypeSelected);
            }
        }
    })

    const raceTypesQuery = useQuery({
        queryKey: ['getRaceTypes'],
        queryFn: () => getApiClient().then(client => client.race_api_get_race_types().then(res => res.data))
    });

    const racesQuery = useQuery({
        queryKey: ["getRaces"],
        queryFn: () => getApiClient().then(client => client.race_api_get_races()).then(res => res.data)
    });

    return (
        <StepCardLayout instructions={"First, select the data type you wish to upload."}>
            <Grid direction={"row"} container justifyContent={"space-around"}>
                <Grid>
                    <Typography>Some useful information for bulk uploads:</Typography>
                    <Grid container direction={"row"} justifyContent={"space-around"} gap={2}>
                        <Grid>
                            {
                                racesQuery.isLoading
                                    ? <Skeleton />
                                    : racesQuery.isError || racesQuery.data == undefined
                                        ? <>Error...</>
                                        : <Stack spacing={2}>
                                            {
                                                racesQuery.data.map((race) => {
                                                    return <Card key={race.id}>
                                                        <Container sx={{ py: 2, px: 1 }}>
                                                            <Typography variant={"body1"}>{race.name} ---{">"} {race.id}</Typography>
                                                        </Container>
                                                    </Card>
                                                })
                                            }
                                        </Stack>
                            }
                        </Grid>
                        <Grid>
                            {
                                raceTypesQuery.isLoading
                                    ? <Skeleton />
                                    : raceTypesQuery.isError || raceTypesQuery.data == undefined
                                        ? <>Error...</>
                                        : <Stack spacing={2}>
                                            {
                                                raceTypesQuery.data.map((raceType) => {
                                                    return <Card key={raceType.id}>
                                                        <Container sx={{ py: 2, px: 1 }}>
                                                            <Typography variant={"body1"}>{raceType.name} ---{">"} {raceType.id}</Typography>
                                                        </Container>
                                                    </Card>
                                                })
                                            }
                                        </Stack>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <FormControl>
                                <InputLabel id={`label-for-dataType`}>Data Type</InputLabel>
                                <Select name={'dataType'} id={"dataType"} labelId={`label-for-dataType`}
                                        error={(formik.errors.dataType != undefined && formik.touched.dataType)}
                                        label={"Data Type"} value={formik.values.dataType}
                                        onChange={formik.handleChange}
                                        sx={{minWidth: 200}}>
                                    {
                                        dataTypeOptions.map(({name}) => {
                                            return <MenuItem key={name} value={name}>{name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <Button type={"submit"} color={"success"}>Continue</Button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </StepCardLayout>
    );

}

export default SelectDataTypeStep;