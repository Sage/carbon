import styled, { css } from 'styled-components';

const ScrollableListContainer = styled.ul`
  width: 100%;
  max-height: 180px;
  ${(props) => props.maxHeight && css`max-height: ${props.maxHeight};`};
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid rgb(20, 20, 20, 0.5);
  box-sizing: border-box;
  box-shadow: 0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1);
  list-style-type: none;
`;

export default ScrollableListContainer;