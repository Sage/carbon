import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledLoader from "./loader.style";
import StyledLoaderSquare from "./loader-square.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Loader = ({ isInsideButton, isActive, size, ...rest }) => {
  return (
    <StyledLoader {...rest} {...tagComponent("loader", rest)}>
      <StyledLoaderSquare
        isInsideButton={isInsideButton}
        isActive={isActive}
        size={size}
      />
      <StyledLoaderSquare
        isInsideButton={isInsideButton}
        isActive={isActive}
        size={size}
      />
      <StyledLoaderSquare
        isInsideButton={isInsideButton}
        isActive={isActive}
        size={size}
      />
    </StyledLoader>
  );
};

Loader.defaultProps = {
  size: "medium",
  isInsideButton: false,
  isActive: true,
};

Loader.propTypes = {
  ...marginPropTypes,
  /** Size of the loader. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Applies white color. */
  isInsideButton: PropTypes.bool,
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive: PropTypes.bool,
};

export default Loader;
