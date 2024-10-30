import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import OwnerInfoForm from "./OwnerInfoForm";
import RestaurantInfoForm from "./RestaurantInfoForm";
import Confirmation from "./Confirmation";
import { Typography } from "@mui/material";

const steps = [
  "Información del propietario",
  "Información del restaurante",
  "Confirmación",
];

const StyledStepper = styled(Stepper)`
  position: absolute;
  top: 125px;
  left: 3%;
  width: 60%;
  font-family: "Belleza", sans-serif;
`;

const RegistrationStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <OwnerInfoForm handleNext={handleNext} handleData={handleData} />
        );
      case 1:
        return (
          <RestaurantInfoForm
            handleNext={handleNext}
            handleBack={handleBack}
            handleData={handleData}
          />
        );
      case 2:
        return <Confirmation formData={formData} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Box marginTop={0} marginBottom={0} padding={0}>
      <div>
        <Box>
          <StyledStepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography style={{ fontFamily: "'Belleza', sans-serif" }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </StyledStepper>
        </Box>
        {getStepContent(activeStep)}
      </div>
    </Box>
  );
};

export default RegistrationStepper;
