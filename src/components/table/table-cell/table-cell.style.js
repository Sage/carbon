import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledTableCell = styled.td`
  ${({ action, align, theme }) => {
    const { colors, table } = theme;
    return css`
      background-color: ${table.primary};
      border-width: 0;
      border-bottom: 1px solid ${table.secondary};
      font-size: 13px;
      overflow: visible;
      padding: 8px;
      text-align: ${align};
      vertical-align: middle;
      white-space: nowrap;

      > .common-input {
        margin-bottom: -4px;
        margin-left: -6px;
        margin-right: -6px;
        margin-top: -4px;
      }
      
      ${action && applyActionStyling(colors)}
  `;
  }}
`;

function applyActionStyling(colors) {
  return css`
    width: 18px;

    .icon-delete:before {
      cursor: pointer;
      color: ${colors.border};
      font-size: 16px;
      line-height: 15px;
      margin-left: 1px;
    }

    .icon-delete:hover:before {
      color: #C7384F;
    }
  `;
}

StyledTableCell.propTypes = {
  /**
   * Defines the cell type to be an action - used for the delete cell.
   */
  action: PropTypes.bool,

  /**
   * Defines the alignment of the cell (eg "left", "center" or "right").
   */
  align: PropTypes.oneOf(OptionsHelper.alignFull)
};

StyledTableCell.defaultProps = {
  theme: baseTheme,
  align: 'left'
};

export default StyledTableCell;
