import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import { baseTheme } from "../../../style/themes";

interface StyledDraggableItemProps extends PaddingProps {
  isDragging?: boolean;
  flexDirection?: "row" | "row-reverse";
  id: number | string;
  childId?: string | number;
}

const StyledDraggableItem = styled.div<StyledDraggableItemProps>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  cursor: move;
  justify-content: space-between;
`;

const StyledDraggableContainer = styled.div<
  Pick<StyledDraggableItemProps, "flexDirection">
>`


[data-drag-state="is-dragging"] {
  visibility: hidden;
}

[data-drag-state="is-dragging-over"] {
  visibility: hidden;
}

  ${margin}

  ${StyledDraggableItem} {
    flex-direction: ${({ flexDirection }) => flexDirection};
  }
`;

StyledDraggableContainer.defaultProps = {
  theme: baseTheme,
};

StyledDraggableItem.defaultProps = {
  theme: baseTheme,
};

export { StyledDraggableContainer, StyledDraggableItem };
