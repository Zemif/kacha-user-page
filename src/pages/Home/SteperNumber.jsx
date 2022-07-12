import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  `Relish the special moments
  We'll make the payments instalntly so you dont
  have to adjust your schedules or miss the special moments`,
  `Enter your unique reference code
 Enter the unique reference code issued by the
 and we will confirm if it's really yours`,
  `Send the service type and biller
  Select the service type and one of over 300 service
  providers you want to pay`,
];

{
  /* <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */
}

const SteperNumber = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default SteperNumber;
