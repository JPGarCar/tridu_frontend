import Grid from "@mui/material/Unstable_Grid2";
import CustomCard from "../components/CustomCard.tsx";
import {
  Box,
  ButtonBase,
  Card,
  Container,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApiServiceContext } from "../context/ApiContext.tsx";

const Dashboard = () => {
  const race_id = 1;
  const refetchInterval = 10000; // 10 seconds

  const navigate = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const disabledParticipantsQuery = useQuery({
    queryKey: ["disabledParticipants", race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.race_api_race_participants_disabled({ race_id: race_id }),
        )
        .then((res) => res.data),
    refetchInterval: refetchInterval,
  });

  const recentEditedParticipantsQuery = useQuery({
    queryKey: ["recentEditedParticipantsQuery", race_id],
    queryFn: () =>
      getApiClient()
        .then((api) => api.participants_api_recently_edited_participants())
        .then((res) => res.data),
    refetchInterval: refetchInterval,
  });

  const invalidSwimTimeParticipantsQuery = useQuery({
    queryKey: ["invalidSwimTimeParticipantsQuery", race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.participants_api_participants_with_invalid_swim_time({
            race_id: race_id,
          }),
        )
        .then((res) => res.data),
    refetchInterval: refetchInterval,
  });

  const raceStatsQuery = useQuery({
    queryKey: ["raceStatsQuery", race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.race_api_get_race_stats({
            race_id: race_id,
          }),
        )
        .then((res) => res.data),
  });

  return (
    <Grid container gap={2} sx={{ p: 3 }} justifyContent={"space-around"}>
      <Grid xs={12}>
        <CustomCard title={"Race Stats"}>
          {raceStatsQuery.isLoading ? (
            <Skeleton />
          ) : raceStatsQuery.isError || raceStatsQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Race Type</TableCell>
                  <TableCell>Allowed</TableCell>
                  <TableCell>Registered</TableCell>
                  <TableCell>Open Spots</TableCell>
                  <TableCell>FTT Allowed</TableCell>
                  <TableCell>FTT Registered</TableCell>
                  <TableCell>FTT Open Spots</TableCell>
                </TableHead>
                <TableBody>
                  {raceStatsQuery.data.map((stat) => {
                    const allowedLeft = stat.allowed - stat.registered;
                    const fttAllowedLeft =
                      stat.ftt_allowed - stat.ftt_registered;

                    const greenBackground = {
                      backgroundColor: "lightgreen",
                      border: 1,
                    };
                    const yellowBackground = {
                      backgroundColor: "lightyellow",
                      border: 1,
                    };
                    const redBackground = {
                      backgroundColor: "lightsalmon",
                      border: 1,
                    };

                    const normalColor =
                      allowedLeft == 0
                        ? greenBackground
                        : allowedLeft > 0
                          ? yellowBackground
                          : redBackground;

                    const fttColor =
                      fttAllowedLeft == 0
                        ? greenBackground
                        : fttAllowedLeft > 0
                          ? yellowBackground
                          : redBackground;

                    return (
                      <TableRow key={stat.race_type.id}>
                        <TableCell component="th" scope={"row"}>
                          {stat.race_type.name}
                        </TableCell>
                        <TableCell sx={normalColor}>{stat.allowed}</TableCell>
                        <TableCell sx={normalColor}>
                          {stat.registered}
                        </TableCell>
                        <TableCell sx={normalColor}>{allowedLeft}</TableCell>
                        <TableCell sx={fttColor}>{stat.ftt_allowed}</TableCell>
                        <TableCell sx={fttColor}>
                          {stat.ftt_registered}
                        </TableCell>
                        <TableCell sx={fttColor}>{fttAllowedLeft}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CustomCard>
      </Grid>
      <Grid sx={{ maxHeight: "100%", overflow: "auto" }}>
        <CustomCard title={"Inactive Participants"}>
          {disabledParticipantsQuery.isLoading ? (
            <Skeleton />
          ) : disabledParticipantsQuery.isError ||
            disabledParticipantsQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <Stack spacing={2}>
              {disabledParticipantsQuery.data.length == 0 ? (
                <Container>No Inactive Participants</Container>
              ) : (
                disabledParticipantsQuery.data.map((participant) => {
                  return (
                    <Card key={participant.id}>
                      <ButtonBase
                        sx={{ width: "100%" }}
                        onClick={() => {
                          navigate(`/participants/${participant.user.id}`);
                        }}
                      >
                        <Box sx={{ m: 2 }}>
                          <Typography>
                            {participant.bib_number} |{" "}
                            {participant.user.first_name}{" "}
                            {participant.user.last_name}
                          </Typography>
                        </Box>
                      </ButtonBase>
                    </Card>
                  );
                })
              )}
            </Stack>
          )}
        </CustomCard>
      </Grid>
      <Grid sx={{ maxHeight: "100%", overflow: "auto" }}>
        <CustomCard title={"Recently Edited Participants"}>
          {recentEditedParticipantsQuery.isLoading ? (
            <Skeleton />
          ) : recentEditedParticipantsQuery.isError ||
            recentEditedParticipantsQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <Stack spacing={2}>
              {recentEditedParticipantsQuery.data.length == 0 ? (
                <Container>No Participants Recently Edited</Container>
              ) : (
                recentEditedParticipantsQuery.data.map((participant) => {
                  return (
                    <Card key={participant.id}>
                      <ButtonBase
                        sx={{ width: "100%" }}
                        onClick={() => {
                          navigate(`/participants/${participant.user.id}`);
                        }}
                      >
                        <Box sx={{ m: 2 }}>
                          <Typography>
                            {participant.bib_number} |{" "}
                            {participant.user.first_name}{" "}
                            {participant.user.last_name}
                          </Typography>
                        </Box>
                      </ButtonBase>
                    </Card>
                  );
                })
              )}
            </Stack>
          )}
        </CustomCard>
      </Grid>
      <Grid sx={{ maxHeight: "100%", overflow: "auto" }}>
        <CustomCard title={"Invalid Swim Time Participants"}>
          {invalidSwimTimeParticipantsQuery.isLoading ? (
            <Skeleton />
          ) : invalidSwimTimeParticipantsQuery.isError ||
            invalidSwimTimeParticipantsQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <Stack spacing={2}>
              {invalidSwimTimeParticipantsQuery.data.length == 0 ? (
                <Container>No Participants with invalid swim time</Container>
              ) : (
                invalidSwimTimeParticipantsQuery.data.map((participant) => {
                  return (
                    <Card key={participant.id}>
                      <ButtonBase
                        sx={{ width: "100%" }}
                        onClick={() => {
                          navigate(`/participants/${participant.user.id}`);
                        }}
                      >
                        <Box sx={{ m: 2 }}>
                          <Typography>
                            {participant.bib_number} |{" "}
                            {participant.user.first_name}{" "}
                            {participant.user.last_name}
                          </Typography>
                        </Box>
                      </ButtonBase>
                    </Card>
                  );
                })
              )}
            </Stack>
          )}
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
