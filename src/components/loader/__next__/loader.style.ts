import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import Typography from "../../typography";
import StyledButton from "../../button/button.style";
import StyledNextButton from "../../button/__next__/button.style";

const ringDimensions: Record<string, number> = {
  "extra-small": 20,
  small: 32,
  medium: 64,
  large: 80,
};

const barBorderRadii: Record<string, string> = {
  small: "var(--global-radius-container-2-xs)",
  medium: "var(--global-radius-container-xs)",
  large: "var(--global-radius-container-m)",
};

const barHeights: Record<string, string> = {
  small: "var(--global-size-5-xs)",
  medium: "var(--global-size-4-xs)",
  large: "var(--global-size-3-xs)",
};

const ringInlineLabelMargins: Record<string, string> = {
  "extra-small": "var(--global-space-comp-s)",
  small: "var(--global-space-comp-s)",
  medium: "var(--global-space-comp-m)",
  large: "var(--global-space-comp-l)",
};

const innerBarAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
`;

const rotateRing = keyframes`
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const trackedAnimation = keyframes`
  0% {
    stroke-dasharray: 1 1;
    stroke-dashoffset: 1;
  }
  100% {
    stroke-dasharray: 1 1;
    stroke-dashoffset: 0.2;
  }
`;

const trimRing = keyframes`
  0% {
    animation-timing-function: cubic-bezier(0.32, 0, 0.85, 1);
    stroke-dasharray: 0.1 1;
    stroke-dashoffset: -0.9;
  }
  61.686% {
    animation-timing-function: cubic-bezier(0.502, 0, 0.463, 0.996);
    stroke-dasharray: 0.35 1;
    stroke-dashoffset: -0.65;
  }
  100% {
    stroke-dasharray: 0.1 1;
    stroke-dashoffset: -0.9;
  }
`;

const getBarStyles = (variant?: string, inverse?: boolean) => {
  const outerBarBackground = inverse
    ? "var(--progress-loader-inverse-bg-default)"
    : "var(--progress-loader-bg-default)";

  if (variant === "ai") {
    return {
      outerBarBackground,
      innerBarBackground:
        "linear-gradient(90deg, var(--mode-color-ai-alt-stop-1) 0%, var(--mode-color-ai-alt-stop-2) 40%, var(--mode-color-ai-alt-stop-3) 90%)",
    };
  }

  return {
    outerBarBackground,
    innerBarBackground: inverse
      ? "var(--progress-loader-inverse-fg-default)"
      : "var(--progress-loader-fg-default)",
  };
};

const centredFlexText = css`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const StyledLoaderPlaceholder = styled.div`
  display: inline-block;
  min-width: var(--global-size-2-xl);
`;

export const StyledLoader = styled.div.attrs(applyBaseTheme)`
  ${margin}
  text-align: center;
  white-space: nowrap;
`;

export const OuterBar = styled.div<{
  size: string;
  variant: string;
  inverse: boolean;
}>`
  ${({ size, variant, inverse }) => css`
    border-radius: ${barBorderRadii[size]};
    height: ${barHeights[size]};
    width: 100%;
    background: ${getBarStyles(variant, inverse).outerBarBackground};
    overflow: hidden;
    position: relative;
  `}
`;

export const InnerBar = styled.div<{
  size: string;
  variant: string;
  inverse: boolean;
  animationTime?: number;
  hasMotion?: boolean;
}>`
  ${({ size, variant, inverse, animationTime, hasMotion }) => css`
    background: ${getBarStyles(variant, inverse).innerBarBackground};
    border-radius: ${barBorderRadii[size]};
    height: ${barHeights[size]};
    width: 50%;
    transform: translateX(${hasMotion ? "-100%" : "50%"});
    ${hasMotion
      ? css`
          animation: ${innerBarAnimation} ${animationTime}s
            cubic-bezier(0.66, 0, 0.34, 1) infinite;
        `
      : "animation: none;"}
  `}
`;

interface RingSvgProps {
  inverse?: boolean;
  size: string;
  variant?: string;
  hasMotion?: boolean;
  isTracked?: boolean;
  isGradientVariant?: boolean;
  animationTime?: number;
  isSuccess?: boolean;
  isError?: boolean;
}

interface RingArcProps extends RingSvgProps {
  gradientId?: string;
}

const getStrokeColor = ({
  inverse,
  isSuccess,
  isError,
}: {
  inverse?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}) => {
  if (isError) return "var(--progress-loader-fg-error)";
  if (isSuccess) return "var(--progress-loader-fg-complete)";
  if (inverse) return "var(--progress-loader-inverse-fg-default)";
  return "var(--progress-loader-fg-default)";
};

export const StyledRingCircleSvg = styled.svg<RingSvgProps>`
  ${({ size }) => {
    const dimension = `${ringDimensions[size]}px`;

    return css`
      height: ${dimension};
      min-height: ${dimension};
      width: ${dimension};
      overflow: visible;

      circle[data-role="outer-arc"] {
        fill: transparent;
        stroke-width: 8px;
        cx: 32px;
        cy: 32px;
        r: 28px;
      }
    `;
  }}
