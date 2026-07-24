import React, { useRef } from "react";
import {
  StyledStepSequenceItem,
  StyledIndicator,
  StyledIndicatorWrapper,
  StepLine,
  StyledTitle,
  StyledDescription,
  StyledTitleWrapper,
} from "./step-sequence-item.style";
import Icon from "../../icon";
import Typography from "../../typography";
import { useStepSequenceContext } from "../__internal__/step-sequence.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface StepSequenceItemProps extends TagProps {
  /**
   * Aria label for the step item.
   * @deprecated Please use native `aria-label` attribute instead.
   */
  ariaLabel?: string;
  /** Accessible label for the step item. */
  "aria-label"?: string;
  /** Hidden accessible label to be rendered if item is complete. */
  hiddenCompleteLabel?: string;
  /** Hidden accessible label to be rendered if item is current. */
  hiddenCurrentLabel?: string;
  /** Indicator for the step. */
  indicator: string;
  /**
   * Flag to hide the indicator for incomplete steps.
   * @deprecated Indicators will always be shown on incomplete steps.
   */
  hideIndicator?: boolean;
  /** Status for the step item. */
  status?: "complete" | "current" | "incomplete";
  /**
   * Content to render as the item's title.
   * @deprecated Please use the `title` prop instead.
   */
  children?: React.ReactNode;
  // TODO: when children support is removed, make title required
  /** Title for the step item */
  title?: string;
  /** Description for the step item, rendered below the title. */
  description?: string;
}

export const StepSequenceItem = ({
  hideIndicator: _hideIndicator,
  indicator,
  status = "incomplete",
  hiddenCompleteLabel,
  hiddenCurrentLabel,
  children,
  ariaLabel: deprecatedArialLabel,
  "aria-label": ariaLabel,
  title,
  description,
  ...rest
}: StepSequenceItemProps) => {
  const ref = useRef(null);
  const { orientation, size } = useStepSequenceContext();

  const iconSize = size === "small" ? "medium" : "large";

  const hiddenLabel = () => {
    if (hiddenCompleteLabel && status === "complete") {
      return <Typography screenReaderOnly>{hiddenCompleteLabel}</Typography>;
    }
    if (hiddenCurrentLabel && status === "current") {
      return <Typography screenReaderOnly>{hiddenCurrentLabel}</Typography>;
    }
    return null;
  };

  return (
    <StyledStepSequenceItem
      $orientation={orientation}
      $size={size}
      aria-label={ariaLabel || deprecatedArialLabel}
      ref={ref}
      {...rest}
      {...tagComponent("step-sequence-item", rest)}
      className="step-sequence-item"
    >
      {hiddenLabel()}
      <StyledIndicatorWrapper $orientation={orientation}>
        {orientation === "horizontal" && (
          <StepLine
            className="line-before"
            $orientation={orientation}
            $isGreen={status !== "incomplete"}
            $roundedSide="right"
          />
        )}

        <StyledIndicator
          className="step-indicator"
          $size={size}
          $status={status}
        >
          {status === "complete" ? (
            <Icon type="tick_circle" size={iconSize} />
          ) : (
            indicator
          )}
        </StyledIndicator>

        <StepLine
          className="line-after"
          $orientation={orientation}
          $isGreen={status === "complete"}
          $size={size}
          $roundedSide="left"
        />
      </StyledIndicatorWrapper>

      <StyledTitleWrapper $size={size} $orientation={orientation}>
        <StyledTitle $size={size}>{title || children}</StyledTitle>
        {description && (
          <StyledDescription $size={size}>{description}</StyledDescription>
        )}
      </StyledTitleWrapper>
    </StyledStepSequenceItem>
  );
};

export default StepSequenceItem;
