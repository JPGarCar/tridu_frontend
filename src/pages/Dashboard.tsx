import Grid from "@mui/material/Unstable_Grid2";
import CustomCard from "../components/CustomCard.tsx";
import {
  Box,
  ButtonBase,
  Card,
  Container,
  Divider,
  Pagination,
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
import ParticipantSearchAutocomplete from "../components/ParticipantSearchAutocomplete.tsx";
import { ChangeEvent, useMemo, useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext.tsx";

const refetchInterval = 60000; // 60 seconds
const perPageCount = 10;

function InactiveParticipantsListCard(props: { race_id: number }) {
  const { getApiClient } = useApiServiceContext();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const disabledParticipantsQuery = useQuery({
    queryKey: ["disabledParticipants", props.race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.race_api_race_api_get_race_participants_disabled({
            race_id: props.race_id,
          }),
        )
        .then((res) => res.data),
    refetchInterval: refetchInterval,
  });

  const pageCount = useMemo(() => {
    const arrayLength = disabledParticipantsQuery.data?.length ?? 0;
    return Math.ceil((arrayLength == 0 ? 1 : arrayLength) / perPageCount);
  }, [disabledParticipantsQuery.data]);

  return (
    <CustomCard title={"Inactive Participants"}>
      {disabledParticipantsQuery.isLoading ? (
        <Skeleton />
      ) : disabledParticipantsQuery.isError ||
        disabledParticipantsQuery.data == undefined ? (
        <>Error...</>
      ) : (
        <Box>
          <Grid container justifyContent={"space-between"} gap={2}>
            <Grid>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                size={"small"}
              />
            </Grid>
            <Grid>
              <Typography>
                Count {disabledParticipantsQuery.data.length}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            {disabledParticipantsQuery.data.length == 0 ? (
              <Container>No Inactive Participants</Container>
            ) : (
              disabledParticipantsQuery.data
                .slice(
                  (page - 1) * perPageCount,
                  (page - 1) * perPageCount + perPageCount,
                )
                .map((participant) => {
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
        </Box>
      )}
    </CustomCard>
  );
}

function InvalidSwiMTimeParticipantsListCard(props: { race_id: number }) {
  const { getApiClient } = useApiServiceContext();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const invalidSwimTimeParticipantsQuery = useQuery({
    queryKey: ["invalidSwimTimeParticipantsQuery", props.race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.race_api_race_api_get_race_participants_with_invalid_swim_time({
            race_id: props.race_id,
          }),
        )
        .then((res) => res.data),
    refetchInterval: refetchInterval,
  });

  const pageCount = useMemo(() => {
    const arrayLength = invalidSwimTimeParticipantsQuery.data?.length ?? 0;
    return Math.ceil((arrayLength == 0 ? 1 : arrayLength) / perPageCount);
  }, [invalidSwimTimeParticipantsQuery.data]);

  return (
    <CustomCard title={"Invalid Swim Time Participants"}>
      {invalidSwimTimeParticipantsQuery.isLoading ? (
        <Skeleton />
      ) : invalidSwimTimeParticipantsQuery.isError ||
        invalidSwimTimeParticipantsQuery.data == undefined ? (
        <>Error...</>
      ) : (
        <Box>
          <Grid container justifyContent={"space-between"} gap={2}>
            <Grid>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                size={"small"}
              />
            </Grid>
            <Grid>
              <Typography>
                Count {invalidSwimTimeParticipantsQuery.data.length}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            {invalidSwimTimeParticipantsQuery.data.length == 0 ? (
              <Container>No Participants with invalid swim time</Container>
            ) : (
              invalidSwimTimeParticipantsQuery.data
                .slice(
                  (page - 1) * perPageCount,
                  (page - 1) * perPageCount + perPageCount,
                )
                .map((participant) => {
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
        </Box>
      )}
    </CustomCard>
  );
}

function StaffDashboard(props: { race_id: number }) {
  const navigate = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const recentEditedParticipantsQuery = useQuery({
    queryKey: ["recentEditedParticipantsQuery", props.race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.participants_api_participant_api_recently_edited_participants(),
        )
        .then((res) => res.data),
    refetchInterval: refetchInterval,
  });

  const raceStatsQuery = useQuery({
    queryKey: ["raceStatsQuery", props.race_id],
    queryFn: () =>
      getApiClient()
        .then((api) =>
          api.race_api_race_api_get_race_stats({
            race_id: props.race_id,
          }),
        )
        .then((res) => res.data),
  });

  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid xs={9}>
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
      <Grid xs={3}>
        <CustomCard title={"Recently Edited Participants"}>
          {recentEditedParticipantsQuery.isLoading ? (
            <Skeleton />
          ) : recentEditedParticipantsQuery.isError ||
            recentEditedParticipantsQuery.data == undefined ? (
            <>Error...</>
          ) : (
            <Stack spacing={1.5}>
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
                        <Box sx={{ m: 1.5 }}>
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
      <Grid>
        <InactiveParticipantsListCard race_id={props.race_id} />
      </Grid>
      <Grid>
        <InvalidSwiMTimeParticipantsListCard race_id={props.race_id} />
      </Grid>
    </Grid>
  );
}

const Dashboard = () => {
  const race_id = 1;

  const { getApiClient } = useApiServiceContext();

  const { loggedInUser } = useAuthServiceContext();

  const isStaff = useMemo(() => {
    if (loggedInUser != null) {
      return (
        (loggedInUser.is_staff ?? false) || (loggedInUser.is_superuser ?? false)
      );
    }

    return false;
  }, [loggedInUser]);

  const raceQuery = useQuery({
    queryKey: ["race"],
    queryFn: () =>
      getApiClient()
        .then((client) =>
          client.race_api_race_api_get_race({ race_id: race_id }),
        )
        .then((res) => res.data),
  });

  return (
    <Stack sx={{ p: 3 }}>
      <Grid container sx={{ pb: 2 }} justifyContent={"center"}>
        {raceQuery.isLoading ? (
          <Skeleton />
        ) : raceQuery.isError || raceQuery.data == undefined ? (
          <>Error...</>
        ) : (
          <Typography variant={"h5"}>
            Dashboard for {raceQuery.data.name}
          </Typography>
        )}
        <Grid sx={{ ml: "auto" }} flexGrow={1 / 4}>
          <ParticipantSearchAutocomplete />
        </Grid>
      </Grid>
      {isStaff ? <StaffDashboard race_id={race_id} /> : <></>}
    </Stack>
  );
};

export default Dashboard;
