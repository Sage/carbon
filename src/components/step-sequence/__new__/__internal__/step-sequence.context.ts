import createStrictContext from "../../../../__internal__/utils/createStrictContext";

export interface StepSequenceContextType {
  currentStep: number;
  orientation: "horizontal" | "vertical";
}

const [StepSequenceProvider, useStepSequenceContext] =
  createStrictContext<StepSequenceContextType>({
    name: "StepSequenceContext",
    errorMessage:
      "Carbon StepSequence: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      currentStep: 1,
      orientation: "vertical",
    },
  });

export { StepSequenceProvider, useStepSequenceContext };
