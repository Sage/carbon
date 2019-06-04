import { css } from 'styled-components';
import StyledTableCell from './table-cell/table-cell.style';
import StyledTableHeader from './table-header/table-header.style';
import tableSizes from './table-sizes.style';

function convertTableType(type) {
  if (['primary', 'secondary', 'tertiary'].includes(type)) return type;
  if (type === 'transparent') return 'tertiary';
  if (type === 'light') return 'secondary';
  return 'primary';
}

function applyModernInternalStyling({ tableType, theme }) {
  const type = convertTableType(tableType);
  return css`
    background-color: transparent;
    border: 1px solid ${type === 'tertiary' ? 'transparent' : theme.table.primary};
  `;
}

function applyModernTableStyling({
  tableType, theme, isZebra, size
}) {
  const type = convertTableType(tableType);
  const { table } = theme;
  const { height, fontSize, paddingSize } = tableSizes[size];
  return css`
    background-color: ${type === 'tertiary' ? 'transparent' : theme.colors.white};
    && .carbon-table-row {
      height: ${height};
      ${StyledTableCell}, ${StyledTableHeader} {
        font-size: ${fontSize};
        padding-left: ${paddingSize};
        padding-right: ${paddingSize};
      }

      ${isZebra && `
        &:nth-child(2n) {
          ${StyledTableCell} {
            background-color: ${table.zebra};
          }
        }
        :hover ${StyledTableCell} {
          background-color: ${table.primary};
        }
      `}
      :hover ${StyledTableCell} {
        background-color: ${table.primary};
      }
    }
    ${type !== 'primary' && additionalThemeStyling(type, theme)}
  `;
}

function additionalThemeStyling(type, { text, table, colors }) {
  return css`
    ${type === 'tertiary' ? 'border-color: transparent;' : ''}
    ${StyledTableCell} {
      background-color: ${colors.white};
    }

    ${StyledTableHeader} {
      background-color: ${type === 'secondary' ? table.secondary : 'transparent'};
      ${type === 'tertiary' ? 'border-left-color: transparent;' : ''}
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

// function applyInputStyling(size) {
//   const { inputHeight, fontSize, paddingSize } = tableSizes[size];
//   return `
//     ${StyledInputPresentation} {
//       min-height: ${inputHeight}px;
//       padding-left: ${paddingSize};
//       padding-right: ${paddingSize};
//       position: relative;
//     }

//     ${StyledInput} {
//       font-size: ${fontSize};
//       height: ${inputHeight}px;
//     }

//     textarea {
//       overflow: auto;
//       padding-top: 5px;
//       padding-bottom: 5px;
//       resize: none;
//       flex-grow: 1;
//       height: auto !important;
//       min-height: ${inputHeight * 3}px;
//     }
//   `;
// }

export {
  applyModernTableStyling,
  applyModernInternalStyling
};
