import styled from 'styled-components';
import {
  applyClassicInternalStyling,
  applyClassicTableStyling
} from './table-classic.style.js';
import {
  applyModernInternalStyling,
  applyModernTableStyling
} from './table-modern.style.js';
import StyledLink from '../link/link-classic.style';
import { THEMES } from '../../style/themes';

const StyledTable = styled.table`
  ${(props) => {
    return props.theme.name === THEMES.classic ? applyClassicTableStyling(props) : applyModernTableStyling();
  }}
`;

export const StyledInternalTableWrapper = styled.div`
  ${styleInternalWrapper}

  ${({ onConfigure }) => onConfigure && `
    ${StyledTable} {
      border-radius: 0 0px 0px 0px;
    }
    
    & ${StyledLink} {
      left: -25px;
      position: absolute;
      top: -1px;
      width: 25px;

      a {
        align-items: center;
        background-color: #335B6D;
        border: 1px solid #CCD6DA;
        border-right: none;
        border-radius: 25px 0 0 25px;
        box-sizing: content-box;
        color: #ffffff;
        display: flex;
        height: 100%;
        justify-content: center;

        &:hover {
          background-color: #19475A;
          color: #ffffff;
        }
    
        :first-child {
          height: 19px;
          margin-right: -4px;
          z-index: 3;
        }
      }
    }
  `}
`;

function styleInternalWrapper(props) {
  return props.theme.name === THEMES.classic ? applyClassicInternalStyling(props) : applyModernInternalStyling();
}

export default StyledTable;
