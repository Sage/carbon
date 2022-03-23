import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import StepSequenceStyle from "./step-sequence.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

export const StepSequenceContext = React.createContext({});

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const StepSequence = (props) => {
  return (
    <StepSequenceStyle data-component="step-sequence" {...props}>
      <StepSequenceContext.Provider value={{ orientation: props.orientation }}>
        {props.children}
      </StepSequenceContext.Provider>
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
