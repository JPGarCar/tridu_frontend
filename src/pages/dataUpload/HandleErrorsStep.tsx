import StepCardLayout from "../createNewUserParticipant/StepCardLayout.tsx";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ValidationError } from "yup";

const HandleErrorsStep = (props: {
  parseErrors: unknown[];
  parseData: object[];
  schema: Yup.Schema;
  handleSuccess: (arg0: object[]) => void;
  handleFailure: () => void;
}) => {
  const [isValidatingData, setIsValidatingData] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validObjects, setValidObjects] = useState<object[]>([]);

  const validateData = async () => {
    setIsValidatingData(true);

    const errors: string[] = [];
    const validObjects: object[] = [];
    let index = 2; // 2 because excel starts at 1 and the first row is the headers

    for (const data of props.parseData) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const validation: object = await props.schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });
        validObjects.push(validation);
      } catch (e) {
        if (e instanceof ValidationError) {
          for (const errorMessage of e.errors) {
            errors.push(`Row ${index}: ${errorMessage}`);
          }
        }
      }
      index = index + 1;
    }
    setIsValidatingData(false);
    setValidObjects(validObjects);
    setValidationErrors(errors);
  };

  useEffect(() => {
    void validateData();
  }, []);

  const totalErrorCount = validationErrors.length + props.parseErrors.length;

  return (
    <StepCardLayout
      instructions={"Next, check any possible errors found in your data."}
    >
      <Grid>
        <Container>
          {isValidatingData ? (
            <>
              Validating data... <CircularProgress />
            </>
          ) : (
            <>{props.parseData.length} rows validated!</>
          )}
        </Container>
        <Container>
          <Container sx={{ my: 2 }}>
            {totalErrorCount > 0 ? (
              <Typography>
                Errors found in the data, please fix first and try again.
              </Typography>
            ) : (
              <Alert>No errors found!</Alert>
            )}
          </Container>
          <Stack spacing={2} direction={"row"} useFlexGap flexWrap={"wrap"}>
            {props.parseErrors.map((error, index) => {
              if (error) {
                return (
                  <Alert severity={"error"} key={`${index}-parse-error`}>
                    {
                      // TODO Fix!
                      // eslint-disable-next-line @typescript-eslint/no-base-to-string
                      error.toString()
                    }
                  </Alert>
                );
              }
            })}
            {validationErrors.map((error, index) => {
              return (
                <Alert severity={"error"} key={`${index}-validation-error`}>
                  {error}
                </Alert>
              );
            })}
          </Stack>
        </Container>
        <Container sx={{ mt: 2 }}>
          {totalErrorCount > 0 ? (
            <Button
              color={"info"}
              onClick={() => {
                props.handleFailure();
              }}
            >
              Go Back
            </Button>
          ) : (
            <Button
              color={"success"}
              onClick={() => {
                props.handleSuccess(validObjects);
              }}
            >
              Proceed
            </Button>
          )}
        </Container>
      </Grid>
    </StepCardLayout>
  );
};

export default HandleErrorsStep;
