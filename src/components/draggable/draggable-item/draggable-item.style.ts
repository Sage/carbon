import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import { baseTheme } from "../../../style/themes";

const StyledDraggableContainer = styled.div`
  ${margin}
`;

interface StyledDraggableItemProps extends PaddingProps {
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
  opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};
`;

StyledDraggableContainer.defaultProps = {
  theme: baseTheme,
};

StyledDraggableItem.defaultProps = {
  theme: baseTheme,
};

export { StyledDraggableContainer, StyledDraggableItem };
