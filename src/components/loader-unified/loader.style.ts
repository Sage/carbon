import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";
import { LoaderSizes } from "./loader.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import Typography from "../typography";

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
    left: -128px;
  }
  100% {
    left: 100%;
  }
`;

const gradientAnimation = keyframes`
  0% {
    stroke: #00d639;
  }
  33% {
    stroke: #11afff;
  }
  66% {
    stroke: #8f49fe;
  }
`;

const trackedAnimation = keyframes`
  from {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
  to {
    stroke-dasharray: 100;
    stroke-dashoffset: 20;
  }
`;

const untrackedAnimation = keyframes`
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
`;

const spinnerDimensions: Record<LoaderSizes, number> = {
  "extra-small": 20,
  small: 32,
  medium: 56,
  large: 80,
  "extra-large": 104,
};

const spinnerStrokeWidths: Record<LoaderSizes, number> = {
  "extra-small": 4,
  small: 4,
  medium: 3.3,
  large: 3.7,
  "extra-large": 3.7,
};

const labelMargins: Record<LoaderSizes, number> = {
  "extra-small": 0,
  small: 12,
  medium: 16,
  large: 22,
  "extra-large": 26,
};

const dotSizes: Record<LoaderSizes, string> = {
  "extra-small": "12px",
  small: "12px",
  medium: "16px",
  large: "20px",
  "extra-large": "20px",
};

const dotMargins: Record<LoaderSizes, string> = {
  "extra-small": "6px",
  small: "6px",
  medium: "8px",
  large: "8px",
  "extra-large": "8px",
};

const barHeights: Record<LoaderSizes, string> = {
  "extra-small": "8px",
  small: "4px",
  medium: "8px",
  large: "16px",
  "extra-large": "16px",
};

const centeredFlexText = css`
  display: flex;
  justify-content: center;
  text-align: center;
`;

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

export const StyledLoaderPlaceholder = styled.div`
  display: inline-block;
  min-width: var(--sizing800);
`;

export const StyledLoader = styled.div.attrs(applyBaseTheme)`
  ${margin}
  text-align: center;
  white-space: nowrap;
`;

export const StyledLoaderDot = styled.div.attrs(applyBaseTheme)<{
  size: LoaderSizes;
  backgroundColor: string;
}>`
  ${({ size, backgroundColor }) => css`
    animation: ${loaderAnimation} 1s infinite ease-in-out both;
    background-color: ${backgroundColor};
    display: inline-block;
    width: ${dotSizes[size]};
    height: ${dotSizes[size]};
    margin-right: ${dotMargins[size]};
    border-radius: var(--borderRadiusCircle);

    &:nth-of-type(1) {
      animation-delay: 0s;
    }
    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.4s;
      margin-right: 0;
    }
  `}
`;

export const OuterBar = styled.div<{ size: LoaderSizes }>`
  ${({ size }) => css`
    border-radius: var(--borderRadius400);
    height: ${barHeights[size]};
    width: 100%;
    background-color: var(--colorsActionMajor150);
    overflow: hidden;
    position: relative;
  `}
`;

export const InnerBar = styled.div<{ size: LoaderSizes }>`
  ${({ size }) => css`
    position: absolute;
    background-color: var(--colorsActionMajor500);
    width: 128px;
    height: ${barHeights[size]};
    animation: 2s ${innerBarAnimation} linear infinite;
  `}
`;

interface SpinnerSvgProps {
  size: LoaderSizes;
  variant?: string;
  hasMotion?: boolean;
  isTracked?: boolean;
  isGradientVariant?: boolean;
  animationTime?: number;
}

export const StyledSpinnerCircleSvg = styled.svg<SpinnerSvgProps>`
  ${({
    size,
    variant,
    hasMotion,
    isTracked,
    isGradientVariant,
    animationTime,
  }) => {
    const dimension = `${spinnerDimensions[size]}px`;
    const strokeWidth = spinnerStrokeWidths[size];

    const outerStroke = calculateColors(false, variant);
    const innerStroke = calculateColors(true, variant);

    const showGradient =
      variant === "gradient-grey" || variant === "gradient-white";

    return css`
      height: ${dimension};
      min-height: ${dimension};

      circle[data-role="outer-arc"] {
        fill: transparent;
        stroke-width: ${strokeWidth}px;
        stroke: ${outerStroke};
        ${variant === "inverse" && "stroke-opacity: 0.3;"}
        cx: 12px;
        cy: 12px;
        r: 10px;
      }

      circle[data-role="inner-arc"] {
        fill: transparent;
        stroke-width: ${strokeWidth}px;
        stroke: ${innerStroke};
        stroke-linecap: round;
        stroke-dasharray: 100px;
        stroke-dashoffset: 80px;
        transform-origin: 12px 12px 0px;
        cx: 12px;
        cy: 12px;
        r: 10px;
        transform: rotate(270deg);

        animation-name: ${isTracked && !isGradientVariant
            ? trackedAnimation
            : untrackedAnimation},
          ${showGradient ? gradientAnimation : "none"};

        ${hasMotion && `animation-duration: ${animationTime}s;`}
        animation-timing-function: cubic-bezier(0.2, 0.1, 0.8, 1);
        animation-iteration-count: ${hasMotion ? "infinite" : "none"};
      }
    `;
  }}
`;

export const StyledSpinnerLabel = styled(Typography)<{ size: LoaderSizes }>`
  ${({ size }) => css`
    ${centeredFlexText}
    ${size === "extra-small"
      ? "margin-left: var(--spacing100);"
      : `margin-top: ${labelMargins[size]}px;`}
  `}
`;

export const StyledStars = styled.div`
  width: 40px;
  height: 40px;
`;
