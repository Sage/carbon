import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";

import { LoaderProps, LoaderSizes } from "./loader.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import Typography from "../typography";

const INNER_BAR_LENGTH = "128px";

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

const innerBarAnimation = keyframes`
  0% {
    left: -${INNER_BAR_LENGTH};
  }
  100% {
    left: 100%;
  }
`;

type LoaderSpinnerSizeParams = Record<
  LoaderSizes,
  {
    wrapperDimensions: number;
    strokeWidth: number;
    labelMarginTop?: number;
  }
>;

const spinnerSizeParams: LoaderSpinnerSizeParams = {
  "extra-small": { wrapperDimensions: 20, strokeWidth: 4 },
  small: { wrapperDimensions: 32, strokeWidth: 4, labelMarginTop: 12 },
  medium: { wrapperDimensions: 56, strokeWidth: 3.3, labelMarginTop: 16 },
  large: { wrapperDimensions: 80, strokeWidth: 3.7, labelMarginTop: 22 },
  "extra-large": {
    wrapperDimensions: 104,
    strokeWidth: 3.7,
    labelMarginTop: 26,
  },
};

const calculateColors = (isWheel: boolean, variant?: string) => {
  switch (variant) {
    case "neutral":
      return isWheel
        ? "var(--colorsSemanticNeutral500)"
        : "var(--colorsSemanticNeutral200)";
    case "gradient-grey":
      return isWheel ? "#00D639" : "#0000001A";
    case "gradient-white":
      return isWheel ? "#00D639" : "var(--colorsActionMajorYang100)";
    case "inverse":
      return "var(--colorsActionMajorYang100)";
    default:
      return isWheel
        ? "var(--colorsActionMajor500)"
        : "var(--colorsActionMajor150)";
  }
};

const getDimensions = (size: LoaderProps["size"]) => {
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

function getHeight(size: LoaderProps["size"]) {
  switch (size) {
    case "small":
      return "4px";
    case "large":
      return "16px";
    default:
      return "8px";
  }
}

export const StyledLoaderPlaceholder = styled.div`
  display: inline-block;
  min-width: var(--sizing800);
`;

export const StyledLoader = styled.div.attrs(applyBaseTheme)`
  ${margin}
  text-align: center;
  white-space: nowrap;
`;

type TypelessLoaderProps = Omit<LoaderProps, "loaderType">;

export const StyledLoaderDot = styled.div.attrs(applyBaseTheme)<
  TypelessLoaderProps & { backgroundColor: string }
>`
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

export const OuterBar = styled.div<TypelessLoaderProps>`
  ${({ size }) => css`
    border-radius: var(--borderRadius400);
    height: ${getDimensions(size)};
    width: 100%;
    background-color: var(--colorsActionMajor150);
    overflow: hidden;
    position: relative;
  `}
`;

export const InnerBar = styled.div<TypelessLoaderProps>`
  ${({ size }) => css`
    position: absolute;
    background-color: var(--colorsActionMajor500);
    width: ${INNER_BAR_LENGTH};
    height: ${getHeight(size)};
    animation: 2s ${innerBarAnimation} linear 0s infinite normal none running;
  `}
`;

export const SpinnerWrapper = styled.div<Pick<LoaderProps, "size">>`
  ${margin}
  display: flex;
  flex-direction: ${({ size }) => (size === "extra-small" ? "row" : "column")};
`;

export const StyledLabel = styled(Typography)<
  Required<Pick<LoaderProps, "size">>
>`
  ${({ size }) => css`
    display: flex;
    justify-content: center;
    text-align: center;
    ${size === "extra-small"
      ? "margin-left: var(--spacing100)"
      : `margin-top: ${spinnerSizeParams[size].labelMarginTop}px`};
  `}
`;

interface StyledSpinnerCircleSvgProps
  extends Omit<TypelessLoaderProps, "showSpinnerLabel"> {
  isGradientVariant?: boolean;
}

export const StyledSpinnerCircleSvg = styled.svg<StyledSpinnerCircleSvgProps>`
  ${({
    size,
    isTracked,
    hasMotion,
    isGradientVariant,
    animationTime,
    variant,
  }) => {
    const dimensions = `${spinnerSizeParams[size || "medium"].wrapperDimensions}px`;

    return (
      size &&
      css`
        height: ${dimensions};
        min-height: ${dimensions};

        circle[data-role="outer-arc"] {
          fill: transparent;
          stroke-width: ${spinnerSizeParams[size].strokeWidth}px;
          stroke: ${calculateColors(false, variant)};
          ${variant === "inverse" && `stroke-opacity: 0.3;`}
          cx: 12px;
          cy: 12px;
          r: 10px;
        }

        circle[data-role="inner-arc"] {
          fill: transparent;
          stroke-width: ${spinnerSizeParams[size].strokeWidth}px;
          stroke: ${calculateColors(true, variant)};
          stroke-linecap: round;
          stroke-dasharray: 100px;
          stroke-dashoffset: 80px;
          transform-origin: 12px 12px 0px;
          cx: 12px;
          cy: 12px;
          r: 10px;
          transform: rotate(270deg);

          @keyframes gradientAnimation {
            0% {
              stroke: #00d639;
            }

            33% {
              stroke: #11afff;
            }

            66% {
              stroke: #8f49fe;
            }
          }

          @keyframes trackedAnimation {
            from {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
            }

            to {
              stroke-dasharray: 100;
              stroke-dashoffset: 20;
            }
          }

          @keyframes untrackedAnimation {
            0% {
              transform: rotate(0deg);
              stroke-dasharray: 100;
            }

            40% {
              stroke-dasharray: 80;
            }

            80% {
              stroke-dasharray: 100;
            }

            100% {
              transform: rotate(360deg);
            }
          }

          animation-name: ${
            isTracked && !isGradientVariant
              ? "trackedAnimation"
              : "untrackedAnimation"
          },
            ${
              variant === "gradient-grey" ||
              (variant === "gradient-white" && "gradientAnimation")
                ? "gradientAnimation"
                : "none"
            };
          ${hasMotion && `animation-duration: ${animationTime}s`};
          animation-timing-function: cubic-bezier(0.2, 0.1, 0.8, 1);
          animation-iteration-count: ${hasMotion ? "infinite" : "none"};
        `
    );
  }};
`;

export const StyledStars = styled.div`
  width: 40px;
  height: 40px;
`;

export const StyledSpinnerLabel = styled(Typography)<TypelessLoaderProps>`
  ${({ size }) => css`
    display: flex;
    justify-content: center;
    text-align: center;
    ${size === "extra-small"
      ? "margin-left: var(--spacing100)"
      : `margin-top: ${spinnerSizeParams[size || "medium"].labelMarginTop}px`};
  `}
`;
