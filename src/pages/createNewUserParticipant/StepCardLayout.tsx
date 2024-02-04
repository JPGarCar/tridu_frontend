import React from "react";
import {
    Box,
    Container,
    Typography
} from "@mui/material";


const StepCardLayout = (props: React.PropsWithChildren<{instructions: string}>) => {
    return (
        <Box textAlign={"center"}>
            <Typography variant={"body1"}>{props.instructions}</Typography>

            <Container sx={{ mt: 3 }}>
                {props.children}
            </Container>
        </Box>
    );
}

export default StepCardLayout;