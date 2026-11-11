/* istanbul ignore file: Test with Playwright for better reliability */

import styled, { css } from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import { DragGhost } from "../__internal__/drag-surface";
import { DropIndicator } from "../__internal__/drop-indicator";
import applyBaseTheme from "../../../style/themes/apply-base-theme";

interface StyledDraggableContainerProps {
  $isLinked?: boolean;
  $width?: string;
  $height?: string;
  $minWidth?: string;
  $maxWidth?: string;
  $minHeight?: string;
  $maxHeight?: string;
}
const StyledDraggableContainer = styled.div.attrs(
  applyBaseTheme,
)<StyledDraggableContainerProps>`
  box-sizing: border-box;
  /* Keep a drop area beyond the final item, including in a single-column list. */
  padding-bottom: 16px;
  ${margin}
  ${padding}
  ${({ $isLinked }) =>
    $isLinked &&
    css`
      min-height: var(--global-size-m);
    `}

  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
  ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
`;

interface StyledDraggableItemProps {
  $dragGhost?: DragGhost | null;
  $dropIndicator?: DropIndicator | null;
}

const StyledDraggableItem = styled.div<StyledDraggableItemProps>`
  position: relative;

  ${({ $dropIndicator }) =>
    $dropIndicator &&
    css`
      &::before {
        content: "";
        position: absolute;
        z-index: 10;
        top: ${$dropIndicator.top}px;
        left: ${$dropIndicator.left}px;
        width: ${$dropIndicator.width}px;
        height: ${$dropIndicator.height}px;
        background-color: var(--container-action-target-bg-default);
        pointer-events: none;
      }
    `}

  ${({ $dragGhost }) =>
    $dragGhost &&
    css`
      z-index: 2;

      * {
        visibility: hidden;
      }

      &::before {
        display: none;
      }

      &::after {
        content: "";
        position: absolute;
        top: ${$dragGhost.top}px;
        left: ${$dragGhost.left}px;
        width: ${$dragGhost.width}px;
        height: ${$dragGhost.height}px;
        border-top-left-radius: ${$dragGhost.borderTopLeftRadius};
        border-top-right-radius: ${$dragGhost.borderTopRightRadius};
        border-bottom-right-radius: ${$dragGhost.borderBottomRightRadius};
        border-bottom-left-radius: ${$dragGhost.borderBottomLeftRadius};
        box-shadow: var(--global-depth-lvl3);
        background-color: var(--container-standard-bg-alt);
        opacity: var(--container-draggable-ghost);
        pointer-events: none;
      }
    `}
`;

interface StyledItemContentProps extends PaddingProps {
  $hasCustomDragHandle?: boolean;
  $flexDirection?: "row" | "row-reverse";
}

const StyledItemContent = styled.div.attrs(
  applyBaseTheme,
)<StyledItemContentProps>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  justify-content: space-between;
  flex-direction: ${({ $flexDirection }) => $flexDirection};

  ${({ $hasCustomDragHandle }) =>
    $hasCustomDragHandle &&
    css`
      display: flex;
      border-bottom: none;
    `}
`;

const StyledDragHandle = styled.span`
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  min-width: 40px;
  min-height: 40px;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    cursor: grabbing;
  }
`;

export {
  StyledDraggableContainer,
  StyledDraggableItem,
  StyledItemContent,
  StyledDragHandle,
};
