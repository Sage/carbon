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
  const { table, colors } = theme;
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
    ${addInputStyling(size)}
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

function addInputStyling(size) {
  return `
    ${StyledInput} {
      font-size: ${tableSizes[size].font};
      height: ${tableSizes[size].inputHeight};
      padding-left: ${tableSizes[size].padding};
      padding-right: ${tableSizes[size].padding};
    }

    && ${StyledInputPresentation} {
      height: ${tableSizes[size].inputHeight};
      min-height: ${tableSizes[size].inputHeight};
    }

    && ${StyledTableCell} div {
      height: ${tableSizes[size].inputHeight};
      min-height: ${tableSizes[size].inputHeight};
    }
  `;
}

export {
  applyModernTableStyling,
  applyModernInternalStyling
};
