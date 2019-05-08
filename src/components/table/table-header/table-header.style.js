import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

const StyledTableHeader = styled.th`
  ${({
    align, sortable, theme, size
  }) => {
    const { table, colors } = theme;
    return css`
      background-color: ${table.header};
      border-bottom: 1px solid ${table.secondary};
      border-left: 1px solid ${colors.border};
      border-right: none;
      border-top: none;
      box-sizing: border-box;
      color: ${colors.white};
      font-weight: 700;
      height: ${isClassic(theme) ? table.sizes.medium : table.sizes[size]};
      outline: medium none;
      padding: 0 8px;
      position: relative;
      text-align: ${align !== '' ? align : 'left'};
      text-overflow: ellipsis;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;

      &:first-child {
        border-left: none;
      }

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

function isClassic({ name }) {
  return name === THEMES.classic || !name;
}

StyledTableHeader.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', ''])
};

StyledTableHeader.defaultProps = {
  theme: baseTheme
};

export default StyledTableHeader;
