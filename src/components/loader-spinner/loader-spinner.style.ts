import styled, { css } from "styled-components";
import { margin } from "styled-system";
import { LoaderSpinnerProps } from "./loader-spinner.component";
import { LOADER_SPINNER_SIZE_PARAMS } from "./loader-spinner.config";
import Typography from "../typography";

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

export const StyledSpinnerWrapper = styled.div<
  Pick<LoaderSpinnerProps, "size">
>`
  ${margin}
  display: flex;
  flex-direction: ${({ size }) => (size === "extra-small" ? "row" : "column")};
`;

export const StyledLabel = styled(Typography)<
  Required<Pick<LoaderSpinnerProps, "size">>
>`
  ${({ size }) => css`
    display: flex;
    justify-content: center;
    text-align: center;
    ${size === "extra-small"
      ? "margin-left: var(--spacing100)"
      : `margin-top: ${LOADER_SPINNER_SIZE_PARAMS[size].labelMarginTop}px`};
  `}
`;

interface StyledSpinnerCircleSvgProps
  extends Omit<LoaderSpinnerProps, "showSpinnerLabel"> {
  isGradientVariant?: boolean;
  size: Required<LoaderSpinnerProps>["size"];
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
    const dimensions = `${LOADER_SPINNER_SIZE_PARAMS[size].wrapperDimensions}px`;

    return (
      size &&
      css`
        height: ${dimensions};
        min-height: ${dimensions};

        circle[data-role="outer-arc"] {
          fill: transparent;
          stroke-width: ${LOADER_SPINNER_SIZE_PARAMS[size].strokeWidth}px;
          stroke: ${calculateColors(false, variant)};
          ${variant === "inverse" && `stroke-opacity: 0.3;`}
          cx: 12px;
          cy: 12px;
          r: 10px;
        }

        circle[data-role="inner-arc"] {
          fill: transparent;
          stroke-width: ${LOADER_SPINNER_SIZE_PARAMS[size].strokeWidth}px;
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
