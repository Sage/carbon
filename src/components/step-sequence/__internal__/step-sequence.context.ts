import createStrictContext from "../../../__internal__/utils/createStrictContext";

export interface StepSequenceContextType {
  currentStep: number;
  hiddenCompleteLabel: string;
  hiddenCurrentLabel: string;
  hiddenIncompleteLabel: string;
  orientation: "horizontal" | "vertical";
  size: "small" | "medium";
}

const [StepSequenceProvider, useStepSequenceContext] =
  createStrictContext<StepSequenceContextType>({
    name: "StepSequenceContext",
    errorMessage:
      "Carbon StepSequence: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      currentStep: 1,
      hiddenCompleteLabel: "Complete",
      hiddenCurrentLabel: "Current",
      hiddenIncompleteLabel: "Incomplete",
      orientation: "vertical",
      size: "medium",
    },
  });

export { StepSequenceProvider, useStepSequenceContext };
