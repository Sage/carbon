import React, { useContext } from "react";
import {
  StepSequenceItemStyle,
  StepSequenceItemContentStyle,
  StepSequenceItemIndicatorStyle,
  StepSequenceItemHiddenLabelStyle,
} from "./step-sequence-item.style";
import Icon from "../../icon";
import { StepSequenceContext } from "../step-sequence.component";

export interface StepSequenceItemProps {
  /** Aria label */
  ariaLabel?: string;
  /** Hidden label to be displayed if item is complete */
  hiddenCompleteLabel?: string;
  /** Hidden label to be displayed if item is current */
  hiddenCurrentLabel?: string;
  /** Value to be displayed before text for uncomplete steps */
  indicator: string;
  /** Flag to hide the indicator for uncomplete steps */
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
  const { orientation } = useContext(StepSequenceContext);

  const indicatorText = () => {
    return !hideIndicator ? (
      <StepSequenceItemIndicatorStyle>
        {indicator}
      </StepSequenceItemIndicatorStyle>
    ) : null;
  };

  const icon = () =>
    status === "complete" ? <Icon type="tick" /> : indicatorText();

  const hiddenLabel = () => {
    if (hiddenCompleteLabel && status === "complete") {
      return (
        <StepSequenceItemHiddenLabelStyle>
          {hiddenCompleteLabel}
        </StepSequenceItemHiddenLabelStyle>
      );
    }
    if (hiddenCurrentLabel && status === "current") {
      return (
        <StepSequenceItemHiddenLabelStyle>
          {hiddenCurrentLabel}
        </StepSequenceItemHiddenLabelStyle>
      );
    }
    return null;
  };

  return (
    <StepSequenceItemStyle
      data-component="step-sequence-item"
      orientation={orientation}
      status={status}
      key={`step-seq-item-${indicator}`}
      aria-label={ariaLabel}
      {...rest}
    >
      {hiddenLabel()}
      <StepSequenceItemContentStyle>
        {icon()}
        <span>{children}</span>
      </StepSequenceItemContentStyle>
    </StepSequenceItemStyle>
  );
};

export default StepSequenceItem;
