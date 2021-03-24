import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";
import StyledFlatTableRowHeader from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import StyledFlatTableHeader from "../flat-table-header/flat-table-header.style";
import StyledIcon from "../../icon/icon.style";

const stickyColumnFocusStyling = (index, theme) => {
  return `
    border-bottom: 1px solid transparent;
    border-left: 1px solid ${
      index === 0 ? theme.colors.focus : theme.table.secondary
    };
    background-clip: padding-box;
    z-index: ${theme.zIndex.overlay};

    :before {
      content: "";
      border-top: 2px solid ${theme.colors.focus};
      border-bottom: 1px solid ${theme.colors.focus};
      display: block;
      left: 0px;
      top: -1px;
      height: 99%;
      width: 101%;
      position: absolute;
      z-index: ${theme.zIndex.overlay};
    }
  `;
};

const borderColor = (colorTheme, theme) => {
  switch (colorTheme) {
    case "light":
      return theme.flatTable.light.border;

    case "transparent-base":
      return theme.flatTable.transparentBase.border;

    case "transparent-white":
      return theme.flatTable.transparentWhite.border;

    // default theme is "dark"
    default:
      return theme.flatTable.dark.border;
  }
};

const StyledFlatTableRow = styled.tr`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;

  ${({ isRowInteractive, theme, rowHeaderIndex }) =>
    isRowInteractive &&
    css`
      cursor: pointer;

      :focus {
        outline: 2px solid ${theme.colors.focus};
        outline-offset: -1px;

        ${StyledFlatTableRowHeader} {
          ${stickyColumnFocusStyling(rowHeaderIndex, theme)}
        }

        ${![-1, 0].includes(rowHeaderIndex) &&
        css`
          ${Array.from({ length: rowHeaderIndex }).map((_, index) => {
            return `
              td:nth-of-type(${index + 1}) {
                ${stickyColumnFocusStyling(index, theme)}
              }
            `;
          })}
        `}
      }

      :hover {
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader}, ${StyledFlatTableCheckbox} {
          background-color: ${theme.flatTable.hover};
        }
      }
    `}

  ${({ isFirstColumnInteractive, firstCellIndex, theme }) =>
    isFirstColumnInteractive &&
    css`
      td:nth-child(${firstCellIndex + 1}),
      th:nth-child(${firstCellIndex + 1}) {
        cursor: pointer;

        :focus {
          outline: 2px solid ${theme.colors.focus};
          outline-offset: -1px;
        }

        :hover {
          background-color: ${theme.flatTable.hover};
        }
      }
    `}

    ${({ colorTheme, rowHeaderIndex, theme }) =>
    ![-1, 0].includes(rowHeaderIndex) &&
    css`
      td:nth-of-type(${rowHeaderIndex + 1}) {
        border-left: 1px solid ${theme.table.secondary};
      }

      th:nth-of-type(${rowHeaderIndex + 2}) {
        border-left: 1px solid ${borderColor(colorTheme, theme)};
      }
    `}

  ${({
    expandable,
    selected,
    highlighted,
    isExpanded,
    isInSidebar,
    isSubRow,
    isFirstSubRow,
    theme,
  }) => {
    const colorOfSelected = isInSidebar
      ? theme.flatTable.drawerSidebar.selected
      : theme.flatTable.selected;
    const colorOfHighlighted = isInSidebar
      ? theme.flatTable.drawerSidebar.highlighted
      : theme.flatTable.highlighted;

    return css`
      ${isInSidebar &&
      `
        ${StyledFlatTableHeader},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCell},
        ${StyledFlatTableCheckbox} {
          background-color: ${theme.flatTable.drawerSidebar.headerBackground};
        }

        td:first-of-type, th:first-of-type {
          border-left: none;
        }

        td:last-of-type {
          border-right: none;
        }

        ${StyledFlatTableCheckbox} {
          border-right: 1px solid ${colorOfHighlighted};
        }
        
        :hover {
          ${StyledFlatTableCell}, ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${theme.flatTable.drawerSidebar.hover};
          }
        }
      `}

      ${expandable &&
      css`
        ${StyledFlatTableCell}:first-child > div,
        ${StyledFlatTableRowHeader}:first-child > div,
        ${StyledFlatTableCheckbox} + ${StyledFlatTableCell} > div {
          padding-left: 4px;

          ${StyledIcon} {
            transition: transform 0.3s;
            ${!isExpanded &&
            css`
              transform: rotate(-90deg);
            `}
          }
        }
      `}

      ${isSubRow &&
      css`
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCheckbox} {
          background-color: ${theme.flatTable.subRow.background};
        }

        ${StyledFlatTableCell}:first-child > div,
        ${StyledFlatTableRowHeader}:first-child > div,
        ${StyledFlatTableCheckbox} + ${StyledFlatTableCell} > div {
          padding-left: 30px;
        }
      `}

      ${isFirstSubRow &&
      css`
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCheckbox} {
          box-shadow: inset 0 6px 4px -4px ${theme.flatTable.subRow.shadow};
        }
      `}

      ${highlighted &&
      css`
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCheckbox} {
          background-color: ${colorOfHighlighted};
        }

        :hover {
          ${StyledFlatTableCell},
          ${StyledFlatTableRowHeader},
          ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${colorOfHighlighted};
          }
        }
      `}

      ${selected &&
      `
        ${StyledFlatTableCell}, ${StyledFlatTableCheckbox} {
          background-color: ${colorOfSelected};
        }

        :hover {
          ${StyledFlatTableCell},
          ${StyledFlatTableRowHeader},
          ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${colorOfSelected};
          }
        }
      `}
    `;
  }}
`;

StyledFlatTableRow.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableRow;
