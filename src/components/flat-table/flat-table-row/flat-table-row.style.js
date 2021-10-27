import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import StyledFlatTableHeader from "../flat-table-header/flat-table-header.style";
import StyledIcon from "../../icon/icon.style";
import { toColor } from "../../../style/utils/color";

const horizontalBorderSizes = {
  medium: "2px",
  large: "4px",
};

const stickyColumnFocusStyling = (index, theme) => {
  return `
    border-bottom: 1px solid transparent;
    border-left: 1px solid
      ${index === 0 ? theme.colors.focus : theme.table.secondary};
    background-clip: padding-box;
    z-index: ${theme.zIndex.overlay + 2};

    :before {
      content: "";
      border-top: 2px solid ${theme.colors.focus};
      border-bottom: 2px solid ${theme.colors.focus};
      display: block;
      left: 0px;
      top: -1px;
      height: calc(100% - 1px);
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
  ${({
    bgColor,
    horizontalBorderColor,
    horizontalBorderSize,
    stickyOffset,
    isRowInteractive,
    isFirstColumnInteractive,
    rowHeaderIndex,
    firstCellIndex,
    colorTheme,
    expandable,
    selected,
    highlighted,
    isExpanded,
    isInSidebar,
    isSubRow,
    isFirstSubRow,
    size,
    theme,
    applyBorderLeft,
    isDragging,
    draggable,
  }) => {
    const backgroundColor = bgColor ? toColor(theme, bgColor) : undefined;
    const customBorderColor = horizontalBorderColor
      ? toColor(theme, horizontalBorderColor)
      : undefined;
    const colorOfSelected = isInSidebar
      ? theme.flatTable.drawerSidebar.selected
      : theme.flatTable.selected;
    const colorOfHighlighted = isInSidebar
      ? theme.flatTable.drawerSidebar.highlighted
      : theme.flatTable.highlighted;
    const allCellTypes = `${StyledFlatTableRowHeader}, ${StyledFlatTableCell}, ${StyledFlatTableCheckbox}`;

    return css`
      border-collapse: separate;
      border-radius: 0px;
      border-spacing: 0;
      min-width: 100%;
      table-layout: fixed;
      width: auto;
      outline: 2px solid #0000;

      ${allCellTypes} {
        ${backgroundColor && `background-color: ${backgroundColor};`}

        ${horizontalBorderSize !== "small" &&
        css`
          border-bottom: ${horizontalBorderSizes[horizontalBorderSize]} solid
            ${theme.table.secondary};
        `}

        ${customBorderColor &&
        css`
          border-bottom-color: ${customBorderColor};
        `}
      }

      ${StyledFlatTableHeader} {
        border-bottom: 1px solid ${borderColor(colorTheme, theme)};

        ${!isInSidebar &&
        `
          :first-child {
            border-left: 1px solid ${borderColor(colorTheme, theme)};
          }
        `}
      }

      ${stickyOffset > 0 &&
      css`
        && th {
          top: ${stickyOffset}px;
        }
      `}

      ${isRowInteractive &&
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
          ${allCellTypes} {
            background-color: ${backgroundColor || theme.flatTable.hover};
          }
        }
      `}

      ${isFirstColumnInteractive &&
      css`
        td:nth-child(${firstCellIndex + 1}),
        th:nth-child(${firstCellIndex + 1}) {
          cursor: pointer;

          :focus {
            outline: 2px solid ${theme.colors.focus};
            outline-offset: -1px;
          }

          :hover {
            background-color: ${backgroundColor || theme.flatTable.hover};
          }
        }
      `}

      ${![-1, 0].includes(rowHeaderIndex) &&
      css`
        td:nth-of-type(${rowHeaderIndex + 1}) {
          border-left: 1px solid ${customBorderColor || theme.table.secondary};
        }

        th:nth-of-type(${rowHeaderIndex + 2}) {
          border-left: 1px solid
            ${customBorderColor || borderColor(colorTheme, theme)};
        }
      `}

      ${applyBorderLeft &&
      css`
        th:first-of-type {
          border-left: 1px solid
            ${customBorderColor || borderColor(colorTheme, theme)};
        }
      `}

      ${isInSidebar &&
      css`
        ${allCellTypes} {
          background-color: ${
            bgColor || theme.flatTable.drawerSidebar.headerBackground
          };
          };
        }

        ${StyledFlatTableHeader} {
          background-color: ${theme.flatTable.drawerSidebar.headerBackground};
          border-bottom-color: ${theme.table.secondary};
        }

        td:first-of-type,
        th:first-of-type {
          border-left: none;
        }

        td:last-of-type {
          border-right: none;
        }

        ${StyledFlatTableCheckbox} {
          border-right: 1px solid ${colorOfHighlighted};
        }

        ${
          isRowInteractive &&
          css`
            :hover {
              ${StyledFlatTableCell},
              ${StyledFlatTableCheckbox}:not(th) {
                background-color: ${backgroundColor ||
                theme.flatTable.drawerSidebar.hover};
              }
            }
          `
        }
      `}

      ${expandable &&
      css`
        ${StyledFlatTableCell}:first-child > div,
        ${StyledFlatTableRowHeader}:first-child > div,
        ${StyledFlatTableCheckbox} + ${StyledFlatTableCell} > div {
          ${StyledIcon}[type="chevron_down_thick"]:first-of-type {
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
        ${allCellTypes} {
          background-color: ${backgroundColor ||
          theme.flatTable.subRow.background};
        }

        ${StyledFlatTableCell}:first-child > div,
        ${StyledFlatTableRowHeader}:first-child > div,
        ${StyledFlatTableCheckbox} + ${StyledFlatTableCell} > div {
          padding-left: ${size === "compact" ? "32px" : "40px"};
        }
      `}

      ${isDragging &&
      css`
        border: ${isInSidebar
            ? theme.palette.slateTint(40)
            : theme.palette.slateTint(55)}
          2px solid;
        cursor: grabbing;
        ${allCellTypes} {
          background-color: ${isInSidebar
            ? theme.palette.slateTint(60)
            : theme.palette.slateTint(75)};
        }
      `}

      ${draggable &&
      css`
        ${StyledIcon}:first-of-type {
          font-size: 16px;
        }
      `}

      ${isFirstSubRow &&
      css`
        ${allCellTypes} {
          box-shadow: inset 0 6px 4px -4px ${theme.flatTable.subRow.shadow};
        }
      `}

      ${highlighted &&
      css`
        ${allCellTypes} {
          background-color: ${backgroundColor || colorOfHighlighted};
        }

        :hover {
          ${StyledFlatTableCell},
          ${StyledFlatTableRowHeader},
          ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${backgroundColor || colorOfHighlighted};
          }
        }
      `}

      ${selected &&
      css`
        ${StyledFlatTableCell},
        ${StyledFlatTableCheckbox} {
          background-color: ${backgroundColor || colorOfSelected};
        }

        :hover {
          ${StyledFlatTableCell},
          ${StyledFlatTableRowHeader},
          ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${backgroundColor || colorOfSelected};
          }
        }
      `}
    `;
  }}
`;

StyledFlatTableRow.defaultProps = {
  theme: baseTheme,
  horizontalBorderSize: "small",
};

export default StyledFlatTableRow;
