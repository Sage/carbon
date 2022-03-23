import React, { useContext } from "react";
import PropTypes from "prop-types";
import StepSequenceItemStyle from "./step-sequence-item.style";
import StepSequenceItemContentStyle from "./step-sequence-item-content.style";
import StepSequenceItemIndicatorStyle from "./step-sequence-item-indicator.style";
import StepSequenceItemHiddenLabelStyle from "./step-sequence-item-hidden-label.style";
import Icon from "../../icon";
import { StepSequenceContext } from "../step-sequence.component";

const StepSequenceItem = (props) => {
  const { orientation } = useContext(StepSequenceContext);

  const indicatorText = () => {
    return !props.hideIndicator ? (
      <StepSequenceItemIndicatorStyle>
        {props.indicator}
      </StepSequenceItemIndicatorStyle>
    ) : null;
  };

  const icon = () =>
    props.status === "complete" ? <Icon type="tick" /> : indicatorText();

  const hiddenLabel = () => {
    const { status, hiddenCompleteLabel, hiddenCurrentLabel } = props;

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
      {...props}
      orientation={orientation}
      key={`step-seq-item-${props.indicator}`}
    >
      {hiddenLabel()}
      <StepSequenceItemContentStyle>
        {icon()}
        <span>{props.children}</span>
      </StepSequenceItemContentStyle>
    </StepSequenceItemStyle>
  );
};

StepSequenceItem.propTypes = {
  /** Text content for the step item */
  children: PropTypes.node.isRequired,
  /** Value to be displayed before text for uncompleted steps */
  indicator: PropTypes.string.isRequired,
  /** Flag to hide the indicator for uncompleted steps */
  hideIndicator: PropTypes.bool,
  /** Aria label */
  ariaLabel: PropTypes.string,
  /** Status for the step */
  status: PropTypes.oneOf(["complete", "current", "incomplete"]),
  /** Hidden label to be displayed if item is complete */
  hiddenCompleteLabel: PropTypes.string,
  /** Hidden label to be displayed if item is current */
  hiddenCurrentLabel: PropTypes.string,
};

StepSequenceItem.defaultProps = {
  status: "incomplete",
  hideIndicator: false,
};

export default StepSequenceItem;
