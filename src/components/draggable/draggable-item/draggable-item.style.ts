import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import applyBaseTheme from "../../../style/themes/apply-base-theme";

interface StyledDraggableItemProps extends PaddingProps {
  id: string;
  isDragging?: boolean;
  flexDirection?: "row" | "row-reverse";
}

const StyledDraggableItem = styled.div.attrs(
  applyBaseTheme,
)<StyledDraggableItemProps>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  cursor: move;
  justify-content: space-between;
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

const StyledDraggableContainer = styled.div.attrs(applyBaseTheme)<{
  flexDirection: "row" | "row-reverse";
}>`
  ${margin}

  ${StyledDraggableItem} {
    flex-direction: ${({ flexDirection }) => flexDirection};
    transition: opacity 0.2s ease-in-out;
  }

  [data-drag-state="is-being-dragged-over"] {
    opacity: 0;
  }

  [data-drag-state="is-dragging"] {
    opacity: 0;
  }
`;

export { StyledDraggableContainer, StyledDraggableItem };
