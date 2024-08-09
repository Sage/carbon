import React from "react";

export type StepFlowContextType = {
  validatedCurrentStep?: number;
  totalSteps?: number;
  titleVariant?: "h1" | "h2";
  category?: string;
  titleRef?: React.RefObject<HTMLDivElement>;
};

const StepFlowContext = React.createContext<StepFlowContextType>({});

export default StepFlowContext;
