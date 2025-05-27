import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import { baseTheme } from "../../../style/themes";

interface StyledDraggableItemProps extends PaddingProps {
  id: number | string;
  isDragging?: boolean;
  flexDirection?: "row" | "row-reverse";
}

const StyledDraggableItem = styled.div<StyledDraggableItemProps>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  cursor: move;
  justify-content: space-between;
  flex-direction: ${({ flexDirection }) => flexDirection};
  will-change: opacity;
`;

const StyledDraggableContainer = styled.div<{
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

StyledDraggableContainer.defaultProps = {
  theme: baseTheme,
};

StyledDraggableItem.defaultProps = {
  theme: baseTheme,
};

export { StyledDraggableContainer, StyledDraggableItem };
