import React from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function TGPStep(props) {
  const steps = [
    'Getting Start',
    'Target Goal Plan',
    'In The Funnel',
    'Getting Action'
  ];

  return (
    <Stepper activeStep={props.step} style={{ margin: '50px' }}>
      {steps.map((text) => (
        <Step key={text}>
          <StepLabel>{text}</StepLabel>
        </Step>
      ))
      }
    </Stepper>
  );
}

export default TGPStep;
