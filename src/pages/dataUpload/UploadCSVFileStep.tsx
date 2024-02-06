import StepCardLayout from "../createNewUserParticipant/StepCardLayout.tsx";
import Papa from "papaparse";
import {
  Alert,
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material";
import { ChangeEvent, useState } from "react";

const UploadCSVFileStep = (props: {
  columnHeaders: string[];
  handleSuccess: (arg0: Papa.ParseResult<object>) => void;
}) => {
  const [isParsingData, setIsParsingData] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parseInformation, setParseInformation] = useState<{
    warnings: string[];
    errors: string[];
    isCheckingHeaders: boolean;
    headersChecked: boolean;
  }>({
    warnings: [],
    errors: [],
    isCheckingHeaders: false,
    headersChecked: false,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;

    if (file != null) {
      setFile(file);
      setParseInformation({
        warnings: [],
        errors: [],
        isCheckingHeaders: true,
        headersChecked: false,
      });
      checkHeaders();
    }
  };

  const checkHeaders = () => {
    if (file) {
      // check headers first
      Papa.parse<string[]>(file, {
        header: false,
        preview: 1,
        complete: (results) => {
          const errors = [];
          const warnings = [];

          if (results.data.length == 0) {
            errors.push("Empty CSV file was provided try again!");
          }

          props.columnHeaders.forEach((columnName) => {
            if (!results.data[0].includes(columnName)) {
              errors.push(`Missing header: ${columnName}`);
            }
          });

          const extraHeaders =
            results.data[0].length - props.columnHeaders.length;

          if (extraHeaders > 0) {
            warnings.push(`${extraHeaders} extra headers found.`);
          }

          setParseInformation({
            errors: errors,
            warnings: warnings,
            isCheckingHeaders: false,
            headersChecked: true,
          });
        },
      });
    }
  };

  const handleFullParsing = () => {
    if (file) {
      setIsParsingData(true);
      parseData();
    }
  };

  const parseData = () => {
    if (file) {
      Papa.parse<object>(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          props.handleSuccess(results);
        },
      });
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <StepCardLayout
      instructions={`Now upload the CSV file. The first row should only contain the column headers. Each row should be a single entry. 
            The system expects the following column headers: ${props.columnHeaders.join(", ")}.`}
    >
      <Grid>
        <Button component={"label"}>
          Upload File
          <VisuallyHiddenInput
            type={"file"}
            accept={".csv"}
            onChange={handleFileChange}
          />
        </Button>
        {file == null ? null : <Container>{file.name} uploaded.</Container>}
        {parseInformation.isCheckingHeaders ? (
          <Grid>
            Checking Headers
            <LinearProgress />
          </Grid>
        ) : null}
        <Stack spacing={2}>
          {parseInformation.errors.map((error) => {
            return (
              <Alert severity={"error"} key={error}>
                {error}
              </Alert>
            );
          })}
          {parseInformation.warnings.map((warning) => {
            return (
              <Alert severity={"warning"} key={warning}>
                {warning}
              </Alert>
            );
          })}
        </Stack>
        {parseInformation.headersChecked ? (
          parseInformation.errors.length > 0 ? (
            <Typography>
              Unable to proceed until all errors are fixed!
            </Typography>
          ) : (
            <Container>
              Headers look good.{" "}
              <Button
                color={"success"}
                disabled={isParsingData}
                onClick={handleFullParsing}
              >
                Proceed
              </Button>
            </Container>
          )
        ) : null}
        {isParsingData ? <LinearProgress /> : null}
      </Grid>
    </StepCardLayout>
  );
};

export default UploadCSVFileStep;
