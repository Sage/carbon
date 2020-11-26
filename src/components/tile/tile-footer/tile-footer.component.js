import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import StyledTileFooter from "./tile-footer.style";

const TileFooter = ({ variant, children, ...props }) => {
  return (
    <StyledTileFooter variant={variant} {...props}>
      {children}
    </StyledTileFooter>
  );
};

TileFooter.propTypes = {
  ...propTypes.space,
  /** set which background color variant should be used */
  variant: PropTypes.oneOf(["default", "transparent"]),
  children: PropTypes.node,
};

export default TileFooter;
