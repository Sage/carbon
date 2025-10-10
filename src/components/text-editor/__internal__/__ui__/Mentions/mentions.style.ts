// mentions-menu.styles.ts
import styled from "styled-components";

export const TypeaheadPopover = styled.div`
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  position: relative;
  width: 250px; /* .mentions-menu class */
`;

export const MentionsList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MentionsListItem = styled.li`
  padding: 8px;
  color: #000000aa;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 8px;
  border: 0;

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    background-color: #eee;
    border-radius: 0;
  }

  &.active {
    display: flex;
    width: 20px;
    height: 20px;
    background-size: contain;
  }

  &.selected {
    background: #eee;
  }

  span[data-component="icon"] {
    border: #00000088 1px solid;
    margin-right: 8px;
  }

  .text {
    display: flex;
    line-height: 20px;
    flex-grow: 1;
    min-width: 150px;
  }

  .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 8px;
    line-height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
