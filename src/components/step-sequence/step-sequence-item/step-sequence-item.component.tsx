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
  extends React.LiHTMLAttributes<HTMLLIElement>,
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
  const { currentStep, orientation, size } = useStepSequenceContext();

  let status: "complete" | "current" | "incomplete" = "incomplete";

  if (stepNumber < currentStep) {
    status = "complete";
  } else if (stepNumber === currentStep) {
    status = "current";
  }

  return (
    <StyledStepSequenceItem
      orientation={orientation}
      aria-current={status === "current" ? "step" : undefined}
      key={`step-seq-item-${stepNumber}`}
      size={size}
      {...tagComponent("step-sequence-item", props)}
      {...props}
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
          {status !== "current" && (
            <StyledStepSequenceItemStepVH>
              &nbsp;({status})
            </StyledStepSequenceItemStepVH>
          )}
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
