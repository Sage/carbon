import styled, { css } from "styled-components";
import { padding, margin } from "styled-system";
import { baseTheme } from "../../style/themes";
import Icon from "../icon";

const StyledIcon = styled(Icon)`
  margin-left: auto;
`;

const StyledDraggableContainer = styled.div`
  ${({ as }) =>
    as === "ul" &&
    css`
      padding-inline-start: 0;
      width: 100%;
      height: 100%;
      overflow-x: visible;
      margin: 0;
      padding-right: 0;
      ${({ theme }) =>
        css`
          scrollbar-color: ${theme.scrollbar.light.thumb}
            ${theme.scrollbar.light.track};

          &::-webkit-scrollbar {
            width: 8px;
          }

          &::-webkit-scrollbar-thumb {
            background-color: ${theme.scrollbar.light.thumb};
          }

          &::-webkit-scrollbar-track {
            background-color: ${theme.scrollbar.light.track};
          }
        `}

      ${StyledIcon}:last-of-type {
        display: none;
      }
    `};
  ${margin}
`;

const StyledDraggableItem = styled.div`
  ${({ as }) =>
    as === "li" &&
    css`
      && {
        border-bottom: none;
        padding: 0;
        &:not(:first-child) {
          margin-top: 8px;
        }
      }

      &.draggable-enter-active {
        opacity: 0;
        transform: translate(-16px);
      }
      &.draggable-enter-done {
        opacity: 1;
        transform: translate(0);
        transition: all 300ms ease-in;
      }
    `}
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.draggableItem.border};
  ${padding}
  cursor: move;

  opacity: ${({ isDragging }) => (isDragging ? "0" : "1")};
`;

StyledDraggableContainer.defaultProps = {
  theme: baseTheme,
};

StyledDraggableItem.defaultProps = {
  theme: baseTheme,
};

export { StyledDraggableContainer, StyledDraggableItem, StyledIcon };
