import PropTypes from "prop-types";
import React from "react";
import styledSystemPropTypes from "@styled-system/prop-types";

import StepSequenceStyle from "./step-sequence.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const StepSequence = (props) => {
  return (
    <StepSequenceStyle data-component="step-sequence" {...props}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(
          child,
          {
            ...child.props,
            orientation: props.orientation,
          },
          child.props.children
        )
      )}
    </StepSequenceStyle>
  );
};

StepSequence.propTypes = {
  ...marginPropTypes,
  /** Step sequence items to be rendered */
  children: PropTypes.node,
  /** The direction that step sequence items should be rendered */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

StepSequence.defaultProps = {
  orientation: "horizontal",
};

export default StepSequence;
