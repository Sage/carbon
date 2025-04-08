import React from "react";
import {
  StyledStepSequenceItem,
  StyledStepSequenceItemContent,
  StyledStepSequenceItemIndicator,
  StyledStepSequenceItemHiddenLabel,
} from "./step-sequence-item.style";
import Icon from "../../icon";
import { useStepSequenceContext } from "../__internal__/step-sequence.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface StepSequenceItemProps extends TagProps {
  /** Aria label */
  ariaLabel?: string;
  /** Hidden label to be displayed if item is complete */
  hiddenCompleteLabel?: string;
  /** Hidden label to be displayed if item is current */
  hiddenCurrentLabel?: string;
  /** Value to be displayed before text for incomplete steps */
  indicator: string;
  /** Flag to hide the indicator for incomplete steps */
  hideIndicator?: boolean;
  /** Status for the step */
  status?: "complete" | "current" | "incomplete";
  /** Content to be displayed */
  children: React.ReactNode;
}

export const StepSequenceItem = ({
  hideIndicator = false,
  indicator,
  status = "incomplete",
  hiddenCompleteLabel,
  hiddenCurrentLabel,
  children,
  ariaLabel,
  ...rest
}: StepSequenceItemProps) => {
  const { orientation } = useStepSequenceContext();

  const indicatorText = () => {
    return !hideIndicator ? (
      <StyledStepSequenceItemIndicator>
        {indicator}
      </StyledStepSequenceItemIndicator>
    ) : null;
  };

  const icon = () =>
    status === "complete" ? <Icon type="tick" /> : indicatorText();

  const hiddenLabel = () => {
    if (hiddenCompleteLabel && status === "complete") {
      return (
        <StyledStepSequenceItemHiddenLabel>
          {hiddenCompleteLabel}
        </StyledStepSequenceItemHiddenLabel>
      );
    }
    if (hiddenCurrentLabel && status === "current") {
      return (
        <StyledStepSequenceItemHiddenLabel>
          {hiddenCurrentLabel}
        </StyledStepSequenceItemHiddenLabel>
      );
    }
    return null;
  };

  return (
    <StyledStepSequenceItem
      orientation={orientation}
      status={status}
      key={`step-seq-item-${indicator}`}
      aria-label={ariaLabel}
      {...rest}
      {...tagComponent("step-sequence-item", rest)}
    >
      {hiddenLabel()}
      <StyledStepSequenceItemContent>
        {icon()}
        <span>{children}</span>
      </StyledStepSequenceItemContent>
    </StyledStepSequenceItem>
  );
};

export default StepSequenceItem;
