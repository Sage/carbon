import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import Typography from "../typography";

const ringDimensions: Record<string, number> = {
  "extra-small": 20,
  small: 32,
  medium: 64,
  large: 80,
};

const ringStrokeWidths: Record<string, number> = {
  "extra-small": 2.7,
  small: 2.7,
  medium: 2.7,
  large: 2.7,
};

const barHeights: Record<string, string> = {
  small: "4px",
  medium: "8px",
  large: "16px",
};

const ringInlineLabelMargins: Record<string, string> = {
  "extra-small": "8px",
  small: "8px",
  medium: "12px",
  large: "16px",
};

const getBarStyles = (variant?: string, inverse?: boolean) => {
  const outerBarBackground = inverse
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(0, 0, 0, 0.08)";

  if (variant === "ai") {
    return {
      outerBarBackground,
      innerBarBackground: inverse
        ? "linear-gradient(90deg, var(--mode-color-ai-alt-stop-1, #00D639) 0%, var(--mode-color-ai-alt-stop-2, #00D6DE) 40%, var(--mode-color-ai-alt-stop-3, #9D60FF) 90%)"
        : "linear-gradient(90deg, var(--mode-color-ai-stop-1, #13A038) 0%, var(--mode-color-ai-stop-2, #149197) 40%, var(--mode-color-ai-stop-3, #A87CFB) 90%)",
    };
  }

  return {
    outerBarBackground,
    innerBarBackground: inverse ? "#FFFFFF" : "#000000",
  };
};

const centeredFlexText = css`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const StyledLoaderPlaceholder = styled.div`
  display: inline-block;
  min-width: var(--sizing800);
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
    border-radius: var(--borderRadius400);
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
    @keyframes innerBarAnimationOne {
      0% {
        left: 0%;
        animation-timing-function: linear;
      }
      30% {
        left: 10px;
        animation-timing-function: cubic-bezier(0.5, 0.6, 0.4, 1);
      }
      100% {
        left: calc(100% - 15px);
      }
    }

    @keyframes innerBarAnimationTwo {
      0% {
        width: 15px;
        animation-timing-function: cubic-bezier(0.7, 0, 0.8, 1);
      }
      50% {
        width: 35%;
      }
      100% {
        width: 15px;
      }
    }

    position: absolute;
    background: ${getBarStyles(variant, inverse).innerBarBackground};
    width: 15px;
    height: ${barHeights[size]};
    border-radius: var(--borderRadius400);
    animation-name: innerBarAnimationOne, innerBarAnimationTwo;
    ${hasMotion && `animation-duration: ${animationTime}s, ${animationTime}s;`}
    animation-iteration-count: ${hasMotion
      ? "infinite, infinite"
      : "none, none"};
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
  isInsideTypicalButton?: boolean;
  isInsideDestructiveButton?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  isInsidePrimaryButton?: boolean;
}

export const StyledRingCircleSvg = styled.svg<RingSvgProps>`
  ${({
    inverse,
    size,
    hasMotion,
    isTracked,
    animationTime,
    isInsideTypicalButton,
    isInsideDestructiveButton,
    isInsidePrimaryButton,
    isSuccess,
    isError,
  }) => {
    const getStrokeStyling = ({
      isInsideTypicalButton,
      isInsideDestructiveButton,
      isInsidePrimaryButton,
      inverse,
      isTracked,
      isSuccess,
      isError,
    }: {
      isInsideTypicalButton?: boolean;
      isInsideDestructiveButton?: boolean;
      isInsidePrimaryButton?: boolean;
      inverse?: boolean;
      isTracked?: boolean;
      isSuccess?: boolean;
      isError?: boolean;
    }) => {
      if (isInsideTypicalButton || isInsideDestructiveButton) {
        if (isInsidePrimaryButton) {
          if (inverse) {
            return {
              outerStroke: "rgba(0, 0, 0, 0.08)",
              innerStroke: "#000",
            };
          }

          return {
            outerStroke: "rgba(255, 255, 255, 0.08)",
            innerStroke: "#FFF",
          };
        }

        if (inverse) {
          return {
            outerStroke: "rgba(255, 255, 255, 0.08)",
            innerStroke: "#FFF",
          };
        }

        return {
          outerStroke: "rgba(0, 0, 0, 0.08)",
          innerStroke: "#000",
        };
      }

      if (inverse) {
        return {
          outerStroke: "rgba(255,255,255,0.08)",
          innerStroke: "#FFF",
        };
      }

      if (isTracked) {
        if (isSuccess) {
          return {
            outerStroke: "rgba(0, 0, 0, 0.08)",
            innerStroke: "#00811F",
          };
        }

        if (isError) {
          return {
            outerStroke: "rgba(0, 0, 0, 0.08)",
            innerStroke: "#DB004E",
          };
        }
      }

      return {
        outerStroke: "rgba(0,0,0,0.08)",
        innerStroke: "#000000",
      };
    };

    const dimension = `${ringDimensions[size]}px`;
    const strokeWidth = ringStrokeWidths[size];

    return css`
      height: ${dimension};
      min-height: ${dimension};

      circle[data-role="outer-arc"] {
        fill: transparent;
        stroke-width: ${strokeWidth}px;
        stroke: ${getStrokeStyling({
          isInsideTypicalButton,
          isInsideDestructiveButton,
          isInsidePrimaryButton,
          inverse,
          isTracked,
          isSuccess,
          isError,
        }).outerStroke};
        cx: 12px;
        cy: 12px;
        r: 10px;
      }

      circle[data-role="inner-arc"] {
        fill: transparent;
        stroke-width: ${strokeWidth}px;
        stroke: ${getStrokeStyling({
          isInsideTypicalButton,
          isInsideDestructiveButton,
          isInsidePrimaryButton,
          inverse,
          isTracked,
          isSuccess,
          isError,
        }).innerStroke};
        stroke-linecap: round;
        stroke-dasharray: 100px;
        stroke-dashoffset: 95px;
        transform-origin: 12px 12px 0px;
        cx: 12px;
        cy: 12px;
        r: 10px;
        transform: rotate(-90deg);

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
            transform: rotate(-90deg);
            stroke-dashoffset: 95;
          }

          50% {
            transform: rotate(90deg);
            stroke-dashoffset: 80;
          }

          100% {
            transform: rotate(270deg);
            stroke-dashoffset: 95;
          }
        }

        animation-name: ${isTracked
          ? "trackedAnimation"
          : "untrackedAnimation"};

        ${hasMotion && `animation-duration: ${animationTime}s;`}
        animation-timing-function: cubic-bezier(0, 0, 1, 1);
        animation-iteration-count: ${hasMotion ? "infinite" : "none"};
      }
    `;
  }}
`;

