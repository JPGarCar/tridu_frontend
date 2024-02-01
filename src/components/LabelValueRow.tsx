import {Stack, Typography} from "@mui/material";


const LabelValueRow = (props: {label: string, value: string}) => {
    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>{props.label}</Typography>
            <Typography>{props.value}</Typography>
        </Stack>
    );
}

export default LabelValueRow;