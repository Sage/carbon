import styled, { css, keyframes } from "styled-components";

export interface StyledLoaderSquareProps {
  /** Size of the loader. */
  size?: "small" | "medium" | "large";
  /** Applies white color. */
  isInsideButton?: boolean;
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive?: boolean;
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

const getDimentions = (size: StyledLoaderSquareProps["size"]) => {
  let width;
  let marginRight;
  let borderRadius;

  switch (size) {
    case "medium":
      width = "16px";
      marginRight = "8px";
      borderRadius = "6px";
      break;
    case "large":
      width = "20px";
      marginRight = "8px";
      borderRadius = "12px";
      break;
    default:
      width = "12px";
      marginRight = "6px";
      borderRadius = "12px";
  }

  return css`
    width: ${width};
    height: ${width};
    margin-right: ${marginRight};
    border-radius: ${borderRadius};
  `;
};

const StyledLoaderSquare = styled.div<StyledLoaderSquareProps>`
  ${({ size, isInsideButton, isActive }) => css`
    animation: ${loaderAnimation} 1s infinite ease-in-out both;
    background-color: var(--colorsActionMajor500);
    display: inline-block;
    ${getDimentions(size)}

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
  size: "small",
  isInsideButton: false,
  isActive: true,
};

export default StyledLoaderSquare;
