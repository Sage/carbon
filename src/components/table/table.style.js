import styled, { css } from 'styled-components';
import {
  applyClassicInternalStyling,
  applyClassicTableStyling
} from './table-classic.style.js';
import {
  applyModernTableStyling,
  applyModernInternalStyling
} from './table-modern.style.js';
import tableRowStyling from './table-row/table-row.style';
import StyledLink from '../link/link-classic.style';
import baseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const StyledTable = styled.table`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;
  word-break: break-all;
  
  ${(props) => {
    return isClassic(props.theme) ? applyClassicTableStyling(props) : applyModernTableStyling(props);
  }}

  & caption {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    width: 1px;
    position: absolute;
    top: -99999px;
  }

  ${({ paginate }) => {
    if (paginate) {
      return css`
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      `;
    }
    return css``;
  }}

  ${tableRowStyling}
`;

function isClassic({ name }) {
  return name === THEMES.classic || name === THEMES.base || !name;
}

export const StyledInternalTableWrapper = styled.div`
  ${styleInternalWrapper}
  border-radius: 0px;
  overflow: visible;
  position: relative;

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
  return isClassic(props.theme) ? applyClassicInternalStyling(props) : applyModernInternalStyling(props);
}

StyledTable.propTyopes = {

};

StyledTable.defaultProps = {
  theme: baseTheme
};

export default StyledTable;
