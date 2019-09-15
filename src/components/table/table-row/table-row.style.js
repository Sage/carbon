import styled, { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import {
  applyClassicDraggedStyling,
  applyClassicRowStyling,
  applyClassicSelectedStyling,
  applyClassicHighlightStyling
} from './table-row-classic.style';
import {
  applyModernDraggedStyling,
  applyModernRowStyling,
  applyModernSelectedStyling
} from './table-row-modern.style';
import { StyledIcon } from '../../icon/icon.style';
import CheckboxStyle from '../../../__experimental__/components/checkbox/checkbox.style';
import { isClassic } from '../../../utils/helpers/style-helper';

/**
 * Current version of react-dnd used in DragAndDrop is incompatible
 * with styled-components, this can be uodated once the issue is fixed
 */
const StyledTableRow = styled.tr`
  ${applyRowStyling}
`;

function applyRowStyling({ isPassive, isSelected, theme }) {
  return css`
    .custom-drag-layer && {
      background-color: ${theme.table.dragging};
      display: block;

      ${StyledTableCell} {
        background-color: ${theme.table.dragging};
        border: none;
      }
    }

    ${isClassic(theme) ? applyClassicRowStyling(isPassive, isSelected) : applyModernRowStyling(isPassive, theme)}
    ${selectableRowStyling}
    ${highlightRowStyling}
    ${selectedRowStyling}
    ${dragRowStyling}
  `;
}

function selectableRowStyling({ isSelectable, theme }) {
  return css`
    ${isSelectable && css`
      ${StyledTableCell}:first-child,
      ${StyledTableHeader}:first-child {
        &:not(['data-component=selectable-cell']) {
          ${isClassic(theme) ? 'padding-left: 15px' : ''};
        }
      }

      ${StyledTableCell}:first-child {
        width: 18px;
      }

      ${CheckboxStyle} {
        height: 15px;
        padding-top: 0;
      }
    `}
  `;
}

function selectedRowStyling({ isSelected, theme }) {
  return css`
    ${isSelected && css`
      &&&&,
      &&&&:nth-child(odd),
      &&&&:hover {
        ${StyledTableCell} {
          ${isClassic(theme) ? applyClassicSelectedStyling() : applyModernSelectedStyling(theme)} 
        }
      }
    `}
  `;
}

function highlightRowStyling({ isClickable, isHighlighted, theme }) {
  const { table } = theme;
  return css`
    ${isClickable && 'cursor: pointer;'}

    ${isHighlighted && css`
      &&&& {
        ${StyledTableCell} {
          ${isClassic(theme) ? applyClassicHighlightStyling() : applyModernSelectedStyling(theme)}
          position: relative;
    
          &:before {
            content: "";
            height: 1px;
            left: 0;
            position: absolute;
            top: -1px;
            width: 100%;
          }
        }
    
        &:hover {
          ${StyledTableCell} {
            background-color: ${isClassic(theme) ? '#D0E3FA' : table.selected};
          }
        }
      }
    `}
  `;
}

function dragRowStyling({ isDragged, isDragging, theme }) {
  return css`
    ${StyledIcon} {
      cursor: move;
    }

    .custom-drag-layer && ${StyledIcon} {
      cursor: grabbing;
    }

    ${isDragging && css`
      user-select: none;
    `}

    ${isDragged && css`
      &&&&& {
        ${isClassic(theme) ? applyClassicDraggedStyling() : applyModernDraggedStyling()}
      }
    `}
  `;
}
export default StyledTableRow;
