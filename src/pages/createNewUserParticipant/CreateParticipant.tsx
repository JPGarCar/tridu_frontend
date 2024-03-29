import {
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import CreateUserStep from "./CreateUserStep.tsx";
import { useState } from "react";
import SelectRaceStep from "./SelectRaceStep.tsx";
import CreateParticipantStep from "./CreateParticipantStep.tsx";
import { useNavigate } from "react-router-dom";
import StepCardLayout from "./StepCardLayout.tsx";

const steps = ["Create User", "Select Race", "Add Participant Details"];

const CreateParticipant = () => {
  const navigator = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [newUserData, setNewUserData] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [raceIdSelected, setRaceIdSelected] = useState<number | null>(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUserCreation = (userId: number, userName: string) => {
    setNewUserData({ id: userId, name: userName });
    handleNext();
  };

  const handleRaceSelect = (raceId: number) => {
    setRaceIdSelected(raceId);
    handleNext();
  };

  const handelParticipantCreation = () => {
    handleNext();
  };

  const handleFinish = () => {
    navigator(`/participants/${newUserData?.id}`);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Container sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            {activeStep >= steps.length ? (
              <StepCardLayout
                instructions={"All done! The participant has been created!"}
              >
                <Button type={"button"} onClick={handleFinish}>
                  Go to Participant
                </Button>
              </StepCardLayout>
            ) : activeStep == 0 ? (
              <CreateUserStep handelSuccess={handleUserCreation} />
            ) : activeStep == 1 ? (
              <SelectRaceStep handleSuccess={handleRaceSelect} />
            ) : raceIdSelected && newUserData ? (
              <CreateParticipantStep
                raceId={raceIdSelected}
                userId={newUserData.id}
                handleBack={handleBack}
                handleSuccess={handelParticipantCreation}
                userName={newUserData.name}
              />
            ) : (
              <>Error...</>
            )}
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default CreateParticipant;
