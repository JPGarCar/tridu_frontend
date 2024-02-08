import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";

const CustomCard = (props: React.PropsWithChildren<{ title: string }>) => {
  return (
    <Card>
      <Box textAlign={"center"} sx={{ m: 2 }}>
        <Typography variant={"h5"} component={"div"}>
          {props.title}
        </Typography>
      </Box>
      <Divider />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default CustomCard;
