import styled from "styled-components";

const StyledPicklist = styled.ul`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 8px 8px 8px 8px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  height: 400px;
  scrollbar-color: rgb(102, 132, 148) rgb(242, 245, 246);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(242, 245, 246);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(102, 132, 148);
  }

  & + & {
    margin-left: 32px;
  }

  .picklist-item-enter {
    opacity: 0;
    transform: translate(-16px);
    transition: all 300ms ease-in;
  }

  .picklist-item-enter-active {
    opacity: 1;
    transform: translate(0px);
    transition: all 300ms ease-in;
  }

  .picklist-group-enter {
    opacity: 0;
    transform: translate(-16px);
    transition: all 300ms ease-in;
  }

  .picklist-group-enter-active {
    opacity: 1;
    transform: translate(0px);
    transition: all 300ms ease-in;
  }
`;

const StyledEmptyContainer = styled.li`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
`;

export { StyledPicklist, StyledEmptyContainer };
