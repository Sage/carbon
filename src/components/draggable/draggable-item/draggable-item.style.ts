/* istanbul ignore file: Test with Playwright for better reliability */

import styled, { css } from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";
import { type Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import applyBaseTheme from "../../../style/themes/apply-base-theme";

const StyledDraggableContainer = styled.div.attrs(applyBaseTheme)`
  ${margin}
`;

interface StyledDraggableItemProps {
  isDragging?: boolean;
  isDraggingAndLeftSelf?: boolean;
  shadowStyling?: {
    closestEdge: Edge;
    height: number;
  };
}

const StyledDraggableItem = styled.div<StyledDraggableItemProps>`
  opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};

  ${({ isDraggingAndLeftSelf }) =>
    isDraggingAndLeftSelf &&
    css`
      // Don't render the item once it's been dragged away from its initial position.
      // Its space will be taken by a shadow of one of the adjacent items instead.
      display: none;
    `}

  // Shadow used to indicate space a dragged item will occupy when dropped.
  ${({ shadowStyling }) =>
    shadowStyling &&
    shadowStyling.closestEdge === "top" &&
    css`
      &::before {
        content: "";
        display: block;
        height: ${shadowStyling.height}px;
      }
    `}

  ${({ shadowStyling }) =>
    shadowStyling &&
    shadowStyling.closestEdge === "bottom" &&
    css`
      &::after {
        content: "";
        display: block;
        height: ${shadowStyling.height}px;
      }
    `}
`;

interface StyledItemContentProps extends PaddingProps {
  flexDirection?: "row" | "row-reverse";
}

const StyledItemContent = styled.div.attrs(
  applyBaseTheme,
)<StyledItemContentProps>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  cursor: grab;
  justify-content: space-between;
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export { StyledDraggableContainer, StyledDraggableItem, StyledItemContent };
