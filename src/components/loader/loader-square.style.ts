import styled, { css, keyframes } from "styled-components";
import baseTheme from "../../style/themes/base";

export interface StyledLoaderSquareProps {
  /** Size of the loader. */
  size?: "small" | "medium" | "large";
  /** Applies white color. */
  isInsideButton?: boolean;
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive?: boolean;
  /** The background color of each loader square */
  backgroundColor?: string;
}

const loaderAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const getDimensions = (size: StyledLoaderSquareProps["size"]) => {
  let width;
  let marginRight;

  switch (size) {
    case "medium":
      width = "16px";
      marginRight = "8px";
      break;
    case "large":
      width = "20px";
      marginRight = "8px";
      break;
    default:
      width = "12px";
      marginRight = "6px";
  }

  return css`
    width: ${width};
    height: ${width};
    margin-right: ${marginRight};
  `;
};

export const StyledLoaderPlaceholder = styled.div`
  display: inline-block;
  min-width: var(--sizing800);
`;

const StyledLoaderSquare = styled.div<StyledLoaderSquareProps>`
  ${({ size, isInsideButton, isActive, backgroundColor }) => css`
    animation: ${loaderAnimation} 1s infinite ease-in-out both;
    background-color: ${backgroundColor};
    display: inline-block;
    ${getDimensions(size)}
    border-radius: var(--borderRadiusCircle);
    ${isInsideButton &&
    css`
      background-color: ${isActive
        ? "var(--colorsUtilityYang100)"
        : "var(--colorsSemanticNeutral500)"};
    `}
    &:nth-of-type(1) {
      animation-delay: 0s;
    }
    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.4s;
      margin-right: 0px;
    }
  `}
`;

StyledLoaderSquare.defaultProps = {
  isInsideButton: false,
  isActive: true,
  theme: baseTheme,
};

export default StyledLoaderSquare;
