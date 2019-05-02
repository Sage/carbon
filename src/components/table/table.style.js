import styled from 'styled-components';
import {
  applyClassicInternalStyling,
  applyClassicTableStyling
} from './classicTableStyling.style.js';
import {
  applyModernInternalStyling,
  applyModernTableStyling
} from './modernTableStyling.style.js';
// import StyledLink from '../'
import { THEMES } from '../../style/themes';

const StyledTable = styled.table`
  ${(props) => {
    return props.theme.name === THEMES.classic ? applyClassicTableStyling(props) : applyModernTableStyling();
  }}
`;

export const StyledInternalTableWrapper = styled.div`
  ${styleInternalWrapper}
  ${({ onConfigure }) => onConfigure && `
    &, ${StyledTable} {
      border-radius: 0 0px 0px 0px;
    }
  `}
`;

function styleInternalWrapper(props) {
  return props.theme.name === THEMES.classic ? applyClassicInternalStyling(props) : applyModernInternalStyling();
}

export default StyledTable;
