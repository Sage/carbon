import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import applyBaseTheme from "../../../style/themes/apply-base-theme";

const StyledDraggableContainer = styled.div.attrs(applyBaseTheme)`
  ${margin}
`;

interface StyledDraggableItemProps extends PaddingProps {
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
  opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};
`;

export { StyledDraggableContainer, StyledDraggableItem };
