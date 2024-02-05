import {Button, Card, CardContent, Container, Step, StepLabel, Stepper} from "@mui/material";
import {useState} from "react";
import StepCardLayout from "../createNewUserParticipant/StepCardLayout.tsx";
import SelectDataTypeStep from "./SelectDataTypeStep.tsx";
import * as Yup from "yup";
import UploadCSVFileStep from "./UploadCSVFileStep.tsx";
import Papa from "papaparse";
import HandleErrorsStep from "./HandleErrorsStep.tsx";
import ReviewDataStep from "./ReviewDataStep.tsx";

const steps = ["Choose Data Type", "Upload CSV File", "Handle Errors", "Review Data"]

const DataUpload = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [dataType, setDataType] = useState<{ name: string, schema: Yup.Schema } | null>(null);
    const [parseResult, setparseResult] = useState<Papa.ParseResult<object> | null>(null);
    const [validObjects, setValidObjects] = useState<object[]>([]);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }

    const handleReset = () => {
        setActiveStep(0);
        setDataType(null);
        setparseResult(null);
        setValidObjects([]);
    }

    const handleDataTypeSelected = (dataType: { name: string; schema: Yup.ObjectSchema<object> }) => {
        setDataType(dataType);
        handleNext();
    }

    const handleDataUploadSuccess = (parseResult: Papa.ParseResult<object>) => {
        setparseResult(parseResult);
        handleNext();
    }

    const handleNoErrors = (objects: object[]) => {
        setValidObjects(objects);
        handleNext();
    }

    const handleServerErrors = () => {
        setActiveStep((prevStep) => prevStep - 2);
    }

    return (
        <Container sx={{ py: 5 }}>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>

            <Container sx={{ mt: 8 }}>
                <Card>
                    <CardContent>
                        {
                            activeStep == 0
                                ? <SelectDataTypeStep handelSuccess={handleDataTypeSelected} />
                                : activeStep == 1
                                    //@ts-expect-error Two errors to expect, unsure how to fix
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                    ? (dataType != null ? <UploadCSVFileStep columnHeaders={Object.keys(dataType.schema.fields)} handleSuccess={handleDataUploadSuccess} /> : <>Error...</>)
                                    : activeStep == 2
                                        ? (parseResult != null && dataType != null
                                            ? <HandleErrorsStep schema={dataType.schema} parseErrors={parseResult.errors}
                                                                parseData={parseResult.data} handleFailure={handleBack}
                                                                handleSuccess={handleNoErrors} />
                                            : <>Error...</>
                                        )
                                        : activeStep == 3
                                            ? (dataType != null
                                                ? <ReviewDataStep dataTypeName={dataType.name} validObjects={validObjects} handleSuccess={handleNext} handleFailure={handleServerErrors} />
                                                : <>Error... </>
                                            )
                                            : <StepCardLayout instructions={"All done, feel free to go back to the dashboard!"}>
                                                <Container>
                                                    Need to do it again?
                                                    <Button onClick={handleReset}>Start Again</Button>
                                                </Container>
                                            </StepCardLayout>
                        }
                    </CardContent>
                </Card>
            </Container>

        </Container>
    );
}

export default DataUpload;