import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { SkeletonShape } from "./preview.component";

const StyledPreview = styled.div.attrs(applyBaseTheme)`
  ${margin}
`;

interface StyledPreviewPlaceholderProps {
  height?: string;
  width?: string;
  shape: SkeletonShape;
  disableAnimation?: boolean;
}

const shimmer = keyframes`
  from { background-position: -100% 0; }
  to { background-position: 100% 0; }
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
    case "rectangle-round":
      return "var(--borderRadiusCircle)";
    case "circle":
      return "var(--borderRadiusCircle)";
    default:
      return "var(--borderRadius100)";
  }
}

function getHeight(shape: SkeletonShape) {
  switch (shape) {
    case "circle":
      return "40px";
    default:
      return "21px";
  }
}

function getWidth() {
  return "100%";
}

const StyledPreviewPlaceholder = styled.span<StyledPreviewPlaceholderProps>`
  ${({ shape, disableAnimation, height, width }) => {
    return css`
      display: block;
      background-color: var(--colorsUtilityMajor040);
      background-image: linear-gradient(
        90deg,
        var(--colorsUtilityMajor040) 0%,
        var(--colorsUtilityMajor100) 50%,
        var(--colorsUtilityMajor040) 100%
      );
      background-size: 200% 100%;
      border-radius: ${getBorderRadius(shape)};
      height: ${height ? presetHeights[height] || height : getHeight(shape)};
      width: ${width || (shape === "circle" ? "40px" : getWidth())};
      animation: ${shimmer} 1.5s linear infinite;

      ${shape === "circle" &&
      css`
        width: ${height ? presetHeights[height] || height : getHeight(shape)};
      `}

      ${disableAnimation &&
      css`
        animation: none;
        background-image: none;
      `}

      & + & {
        margin-top: 6px;
      }
    `;
  }}
`;

export { StyledPreview, StyledPreviewPlaceholder };
