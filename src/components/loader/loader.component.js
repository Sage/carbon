import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../utils/helpers/tags";
import OptionsHelper from "../../utils/helpers/options-helper";
import StyledLoader from "./loader.style";
import StyledLoaderSquare from "./loader-square.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Loader = (props) => {
  const marginProps = filterStyledSystemMarginProps(props);
  return (
    <StyledLoader
      {...props}
      {...tagComponent("loader", props)}
      {...marginProps}
    >
      <StyledLoaderSquare {...props} />
      <StyledLoaderSquare {...props} />
      <StyledLoaderSquare {...props} />
    </StyledLoader>
  );
};

Loader.defaultProps = {
  size: "small",
  isInsideButton: false,
  isActive: true,
};

Loader.propTypes = {
  ...marginPropTypes,
  /** Size of the loader. */
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  /** Applies white color. */
  isInsideButton: PropTypes.bool,
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive: PropTypes.bool,
};

export default Loader;
