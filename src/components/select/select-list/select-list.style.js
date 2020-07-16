import styled from 'styled-components';
import { baseTheme } from '../../../style/themes';

const StyledSelectList = styled.ul`
  background-color: white;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  list-style-type: none;
  max-height: ${props => `${props.maxHeight}`};
  margin: 0;
  outline: none;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  width: 100%;
`;

StyledSelectList.defaultProps = {
  maxHeight: '180px',
  theme: baseTheme
};

export default StyledSelectList;
