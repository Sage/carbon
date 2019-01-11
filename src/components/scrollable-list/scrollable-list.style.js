import styled, { css } from 'styled-components';

const ScrollableListContainer = styled.div`
  width: 100%;
  max-height: 180px;
  ${(props) => props.maxHeight && css`max-height: ${props.maxHeight};`};
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid rgb(20, 20, 20, 0.5);
  box-sizing: border-box;
  box-shadow: 1px 0 10px rgba(20, 20, 20, 0.2);
  list-style-type: none;
`;

export default ScrollableListContainer;