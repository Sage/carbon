import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  applyClassicInternalStyling,
  applyClassicTableStyling
} from './table-classic.style.js';
import {
  applyModernTableStyling,
  applyModernInternalStyling
} from './table-modern.style.js';
import tableRowStyling from './table-row/table-row.style';
import {
  LinkStyle as StyledLink,
  LinkStyleAnchor as StyledLinkAnchor
} from '../link/link.style';
import baseTheme from '../../style/themes/base';
import { isClassic } from '../../utils/helpers/style-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledTableCell from './table-cell/table-cell.style.js';

const StyledTable = styled.table`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;
  word-break: break-all;
  
  ${(props) => {
    if (isClassic(props.theme)) return applyClassicTableStyling(props);
    return applyModernTableStyling(props);
  }}

  & caption {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    width: 1px;
    position: absolute;
    top: -99999px;
  }

  .carbon-table-row:last-child ${StyledTableCell} {
    border-bottom-color: transparent;
  }

  ${({ paginate }) => {
    return paginate && applyPaginationStyle;
  }}

  ${tableRowStyling}
`;

function applyPaginationStyle() {
  return css`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;
}

export const StyledInternalTableWrapper = styled.div`
  ${styleInternalWrapper}
  border-radius: 0px;
  overflow: visible;
  position: relative;
  
  ${({ onConfigure, theme }) => onConfigure && css`
    ${StyledTable} {
      border-radius: 0;
    }
    
    ${StyledLink} {
      left: -25px;
      position: absolute;
      top: -1px;
      width: 25px;

      ${StyledLinkAnchor} {
        align-items: center;
        background-color: ${theme.table.header};
        border: 1px solid ${theme.table.secondary};
        border-right: none;
        border-radius: 25px 0 0 25px;
        box-sizing: content-box;
        color: ${theme.colors.white};
        display: flex;
        height: 100%;
        justify-content: center;

        &:hover {
          background-color: #19475A;
          color: ${theme.colors.white};
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
  if (isClassic(props.theme)) return applyClassicInternalStyling();
  return applyModernInternalStyling(props);
}

StyledTable.propTypes = {
  /** Toggles the type variations of the table */
  tableType: PropTypes.oneOf(OptionsHelper.tableThemes),

  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool
};

StyledTable.defaultProps = {
  theme: baseTheme,
  size: 'medium'
};

StyledInternalTableWrapper.propTypes = {
  /** The height for the Table Wrapper */
  minHeight: PropTypes.string
};

StyledInternalTableWrapper.defaultProps = {
  theme: baseTheme,
  size: 'medium'
};

export default StyledTable;
