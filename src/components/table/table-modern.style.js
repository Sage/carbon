import { css } from 'styled-components';
import StyledTableCell from './table-cell/table-cell.style';
import StyledTableHeader from './table-header/table-header.style';
import tableSizes from './table-sizes.style';
import StyledInputPresentation from '../../__experimental__/components/input/input-presentation.style';
import StyledInput from '../../__experimental__/components/input/input.style';

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
  const { table } = theme;
  return css`
    background-color: ${type === 'tertiary' ? 'transparent' : theme.colors.white};
    && .carbon-table-row {
      height: ${tableSizes[size].height};
      ${StyledTableCell}, ${StyledTableHeader} {
        font-size: ${tableSizes[size].font};
        padding-left: ${tableSizes[size].padding};
        padding-right: ${tableSizes[size].padding};
      }

      ${isZebra && `
        &:nth-child(2n) {
          ${StyledTableCell} {
            background-color: ${table.zebra};
          }
        }
      `}
    }
    ${type !== 'primary' && additionalThemeStyling(type, theme)}
    ${applyInputStyling(size)}
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

function applyInputStyling(size) {
  return `
    ${StyledInput} {
      font-size: ${tableSizes[size].font};
      height: ${tableSizes[size].inputHeight};
      padding-top: 0;
      padding-bottom: 0;
    }

    && ${StyledInputPresentation} {
      height: ${tableSizes[size].inputHeight};
      min-height: ${tableSizes[size].inputHeight};
      padding-left: ${tableSizes[size].padding};
      padding-right: ${tableSizes[size].padding};
      overflow: auto;
    }
  `;
  /*
    background-color: #e6ebed;
    border-left: 1px solid #bfccd2;
    box-sizing: border-box;
    color: #003349;
    cursor: pointer;
    height: 29px;
    text-align: center;
    width: 31px;
    */
}

export {
  applyModernTableStyling,
  applyModernInternalStyling
};
