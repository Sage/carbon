import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import StyledTileFooter from "./tile-footer.style";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

const TileFooter = ({ variant, children, ...props }) => {
  return (
    <StyledTileFooter data-component="tile-footer" variant={variant} {...props}>
      {children}
    </StyledTileFooter>
  );
};

TileFooter.propTypes = {
  ...paddingPropTypes,
  /** set which background color variant should be used */
  variant: PropTypes.oneOf(["default", "transparent"]),
  children: PropTypes.node,
};

export default TileFooter;
