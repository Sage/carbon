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

const Loader = ({
  "aria-label": ariaLabel,
  isInsideButton,
  isActive,
  size,
  ...rest
}) => {
  return (
    <StyledLoader
      aria-label={ariaLabel}
      role="progressbar"
      {...tagComponent("loader", rest)}
      {...rest}
    >
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
  "aria-label": "loader",
};

Loader.propTypes = {
  ...marginPropTypes,
  /** Specify an aria-label for the Loader component */
  "aria-label": PropTypes.string,
  /** Size of the loader. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Applies white color. */
  isInsideButton: PropTypes.bool,
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive: PropTypes.bool,
};

export default Loader;
