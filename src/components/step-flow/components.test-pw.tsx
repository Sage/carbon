import React, { useRef } from "react";
import Button from "../button";
import Box from "../box";
import { StepFlow, StepFlowProps, StepFlowHandle } from ".";

export const StepFlowComponent = (props: Partial<StepFlowProps>) => (
  <StepFlow title="foo" currentStep={1} totalSteps={8} {...props} />
);

export const StepFlowComponentWithRefAndButtons = (
  props: Partial<StepFlowProps>
) => {
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const focusOnTitle = () => {
    stepFlowHandle.current?.focus();
  };

  return (
    <Box>
      <StepFlow
        title="foo"
        currentStep={1}
        totalSteps={8}
        ref={stepFlowHandle}
        {...props}
      />
      <Button buttonType="tertiary" onClick={() => focusOnTitle()} mr={2}>
        Back
      </Button>
      <Button buttonType="primary" onClick={() => focusOnTitle()}>
        Continue
      </Button>
    </Box>
  );
};
