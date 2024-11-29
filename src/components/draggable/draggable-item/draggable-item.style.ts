import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import { baseTheme } from "../../../style/themes";
import Icon from "../../icon";
import { DragState } from "../../../hooks/useDraggable/__internal__/draggable-utils";

const StyledDraggableContainer = styled.div`
  ${margin}
`;

interface StyledDraggableItemProps extends PaddingProps {
  dragState?: string;
  ref?: any;
}

const genOpacity = (dragState?: string) => {
  if (dragState === "is-dragging-over") {
    return "0";
  } else if (dragState === "is-dragging") {
    return "1";
  } else if (dragState === "preview") {
    return "0.5";
  }
  return "1";
};

const StyledDraggableItem = styled.div<StyledDraggableItemProps>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  cursor: move;

  opacity: ${({ dragState }) => genOpacity(dragState)};
`;

const StyledIcon = styled(Icon)`
  margin-left: auto;
`;

StyledDraggableContainer.defaultProps = {
  theme: baseTheme,
};

StyledDraggableItem.defaultProps = {
  theme: baseTheme,
};

export { StyledDraggableContainer, StyledDraggableItem, StyledIcon };
