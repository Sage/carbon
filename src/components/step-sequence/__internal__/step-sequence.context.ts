import createStrictContext from "../../../__internal__/utils/createStrictContext";

interface StepSequenceContextType {
  orientation: "horizontal" | "vertical";
}

const [StepSequenceProvider, useStepSequenceContext] =
  createStrictContext<StepSequenceContextType>({
    name: "StepSequenceContext",
    errorMessage:
      "Carbon StepSequence: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      orientation: "horizontal",
    },
  });

export { StepSequenceProvider, useStepSequenceContext };
