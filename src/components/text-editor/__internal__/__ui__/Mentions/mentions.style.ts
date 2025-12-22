import styled from "styled-components";

export const TypeaheadPopover = styled.div`
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  position: relative;
  width: 250px; /* .mentions-menu class */
`;

export const MentionsList = styled.ul`
  padding: 8px 0;
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
  padding: 8px 24px;
  color: #0000008c;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 0;
  border: 0;

  &:hover {
    background-color: #eee;
    color: #000;
    border-radius: 0;

    div[data-component="portrait"] {
      color: #000;

      [data-element="initials"],
      [data-component="icon"] {
        color: #000;
      }
    }
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

  .text {
    display: flex;
    line-height: 20px;
    flex-grow: 1;
    min-width: 150px;
    margin-left: 8px;
    align-items: center;
    font-size: 14px;
    margin-top: -1px;
    white-space: pre;
  }

  div[data-component="portrait"] {
    background-color: #f2f5f6ff;
    color: #000000e6;
    min-width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #ccd6dbff;
    display: inline-block;
    font-size: 13px;

    [data-element="initials"],
    [data-component="icon"] {
      color: #8b8b8b;
    }
  }
`;
