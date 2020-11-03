import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import { StyledVerticalWrapper, StyledDivider } from "./vertical-divider.style";

const VerticalDivider = ({ h, displayInline = false, tint = 80, ...props }) => (
  <StyledVerticalWrapper
    data-component="vertical-divider"
    p={props.p || 3}
    height={h}
    displayInline={displayInline}
    {...props}
  >
    <StyledDivider tint={tint} />
  </StyledVerticalWrapper>
);

VerticalDivider.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Set a custom height for the component, if passing a number it will set the value in `px` */
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Set this flag if using component in a non-flex container */
  displayInline: PropTypes.bool,
  /** Set a custom tint (between 1 and 100) for the component,
   * the values determine the level of tint applied to the slate */
  tint: PropTypes.oneOf(Array.from({ length: 100 }, (_, i) => i + 1)),
};

export default VerticalDivider;
