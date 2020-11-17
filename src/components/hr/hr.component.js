import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import StyledHr from "./hr.style";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

const Hr = ({ adaptiveMxBreakpoint, ml, mr, ...props }) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveMxBreakpoint);
  let marginLeft = ml;
  let marginRight = mr;
  if (adaptiveMxBreakpoint && !largeScreen) {
    marginLeft = 0;
    marginRight = 0;
  }

  return (
    <StyledHr
      data-component="hr"
      ml={marginLeft}
      mr={marginRight}
      mt={props.mt || 3}
      mb={props.mb || 3}
      {...props}
    />
  );
};

Hr.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set */
  adaptiveMxBreakpoint: PropTypes.number,
};

export default Hr;
