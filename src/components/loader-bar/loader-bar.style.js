import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { LOADER_BAR_SIZES } from "./loader-bar.config";

const INNER_BAR_LENGTH = "128px";

const StyledLoader = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;
  line-height: 0;
  font-size: 0;
`;

const innerBarAnimation = keyframes`
  0% {
    left: -${INNER_BAR_LENGTH};
  }
  100% {
    left: 100%;
  }
`;

const StyledLoaderBar = styled.div`
  ${({ size }) => css`
    display: inline-block;
    height: ${getHeight(size)};
    width: 100%;
    background-color: var(--colorsActionMajor150);
    overflow: hidden;
    position: relative;
  `}
`;

const InnerBar = styled.div`
  ${({ size }) => css`
    position: absolute;
    background-color: var(--colorsActionMajor500);
    width: ${INNER_BAR_LENGTH};
    height: ${getHeight(size)};
    animation: 2s ${innerBarAnimation} linear 0s infinite normal none running;
  `}
`;

function getHeight(size) {
  switch (size) {
    case "small":
      return "4px";
    case "large":
      return "16px";
    default:
      return "8px";
  }
}

StyledLoader.defaultProps = {
  theme: baseTheme,
};

StyledLoaderBar.defaultProps = {
  size: "medium",
};

InnerBar.defaultProps = {
  size: "medium",
};

StyledLoaderBar.propTypes = {
  size: PropTypes.oneOf(LOADER_BAR_SIZES),
};

export { InnerBar, StyledLoader };
export default StyledLoaderBar;
