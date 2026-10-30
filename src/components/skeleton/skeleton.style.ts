import styled, { css, keyframes } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { Shapes } from "./skeleton.component";

const skeletonSlider = keyframes`
  0% {
    background-position:
      calc(
        var(--skeleton-background-start-x, 140%) -
          var(--skeleton-line-offset-x, 0px)
      )
      calc(
        var(--skeleton-background-y, 100%) -
          var(--skeleton-line-offset-y, 0px)
      );
  }
  50% {
    background-position:
      calc(
        var(--skeleton-background-end-x, -20%) -
          var(--skeleton-line-offset-x, 0px)
      )
      calc(
        var(--skeleton-background-y, 100%) -
          var(--skeleton-line-offset-y, 0px)
      );
  }
  100% {
    background-position:
      calc(
        var(--skeleton-background-end-x, -20%) -
          var(--skeleton-line-offset-x, 0px)
      )
      calc(
        var(--skeleton-background-y, 100%) -
          var(--skeleton-line-offset-y, 0px)
      );
  }
`;

interface StyledSkeletonLineProps {
  disableAnimation?: boolean;
  height?: string;
  width?: string;
  shape: Shapes;
}

function getBorderRadius(shape: Shapes) {
  switch (shape) {
    case "rectangle-curved":
      return "9999px";
    case "circle":
      return "var(--borderRadiusCircle)";
    case "rectangle-moderate":
    default:
      return "8px";
  }
}

const DEFAULT_HEIGHT = "21px";

const StyledSkeletonLine = styled.div<StyledSkeletonLineProps>`
  ${({ disableAnimation, shape, height, width }) => {
    const isFixedWidth = shape === "circle" || !!width;

    return css`
      display: block;
      border-radius: ${getBorderRadius(shape)};
      height: ${height || DEFAULT_HEIGHT};
      width: ${width || "100%"};
      background: linear-gradient(
        120deg,
        #ccd6db 35%,
        #668494 50%,
        #ccd6db 75%
      );
      background-size: var(--skeleton-background-width, 300%)
        var(--skeleton-background-height, 100%);
      background-position: calc(
          var(--skeleton-background-start-x, 140%) - var(
              --skeleton-line-offset-x,
              0px
            )
        )
        calc(
          var(--skeleton-background-y, 100%) - var(
              --skeleton-line-offset-y,
              0px
            )
        );
      animation: ${disableAnimation
        ? "none"
        : css`
            ${skeletonSlider} 4s ease-in-out infinite
          `};

      ${!isFixedWidth &&
      css`
        flex: 1;
      `}

      ${shape === "circle" &&
      css`
        width: ${height || DEFAULT_HEIGHT};
        flex-shrink: 0;
      `}
    `;
  }}
`;

const StyledSkeletonRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & + & {
    margin-top: 6px;
  }
`;

const StyledSkeleton = styled.div.attrs(applyBaseTheme)`
  ${margin}
`;

export { StyledSkeleton, StyledSkeletonLine, StyledSkeletonRow };
