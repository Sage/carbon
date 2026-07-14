import React from "react";
import { StepFlow, StepFlowProps } from ".";

export const StepFlowComponent = (props: Partial<StepFlowProps>) => (
  <StepFlow title="foo" currentStep={1} totalSteps={8} {...props} />
);

export default StepFlowComponent;
