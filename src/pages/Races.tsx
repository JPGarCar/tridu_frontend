import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    IconButton,
    Skeleton,
    Stack, TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CustomCard from "../components/CustomCard.tsx";
import {DeleteSharp} from "@mui/icons-material";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getApiClient} from "../services/api/api.ts";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Components} from "../services/api/openapi";
import {useState} from "react";


function CreateRaceTypeDialog(props: { isOpen: boolean, handleClose: () => void }) {

    const queryClient = useQueryClient();

    const HeatFormCreateSchema = Yup.object({
        name: Yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: HeatFormCreateSchema,
        onSubmit: async (values) => {
            const api = await getApiClient();
            const response = await api.race_api_create_race_type(
                null,
                {
                    name: values.name
                }
            );

            if (response.status === 201) {
                queryClient.setQueryData(
                    ["getRaceTypes"],
                    (oldData: Components.Schemas.RaceTypeSchema[]) => {
                        oldData.push(response.data);
                        return oldData;
                    }
                );
                props.handleClose();
            }
        }
    });

    return (
        <Dialog open={props.isOpen} onClose={() => {props.handleClose();}} >
            <DialogTitle>Create Heat</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField label={"Name"} value={formik.values.name}
                               onChange={formik.handleChange} id={"name"}
                               error={formik.errors.name != undefined}
                               helperText={formik.errors.name ?? ""} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {props.handleClose();}}>Cancel</Button>
                    <Button type={"submit"} color={"success"}>Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}


const Races = () => {

    const [createRaceTypeDialogIsOpen, setCreateRaceTypeDialogIsOpen] = useState(false);

    const raceTypesQuery = useQuery({
        queryKey: ['getRaceTypes'],
        queryFn: () => getApiClient().then(client => client.race_api_get_race_types().then(res => res.data))
    });

    const racesQuery = useQuery({
        queryKey: ["getRaces"],
        queryFn: () => getApiClient().then(client => client.race_api_get_races()).then(res => res.data)
    });

    return (
        <Grid container justifyContent={"space-around"} sx={{ mt: 4 }}>
            <Grid xs={5}>
                <CustomCard title={"Races"}>
                    <Grid sx={{ pt: 0, pb: 2 }}>
                        <Button size={"small"} color={"success"} variant={"outlined"} disabled>New</Button>
                    </Grid>
                    <Divider />
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {
                            racesQuery.isLoading
                                ? <Skeleton variant={"rectangular"} />
                                : racesQuery.data === undefined
                                    ? <div>Error...</div>
                                    : racesQuery.data.map(race => {
                                        return (
                                            <Card key={race.id}>
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid xs={10}>
                                                            <Typography variant={"body1"}>{race.name}</Typography>
                                                        </Grid>
                                                        <Grid xs>
                                                            <IconButton disabled><DeleteSharp color={"error"} /></IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        );
                                    })
                        }
                    </Stack>
                </CustomCard>
            </Grid>
            <Grid xs={5}>
                <CustomCard title={"Race Types"}>
                    <Grid sx={{ pt: 0, pb: 2 }}>
                        <Button size={"small"} color={"success"} variant={"outlined"} onClick={() => {setCreateRaceTypeDialogIsOpen(true);}}>New</Button>
                        <CreateRaceTypeDialog isOpen={createRaceTypeDialogIsOpen} handleClose={() => {setCreateRaceTypeDialogIsOpen(false);}} />
                    </Grid>
                    <Divider />
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {
                            raceTypesQuery.isLoading
                                ? <Skeleton variant={"rectangular"} />
                                : raceTypesQuery.data === undefined
                                    ? <div>Error...</div>
                                    : raceTypesQuery.data.map(raceType => {
                                        return (
                                            <Card key={raceType.id}>
                                                <CardContent>
                                                    <Grid container>
                                                        <Grid xs={10}>
                                                            <Typography variant={"body1"}>{raceType.name}</Typography>
                                                        </Grid>
                                                        <Grid xs>
                                                            <IconButton disabled><DeleteSharp color={"error"} /></IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        );
                                    })
                        }
                    </Stack>
                </CustomCard>
            </Grid>
        </Grid>
    );

}

export default Races;