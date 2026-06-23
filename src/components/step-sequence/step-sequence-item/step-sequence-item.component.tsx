import React from "react";
import { useStepSequenceContext } from "../__internal__/step-sequence.context";
import {
  StyledStepSequenceItem,
  StyledStepSequenceItemContent,
  StyledStepSequenceItemLine,
  StyledStepSequenceItemMarkerContainer,
  StyledStepSequenceItemStepDescription,
  StyledStepSequenceItemStepNumber,
  StyledStepSequenceItemStepTitle,
  StyledStepSequenceItemStepVH,
} from "./step-sequence-item.style";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface StepSequenceItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "children">,
    TagProps {
  /** A description of the step */
  description?: string;
  /** The position of this step in the sequence */
  stepNumber: number;
  /** The title of the step */
  title: string;
}

export const StepSequenceItem = ({
  description,
  stepNumber,
  title,
  ...props
}: StepSequenceItemProps) => {
  const {
    currentStep,
    hiddenCompleteLabel,
    hiddenCurrentLabel,
    hiddenIncompleteLabel,
    orientation,
    size,
  } = useStepSequenceContext();

  let status: "complete" | "current" | "incomplete" = "incomplete";
  let stepLabel = hiddenIncompleteLabel;

  if (stepNumber < currentStep) {
    status = "complete";
    stepLabel = hiddenCompleteLabel;
  } else if (stepNumber === currentStep) {
    status = "current";
    stepLabel = hiddenCurrentLabel;
  }

  return (
    <StyledStepSequenceItem
      orientation={orientation}
      aria-current={status === "current" ? "step" : undefined}
      key={`step-seq-item-${stepNumber}`}
      size={size}
      {...props}
      {...tagComponent("step-sequence-item", props)}
    >
      <StyledStepSequenceItemMarkerContainer orientation={orientation}>
        <StyledStepSequenceItemStepNumber
          aria-hidden="true"
          status={status}
          size={size}
        >
          {stepNumber}
        </StyledStepSequenceItemStepNumber>
        <StyledStepSequenceItemLine orientation={orientation} status={status} />
      </StyledStepSequenceItemMarkerContainer>

      <StyledStepSequenceItemContent orientation={orientation}>
        <StyledStepSequenceItemStepTitle size={size}>
          {title}
          <StyledStepSequenceItemStepVH>
            &nbsp;({stepLabel})
          </StyledStepSequenceItemStepVH>
        </StyledStepSequenceItemStepTitle>

        {description && (
          <StyledStepSequenceItemStepDescription size={size}>
            {description}
          </StyledStepSequenceItemStepDescription>
        )}
      </StyledStepSequenceItemContent>
    </StyledStepSequenceItem>
  );
};

export default StepSequenceItem;
