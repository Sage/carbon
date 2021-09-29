import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledLoaderBar, { InnerBar, StyledLoader } from "./loader-bar.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const LoaderBar = ({ size = "medium", ...rest }) => {
  return (
    <StyledLoader {...rest} {...tagComponent("loader-bar", rest)}>
      <StyledLoaderBar size={size}>
        <InnerBar size={size} />
      </StyledLoaderBar>
    </StyledLoader>
  );
};

LoaderBar.propTypes = {
  ...marginPropTypes,
  /** Size of the loader. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default LoaderBar;
