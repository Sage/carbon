import createContext from "../../../__internal__/utils/createContext";

export type StepFlowContextType = {
  validatedCurrentStep?: number;
  totalSteps?: number;
  titleVariant?: "h1" | "h2";
  category?: string;
  titleRef?: React.RefObject<HTMLDivElement>;
};

const [StepFlowProvider, useStepFlowContext] =
  createContext.strict<StepFlowContextType>({
    name: "StepFlowContext",
    errorMessage:
      "Carbon StepFlow: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {},
  });

export { StepFlowProvider, useStepFlowContext };
