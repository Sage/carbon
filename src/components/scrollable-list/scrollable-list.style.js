import styled from 'styled-components';

const ScrollableListContainer = styled.ul`
  background-color: white;
  border: 1px solid rgb(20, 20, 20, 0.5);
  box-sizing: border-box;
  box-shadow: 0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1);
  list-style-type: none;
  max-height: ${props => `${props.maxHeight}`};
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  width: 100%;
`;

ScrollableListContainer.defaultProps = {
  maxHeight: '180px'
};

export default ScrollableListContainer;
