import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
} from "@mui/material";
import {useFormik} from "formik";
import {useQuery} from "@tanstack/react-query";
import {getApiClient} from "../../services/api/api.ts";
import StepCardLayout from "./StepCardLayout.tsx";
import * as Yup from "yup";


const SelectRaceStep = (props: {handleSuccess: (arg0: number) => void}) => {

    const SelectRaceFormSchema = Yup.object({
        race: Yup.number().required("Race selection is required!"),
    })

    const formik = useFormik({
        initialValues: {
            race: "",
        },
        validationSchema: SelectRaceFormSchema,
        onSubmit: (values) => {
            props.handleSuccess(parseInt(values.race));
        }
    });

    const racesQuery = useQuery({
        queryKey: ["getRaces"],
        queryFn: () => getApiClient().then(client => client.race_api_get_races()).then(res => res.data)
    });

    return (
        <StepCardLayout instructions={"Select the participant's race."}>
            {
                racesQuery.isLoading
                    ? <Skeleton variant={"rectangular"} /> : racesQuery.isError || !racesQuery.data ? <>Error...</>
                        : <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>
                                <FormControl>
                                    <InputLabel id={`label-for-race`}>Race</InputLabel>
                                    <Select name={'race'} id={"race"} labelId={`label-for-race`}
                                            error={(formik.errors.race != undefined && formik.touched.race)}
                                            label={"Gender"} value={formik.values.race} onChange={formik.handleChange}
                                            sx={{ minWidth: 200 }}>
                                        {
                                            racesQuery.data.map((race) => {
                                                if (race.id && race.name) {
                                                    return <MenuItem key={race.id} value={race.id}>{race.name}</MenuItem>
                                                }
                                                return null;
                                            })
                                        }
                                    </Select>
                                </FormControl>

                                <Button type={"submit"} color={"success"}>Continue</Button>
                            </Stack>
                        </form>
            }
        </StepCardLayout>
    );
}

export default SelectRaceStep;