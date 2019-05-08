import { css } from 'styled-components';
import StyledTableCell from './table-cell/table-cell.style';
import StyledTableHeader from './table-header/table-header.style';
import StyledTableRow from './table-row/table-row.style';

function convertTableType(type) {
  if (['primary', 'secondary', 'tertiary'].includes(type)) return type;
  if (type === 'transparent') return 'tertiary';
  if (type === 'light') return 'secondary';
  return 'primary';
}

function applyModernInternalStyling({ tableType, theme }) {
  const type = convertTableType(tableType);
  return css`
    background-color: ${type === 'tertiary' ? 'transparent' : theme.table.primary};
    border: 1px solid ${type === 'tertiary' ? 'transparent' : theme.table.primary};
  `;
}

function applyModernTableStyling({
  tableType, theme, isZebra, size
}) {
  const type = convertTableType(tableType);
  const { table, colors } = theme;

  return css`
    background-color: ${type === 'tertiary' ? 'transparent' : theme.colors.white};
    ${StyledTableRow} {
      height: ${table.sizes[size]};
      
      ${isZebra && `
        ${StyledTableCell} {
          background-color: ${table.zebra};
        }
        &:nth-child(2n+1) {
          ${StyledTableCell} {
            background-color: ${colors.white};
          }
        }
      `}
    }
    ${type !== 'primary' && additionalThemeStyling(type, theme)}
  `;
}

function additionalThemeStyling(type, { text, table, colors }) {
  return css`
    border-color: ${type === 'tertiary' ? 'transparent' : ''}
    ${StyledTableCell} {
      background-color: ${colors.white};
    }

    ${StyledTableHeader} {
      background-color: ${type === 'secondary' ? table.secondary : 'transparent'};
      border-left-color: ${type === 'tertiary' ? 'transparent' : ''};
      color: ${text.color};
        
      a:link,
      a:visited,
      a:hover,
      a:active {
        color: ${text.color};
      }
    }
  `;
}

export {
  applyModernTableStyling,
  applyModernInternalStyling
};
