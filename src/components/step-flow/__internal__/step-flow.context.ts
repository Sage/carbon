import createStrictContext from "../../../__internal__/utils/createStrictContext";

export type StepFlowContextType = {
  validatedCurrentStep?: number;
  totalSteps?: number;
  titleVariant?: "h1" | "h2";
  category?: string;
  titleRef?: Readonly<React.RefObject<HTMLDivElement | null>>;
};

const [StepFlowProvider, useStepFlowContext] =
  createStrictContext<StepFlowContextType>({
    name: "StepFlowContext",
    errorMessage:
      "Carbon StepFlow: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {},
  });

export { StepFlowProvider, useStepFlowContext };
