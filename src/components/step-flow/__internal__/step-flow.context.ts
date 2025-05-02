import createStrictContext from "../../../__internal__/utils/createStrictContext";

export type StepFlowContextType = {
  validatedCurrentStep?: number;
  totalSteps?: number;
  titleVariant?: "h1" | "h2";
  category?: string;
  titleRef?: React.RefObject<HTMLDivElement>;
};

const [StepFlowProvider, useStepFlowContext] =
  createStrictContext<StepFlowContextType>({
    name: "StepFlowContext",
    errorMessage:
      "Carbon StepFlow: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {},
  });

export { StepFlowProvider, useStepFlowContext };