`;

export const StyledRingTrack = styled.circle<RingSvgProps>`
  stroke: ${({ inverse }) =>
    inverse
      ? "var(--progress-loader-inverse-bg-default)"
      : "var(--progress-loader-bg-default)"};
`;

export const StyledRingRotator = styled.g<RingSvgProps>`
  transform: rotate(-90deg);
  transform-origin: 32px 32px;
  ${({ hasMotion, isTracked, animationTime }) =>
    hasMotion &&
    !isTracked &&
    css`
      animation: ${rotateRing} ${animationTime}s linear infinite;
    `}
`;

export const StyledRingArc = styled.circle<RingArcProps>`
  fill: transparent;
  stroke: ${({ gradientId, inverse, isSuccess, isError }) =>
    gradientId
      ? `url(#${gradientId})`
      : getStrokeColor({ inverse, isSuccess, isError })};
  stroke-width: 8px;
  stroke-linecap: round;
  cx: 32px;
  cy: 32px;
  r: 28px;
  stroke-dasharray: 0.1 1;
  stroke-dashoffset: -0.9;

  ${({ hasMotion, isTracked, animationTime }) =>
    hasMotion &&
    css`
      animation: ${isTracked ? trackedAnimation : trimRing} ${animationTime}s
        linear infinite;
    `}

  ${StyledNextButton} &, ${StyledButton} & {
    ${({ isGradientVariant }) => !isGradientVariant && "stroke: currentColor;"}
  }
`;

const STAR_CONTAINER_SIZE = "var(--global-size-s)";

export const StyledStars = styled.div`
  position: relative;
  width: ${STAR_CONTAINER_SIZE};
  height: ${STAR_CONTAINER_SIZE};
`;

const LabelMargins: Record<string, Record<string, string>> = {
  standalone: {
    small: "var(--global-space-comp-xs)",
    medium: "var(--global-space-comp-s)",
    large: "var(--global-space-comp-m)",
  },
  ring: {
    "extra-small": "var(--global-space-comp-xs)",
    small: "var(--global-space-comp-s)",
    medium: "var(--global-space-comp-s)",
    large: "var(--global-space-comp-m)",
  },
};

type LabelProps = {
  $size?: string;
  loaderVariant?: string;
  inverse?: boolean;
  loaderType: string;
  $isInsideButton?: boolean;
};

const getLabelStyles = ({
  $size = "medium",
  loaderType,
  loaderVariant,
  $isInsideButton,
}: LabelProps) => {
  const size = $size;
  if (loaderType === "star") {
    return css`
      font-size: 16px;
      font-weight: 400;
      margin-left: 12px;
      width: min-content;
    `;
  }

  if (loaderType === "standalone") {
    return css`
      font: ${size === "large"
        ? "var(--global-font-static-comp-medium-l)"
        : size === "small"
          ? "var(--global-font-static-comp-medium-s)"
          : "var(--global-font-static-comp-medium-m)"};
      width: 100%;
      margin-top: ${LabelMargins[loaderType][size]};
    `;
  }

  return css`
    font: ${$isInsideButton
      ? "var(--global-font-static-comp-medium-s)"
      : size === "large"
        ? "var(--global-font-static-comp-medium-l)"
        : size === "extra-small"
          ? "var(--global-font-static-comp-medium-xs)"
          : size === "small"
            ? "var(--global-font-static-comp-medium-s)"
            : "var(--global-font-static-comp-medium-m)"};
    width: ${loaderVariant === "inline" ? "auto" : "100%"};
    ${loaderVariant === "inline"
      ? `margin-left: ${ringInlineLabelMargins[size]}`
      : `margin-top: ${LabelMargins[loaderType][size]}`};
  `;
};

export const StyledStarLoaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLoaderLabel = styled(Typography)<LabelProps>`
  ${centredFlexText}
  line-height: 150%;
  color: ${({ inverse }) =>
    inverse
      ? "var(--progress-inverse-label-alt)"
      : "var(--progress-label-alt)"};

  ${StyledNextButton} &, ${StyledButton} & {
    color: currentColor;
  }

  ${getLabelStyles}
`;

type RingLoaderWrapperProps = {
  loaderVariant?: string;
};

export const StyledRingLoaderWrapper = styled.div<RingLoaderWrapperProps>`
  ${({ loaderVariant }) => css`
    display: flex;
    flex-direction: ${loaderVariant === "inline" ? "row" : "column"};
    align-items: center;
    justify-content: center;
    width: ${loaderVariant === "inline" ? "auto" : "100%"};
  `}
`;

type StyledLabelProps = {
  inverse?: boolean;
};

export const StyledLabel = styled.span<StyledLabelProps>`
  ${({ inverse }) => css`
    color: ${inverse
      ? "var(--progress-inverse-label-alt)"
      : "var(--progress-label-alt)"};

    ${StyledNextButton} &, ${StyledButton} & {
      color: currentColor;
    }
  `};
`;
