import styled, { css, keyframes } from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

export interface StyledLoaderBarProps {
  /** Size of the LoaderBar. */
  size?: "small" | "medium" | "large";
}

function getHeight(size: StyledLoaderBarProps["size"]) {
  switch (size) {
    case "small":
      return "4px";
    case "large":
      return "16px";
    default:
      return "8px";
  }
}

const INNER_BAR_LENGTH = "128px";

const StyledLoader = styled.div.attrs(applyBaseTheme)<
  StyledLoaderBarProps & MarginProps
>`
  ${margin}
  text-align: center;
`;

const innerBarAnimation = keyframes`
  0% {
    left: -${INNER_BAR_LENGTH};
  }
  100% {
    left: 100%;
  }
`;

const StyledLoaderBar = styled.div<StyledLoaderBarProps>`
  ${({ size }) => css`
    border-radius: var(--borderRadius400);
    height: ${getHeight(size)};
    width: 100%;
    background-color: var(--colorsActionMajor150);
    overflow: hidden;
    position: relative;
  `}
`;

const InnerBar = styled.div<StyledLoaderBarProps>`
  ${({ size }) => css`
    position: absolute;
    background-color: var(--colorsActionMajor500);
    width: ${INNER_BAR_LENGTH};
    height: ${getHeight(size)};
    animation: 2s ${innerBarAnimation} linear 0s infinite normal none running;
  `}
`;

export { InnerBar, StyledLoader };
export default StyledLoaderBar;
