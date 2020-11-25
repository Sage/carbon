import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledTableCell from "../table-cell/table-cell.style";

import {
  applyModernRowStyling,
  applyModernSelectedStyling,
  applyModernDropTargetStyling,
} from "./table-row-modern.style";
import baseTheme from "../../../style/themes/base";
import StyledIcon from "../../icon/icon.style";
import CheckboxStyle from "../../../__experimental__/components/checkbox/checkbox.style";

/**
 * Current version of react-dnd used in DragAndDrop is incompatible
 * with styled-components, this can be uodated once the issue is fixed
 */
const StyledTableRow = styled.tr`
  ${applyModernRowStyling}
  ${selectableRowStyling}
  ${highlightRowStyling}
  ${selectedRowStyling}
  ${dragRowStyling}
`;

function selectableRowStyling({ isSelectable }) {
  return css`
    ${isSelectable &&
    css`
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
    ${isSelected &&
    css`
      &&&&,
      &&&&:nth-child(odd),
      &&&&:hover {
        ${StyledTableCell} {
          ${applyModernSelectedStyling(theme)}
        }
      }
    `}
  `;
}

function highlightRowStyling({ isClickable, isHighlighted, theme }) {
  const { table } = theme;
  return css`
    ${isClickable && "cursor: pointer;"}

    ${isHighlighted &&
    css`
      &&&& {
        ${StyledTableCell} {
          ${applyModernSelectedStyling(theme)}
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
            background-color: ${table.selected};
          }
        }
      }
    `}
  `;
}

function dragRowStyling({
  isDragged,
  isDragging,
  theme,
  isDraggedElementOver,
  inDeadZone,
}) {
  const border = css`1px solid ${theme.table.header} !important`;

  return css`
    ${StyledIcon} {
      cursor: move;
      cursor: grab;
    }

    .custom-drag-layer && ${StyledIcon} {
      cursor: move;
      cursor: grabbing;
    }

    ${isDragging &&
    css`
      user-select: none;
    `}

    ${isDragged &&
    css`
      ${inDeadZone && isDraggedElementOver} {
        ${StyledTableCell} {
          background-color: ${theme.table.dragging};
          border-top: ${border};
          border-bottom: ${border};

          &:first-child {
            border-left: ${border};
          }

          &:last-child {
            border-right: ${border};
          }
        }
      }
    `}
    
    ${StyledTableCell} {
      ${applyModernDropTargetStyling}
    }
  `;
}

StyledTableRow.propTypes = {
  theme: PropTypes.object,
};

StyledTableRow.defaultProps = {
  theme: baseTheme,
};

export default StyledTableRow;
