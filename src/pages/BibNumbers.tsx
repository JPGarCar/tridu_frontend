import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useApiServiceContext } from "../context/ApiContext.tsx";
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import CustomCard from "../components/CustomCard.tsx";

const BibNumbers = () => {
  const { getApiClient } = useApiServiceContext();

  const raceTypesQuery = useQuery({
    queryKey: ["getRaceTypes"],
    queryFn: () =>
      getApiClient().then((client) =>
        client
          .race_api_race_api_get_race_bib_info_per_race_type({ race_id: 1 })
          .then((res) => res.data),
      ),
  });

  return (
    <Container maxWidth={"xl"} sx={{ py: 2 }}>
      <Box textAlign={"center"}>
        <Typography>In use bib numbers by active participants only.</Typography>
      </Box>
      <Grid container gap={2}>
        {raceTypesQuery.isLoading ? (
          <Skeleton />
        ) : raceTypesQuery.isError || raceTypesQuery.data == undefined ? (
          <>Error...</>
        ) : (
          raceTypesQuery.data.map((raceType, index) => {
            return (
              <Grid key={index}>
                <CustomCard title={raceType.name}>
                  <Stack spacing={2}>
                    <Typography>
                      Smallest Bib #: {raceType.smallest_bib}
                    </Typography>
                    <Typography>
                      Largest Bib #: {raceType.largest_bib}
                    </Typography>
                    <Typography>Count: {raceType.count}</Typography>
                  </Stack>
                </CustomCard>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default BibNumbers;
