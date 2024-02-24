import StepCardLayout from "../createNewUserParticipant/StepCardLayout.tsx";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Stack,
} from "@mui/material";
import { getApiClient } from "../../services/api/api.ts";
import Papa from "papaparse";
import * as FileSaver from "file-saver";
import { flatten } from "flat";

const ReviewDataStep = (props: {
  validObjects: object[];
  dataTypeName: string;
  handleSuccess: () => void;
  handleFailure: () => void;
}) => {
  const [sendingData, setSendingData] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [serverResponse, setServerResponse] = useState<{
    message: string;
    created: number;
    duplicates: number;
    items: string[];
  }>({
    message: "",
    duplicates: 0,
    created: 0,
    items: [],
  });

  const submitData = async () => {
    setSendingData(true);

    const api = await getApiClient();
    let response = null;

    if (props.dataTypeName == "Users") {
      response = await api.accounts_api_create_users_bulk(
        null,
        props.validObjects,
      );
    } else if (props.dataTypeName == "Participants") {
      response =
        await api.participants_api_participant_api_create_participant_bulk(
          null,
          // @ts-expect-error We know the obj is correct!
          props.validObjects,
        );
    }

    if (response) {
      setServerErrors(response.data.errors);
      setServerResponse({
        message: response.data.message,
        created: response.data.created,
        duplicates: response.data.duplicates,
        items: response.data.items,
      });
    }
    setSendingData(false);
  };

  const downloadData = () => {
    const returnObjs = [];
    for (const objStr of serverResponse.items) {
      returnObjs.push(flatten(JSON.parse(objStr)));
    }
    const unparse = Papa.unparse(returnObjs);

    const blob = new Blob([unparse], {
      type: "text/csv;charset=utf-8",
    });

    FileSaver.saveAs(blob, "DataDownload.csv");
  };

  return (
    <StepCardLayout instructions={"Finally, review the data and submit!"}>
      <Grid>
        {serverResponse.message == "" ? (
          <Container>
            Ready to submit {props.validObjects.length}.
            <Button
              onClick={() => {
                void submitData();
              }}
              color={"success"}
              disabled={sendingData}
            >
              Submit Data
            </Button>
            {sendingData ? <CircularProgress /> : null}
          </Container>
        ) : (
          <Container>
            Server responded with: {serverResponse.message}.
          </Container>
        )}
        {serverResponse.message != "" ? (
          <Container sx={{ mt: 2 }}>
            <Button onClick={downloadData}>Download Saved Data</Button>
          </Container>
        ) : null}
        <Stack spacing={2}>
          {serverErrors.map((error) => {
            return (
              <Alert severity={"error"} key={error}>
                {error}
              </Alert>
            );
          })}
        </Stack>
        <Container sx={{ mt: 2 }}>
          {serverResponse.message != "" ? (
            serverErrors.length == 0 ? (
              <Button color={"success"} onClick={props.handleSuccess}>
                Complete
              </Button>
            ) : (
              <Button color={"error"} onClick={props.handleFailure}>
                Go Back
              </Button>
            )
          ) : null}
        </Container>
      </Grid>
    </StepCardLayout>
  );
};

export default ReviewDataStep;
