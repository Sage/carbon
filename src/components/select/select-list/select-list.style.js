import styled from 'styled-components';
import { baseTheme } from '../../../style/themes';

const overhang = 4;

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
  width: calc(100% + ${2 * overhang}px);
  z-index: 2000;
  top: 100%;
  left: -${overhang}px;
`;

StyledSelectList.defaultProps = {
  maxHeight: '180px',
  theme: baseTheme
};

export default StyledSelectList;
