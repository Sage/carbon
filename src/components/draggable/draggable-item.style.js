import styled from "styled-components";
import { padding, margin } from "styled-system";

import { baseTheme } from "../../style/themes";
import Icon from "../icon";

const StyledDraggableContainer = styled.div`
  ${margin}
`;

const StyledDraggableItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--colorsUtilityMajor050);
  ${padding}
  cursor: move;

  opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};
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
