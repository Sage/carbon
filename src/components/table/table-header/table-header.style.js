import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';
import OptionsHelper from '../../../utils/helpers/options-helper';
import tableSizes from '../table-sizes.style';

const StyledTableHeader = styled.th`
  ${({
    align, sortable, theme, width
  }) => {
    const { table, colors } = theme;
    return css`
      background-color: ${table.header};
      border-width: 0;
      border-bottom: 1px solid ${table.secondary};
      border-left: 1px solid ${colors.border};
      box-sizing: border-box;
      color: ${colors.white};
      font-weight: 700;
      ${isClassic(theme) ? `height: ${tableSizes.medium.height};` : ''}
      outline: medium none;
      padding: 0 8px;
      position: relative;
      text-align: ${align};
      text-overflow: ellipsis;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;

      &:first-child {
        border-left: none;
      }

      ${width ? `width: ${width}px;` : ''}

      ${sortable && applySortableStyling(align, colors, table)}
    `;
  }}
`;

function applySortableStyling(align, colors, table) {
  return css`
    cursor: pointer;

    &:hover {
      background-color: ${table.tertiary};
    }

    a {
      &:link,
      &:visited,
      &:hover,
      &:active {
        color: ${colors.white};
        text-decoration: none;
      }

      span {
        float: ${align === 'right' ? 'left' : 'right'};
      
        .carbon-icon__svg--sort-down,
        .carbon-icon__svg--sort-up {
          height: 11px;
          width: 10px;
        }
      }    
    }
  `;
}

StyledTableHeader.propTypes = {
  /** Sets the alignment from the content */
  align: PropTypes.oneOf(OptionsHelper.alignFull),

  /** Toggles whether column is sortable */
  sortable: PropTypes.bool,

  /** Width to set column to. */
  width: PropTypes.string
};

StyledTableHeader.defaultProps = {
  theme: baseTheme,
  align: 'left'
};

export default StyledTableHeader;