const STAR_CONTAINER_SIZE = "40px";

export const StyledStars = styled.div`
  position: relative;
  width: ${STAR_CONTAINER_SIZE};
  height: ${STAR_CONTAINER_SIZE};
`;

const LabelMargins: Record<string, Record<string, string>> = {
  standalone: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  ring: {
    "extra-small": "4px",
    small: "8px",
    medium: "8px",
    large: "12px",
  },
};

type LabelProps = {
  size?: string;
  loaderVariant?: string;
  inverse?: boolean;
  loaderType: string;
  isInsideTypicalButton?: boolean;
  isInsideDestructiveButton?: boolean;
  isInsidePrimaryButton?: boolean;
};

const getLabelColor = ({
  loaderType,
  inverse,
  isInsideTypicalButton,
  isInsideDestructiveButton,
  isInsidePrimaryButton,
}: {
  loaderType?: string;
  inverse?: boolean;
  isInsideButton?: boolean;
  isInsideTypicalButton?: boolean;
  isInsideDestructiveButton?: boolean;
  isInsidePrimaryButton?: boolean;
}) => {
  if (loaderType === "standalone") {
    if (inverse) {
      return "rgba(255, 255, 255, 0.55)";
    }

    return "rgba(0, 0, 0, 0.65)";
  }

  if (loaderType === "ring") {
    if (isInsideTypicalButton) {
      if (isInsidePrimaryButton) {
        if (inverse) {
          return "#000";
        }

        return "#FFF";
      }

      if (inverse) {
        return "rgba(255, 255, 255, 0.90)";
      }

      return "rgba(0, 0, 0, 0.90)";
    }

    if (isInsideDestructiveButton) {
      if (isInsidePrimaryButton) {
        return "#FFF";
      }

      // return "#DB004E";
      return "rgba(0, 0, 0, 0.90)";
    }

    if (inverse) {
      return "rgba(255, 255, 255, 0.55)";
    }

    return "rgba(0, 0, 0, 0.65)";
  }

  // star
  return "rgba(0, 0, 0, 0.65)";
};

const getLabelStyles = ({
  size = "medium",
  inverse,
  loaderType,
  loaderVariant,
  isInsideTypicalButton,
  isInsideDestructiveButton,
  isInsidePrimaryButton,
}: LabelProps) => {
  if (loaderType === "star") {
    return css`
      font-size: 16px;
      font-weight: 400;
      color: ${getLabelColor({
        loaderType,
        inverse,
        isInsideTypicalButton,
        isInsideDestructiveButton,
        isInsidePrimaryButton,
      })};
      margin-left: 12px;
      width: min-content;
    `;
  }

  if (loaderType === "standalone") {
    return css`
      font-size: ${size === "large" ? "16px" : "14px"};
      font-weight: 500;
      color: ${getLabelColor({
        loaderType,
        inverse,
        isInsideTypicalButton,
        isInsideDestructiveButton,
        isInsidePrimaryButton,
      })};
      width: 100%;
      margin-top: ${LabelMargins[loaderType][size]};
    `;
  }

  return css`
    font-size: ${size === "large"
      ? "16px"
      : size === "extra-small"
        ? "13px"
        : "14px"};
    font-weight: 500;
    color: ${getLabelColor({
      loaderType,
      inverse,
      isInsideTypicalButton,
      isInsideDestructiveButton,
      isInsidePrimaryButton,
    })};
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
  ${centeredFlexText}
  line-height: 150%;
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
