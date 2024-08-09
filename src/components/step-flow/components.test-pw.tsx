import React, { useRef } from "react";
import Button from "../button";
import Box from "../box";
import { StepFlow, StepFlowProps, StepFlowHandle, StepFlowTitle } from ".";

export const StepFlowComponent = (props: Partial<StepFlowProps>) => (
  <StepFlow title="foo" currentStep={1} totalSteps={8} {...props} />
);

export const StepFlowComponentWithStepFlowTitleNode = () => {
  const titleNode = (
    <>
      <>
        <StepFlowTitle titleString="Step title" />
      </>
    </>
  );

  return <StepFlow title={titleNode} currentStep={1} totalSteps={8} />;
};

export const StepFlowComponentWithRefAndButtons = (
  props: Partial<StepFlowProps>,
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

export const StepFlowComponentWithRefAndButtonsAndStepFlowTitleNode = (
  props: Partial<StepFlowProps>,
) => {
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const focusOnTitle = () => {
    stepFlowHandle.current?.focus();
  };

  const titleNode = (
    <>
      <>
        <StepFlowTitle titleString="Step title" />
      </>
    </>
  );

  return (
    <Box>
      <StepFlow
        title={titleNode}
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
