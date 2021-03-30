import styled from "styled-components";
import Box from "../../box";

const StyledPicklist = styled(Box).attrs({ as: "ul" })`
  position: relative;
  list-style: none;
  margin: 0 -4px;
  padding: 4px 4px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  height: 400px;

  & + & {
    margin-left: 80px;
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
