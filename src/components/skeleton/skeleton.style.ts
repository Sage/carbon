import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import type { SkeletonShape } from "./skeleton.component";

const StyledSkeleton = styled.div.attrs(applyBaseTheme)`
  ${margin}
`;

interface StyledSkeletonPlaceholderProps {
  height?: string;
  width?: string;
  shape: SkeletonShape;
  disableAnimation?: boolean;
  isLastLine?: boolean;
  borderRadius?: string;
  legacyAnimation?: boolean;
}

const shimmer = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`;

const pulse = keyframes`
  0% { opacity: 0.1; }
  70% { opacity: 1; }
  100% { opacity: 0.1; }
`;

const presetHeights: Record<string, string> = {
  h1: "38px",
  h2: "30px",
  h3: "26px",
  h4: "23px",
  paragraph: "21px",
  button: "40px",
};

function getBorderRadius(shape: SkeletonShape) {
  switch (shape) {
    case "rectangle-curved":
      return "var(--global-radius-container-l)";
    case "circle":
      return "var(--global-radius-container-circle)";
    default:
      return "var(--global-radius-container-xs)";
  }
}

function getHeight(shape: SkeletonShape) {
  return shape === "circle" ? "40px" : "21px";
}

function getWidth() {
  return "100%";
}

const StyledSkeletonPlaceholder = styled.span<StyledSkeletonPlaceholderProps>`
  ${({
    shape,
    disableAnimation,
    height,
    width,
    isLastLine,
    borderRadius,
    legacyAnimation,
  }) => {
    const resolvedHeight = height
      ? presetHeights[height] || height
      : getHeight(shape);
    const resolvedWidth = width || (shape === "circle" ? "40px" : getWidth());

    return css`
      display: block;
      background-color: var(--mode-color-generic-bg-delicate);
      background-image: linear-gradient(
        90deg,
        var(--mode-color-generic-bg-delicate) 0%,
        var(--mode-color-generic-bg-soft) 50%,
        var(--mode-color-generic-bg-delicate) 100%
      );
      background-size: 200% 100%;
      border-radius: ${borderRadius || getBorderRadius(shape)};
      height: ${resolvedHeight};
      width: ${resolvedWidth};
      animation: ${shimmer} 1.5s linear infinite;

      ${shape === "circle" &&
      css`
        width: ${resolvedHeight};
      `}

      ${isLastLine &&
      css`
        width: calc(${resolvedWidth} * 0.8);
      `}

      ${legacyAnimation &&
      css`
        background-image: linear-gradient(
          135deg,
          var(--mode-color-generic-bg-soft),
          var(--mode-color-generic-bg-delicate)
        );
        background-size: auto;
        animation: ${pulse} 2s ease infinite;
      `}

      ${disableAnimation &&
      css`
        animation: none;
        ${!legacyAnimation && "background-image: none;"}
      `}

      & + & {
        margin-top: 6px;
      }
    `;
  }}
`;

export { StyledSkeleton, StyledSkeletonPlaceholder };
