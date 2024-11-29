import styled from "styled-components";
import { padding, margin, PaddingProps } from "styled-system";

import { baseTheme } from "../../../style/themes";
import Icon from "../../icon";

const StyledDraggableContainer = styled.div`
  ${margin}
`;

interface StyledDraggableItemProps extends PaddingProps {
  dragState?: string;
  ref?: any;
}

const genOpacity = (dragState?: string) => {
  switch (dragState) {
    case "is-dragging-over":
      return "0";
    case "preview":
      return "0.5";
    default:
      return "1";
  }
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
