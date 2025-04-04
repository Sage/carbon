import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { Shapes } from "./preview.component";

const StyledPreview = styled.div`
  ${margin}
`;

interface StyledPreviewPlaceholderProps {
  height?: string;
  width?: string;
  shape: Shapes;
  disableAnimation?: boolean;
  isLastLine: boolean;
}

const shimmer = keyframes`
  0% { 
    opacity: 0.1;
  }
  70% { 
    opacity: 1;
  }
  100% { 
    opacity: 0.1;
  }
`;

function getBorderRadius(shape: Shapes) {
  switch (shape) {
    case "rectangle-round":
      return "var(--borderRadius400)";
    case "circle":
      return "var(--borderRadiusCircle)";
    default:
      return "var(--borderRadius100)";
  }
}

function getHeight(shape: Shapes) {
  if (shape.includes("rectangle")) {
    return "var(--sizing400)";
  }

  switch (shape) {
    case "circle":
      return "var(--sizing700)";
    default:
      return "var(--sizing175)";
  }
}

function getWidth(shape: Shapes) {
  if (shape.includes("rectangle")) {
    return "var(--sizing1500)";
  }

  return "100%";
}

const StyledPreviewPlaceholder = styled.span<StyledPreviewPlaceholderProps>`
  ${({ shape, disableAnimation, isLastLine, height, width }) => {
    return css`
      display: block;
      background: linear-gradient(
        135deg,
        var(--colorsUtilityMajor100),
        var(--colorsUtilityMajor040)
      );
      border-radius: ${getBorderRadius(shape)};
      height: ${height || getHeight(shape)};
      width: ${width || getWidth(shape)};
      animation: ${shimmer} 2s ease infinite;

      ${isLastLine &&
      shape === "text" &&
      css`
        width: calc(${width || getWidth(shape)}*0.8);
      `}

      ${shape === "circle" &&
      css`
        width: ${height || getHeight(shape)};
      `}

      ${disableAnimation &&
      css`
        animation: none;
      `}

      & + & {
        margin-top: 6px;
      }
    `;
  }}
`;

StyledPreview.defaultProps = {
  theme: baseTheme,
};

export { StyledPreview, StyledPreviewPlaceholder };
