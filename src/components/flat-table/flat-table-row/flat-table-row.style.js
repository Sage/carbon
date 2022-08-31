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
      ${
        index === 0
          ? "var(--colorsSemanticFocus500)"
          : "var(--colorsUtilityMajor100)"
      };
    background-clip: padding-box;
    z-index: ${theme.zIndex.overlay + 2};

    :before {
      content: "";
      border-top: 2px solid var(--colorsSemanticFocus500);
      border-bottom: 2px solid var(--colorsSemanticFocus500);
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

const borderColor = (colorTheme) => {
  switch (colorTheme) {
    case "light":
      return "var(--colorsUtilityMajor100)";

    case "transparent-base":
      return "var(--colorsUtilityMajor025)";

    case "transparent-white":
      return "var(--colorsUtilityYang100)";

    // default theme is "dark"
    default:
      return "var(--colorsUtilityMajor400)";
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
      ? "var(--colorsUtilityMajor150)"
      : "var(--colorsUtilityMajor075)";
    const colorOfHighlighted = isInSidebar
      ? "var(--colorsUtilityMajor100)"
      : "var(--colorsUtilityMajor050)";
    const allCellTypes = `${StyledFlatTableRowHeader}, ${StyledFlatTableCell}, ${StyledFlatTableCheckbox}`;

    return css`
      border-collapse: separate;
      border-radius: 0px;
      border-spacing: 0;
      min-width: 100%;
      table-layout: fixed;
      width: auto;
      outline: 2px solid #0000;

      [data-component="icon"]:not([color]) {
        color: var(--colorsActionMinor500);
      }

      ${allCellTypes} {
        ${backgroundColor && `background-color: ${backgroundColor};`}

        ${horizontalBorderSize !== "small" &&
        css`
          border-bottom: ${horizontalBorderSizes[horizontalBorderSize]} solid
            var(--colorsUtilityMajor100);
        `}

        ${customBorderColor &&
        css`
          border-bottom-color: ${customBorderColor};
        `}
      }

      ${StyledFlatTableHeader} {
        border-bottom: 1px solid ${borderColor(colorTheme)};

        ${!isInSidebar &&
        `
          :first-child {
            border-left: 1px solid ${borderColor(colorTheme)};
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
          position: relative;

          :after {
            content: "";
            box-sizing: border-box;
            position: absolute;
            left: 0px;
            right: 0px;
            top: -1px;
            bottom: 0px;
            border: 2px solid var(--colorsSemanticFocus500);
            pointer-events: none;
          }

          :first-child {
            :after {
              top: 0px;
            }
          }
          /* Styling for safari. Position relative does not work on tr elements on Safari  */
          @media not all and (min-resolution: 0.001dpcm) {
            @supports (-webkit-appearance: none) and (stroke-color: transparent) {
              outline: 2px solid var(--colorsSemanticFocus500);
              outline-offset: -1px;
              position: static;
              :after {
                content: none;
                border: none;
              }
            }
          }

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
            background-color: ${backgroundColor ||
            "var(--colorsUtilityMajor025)"};
          }
        }
      `}

      ${isFirstColumnInteractive &&
      css`
        td:nth-child(${firstCellIndex + 1}),
        th:nth-child(${firstCellIndex + 1}) {
          cursor: pointer;

          :focus {
            outline: 2px solid var(--colorsSemanticFocus500);
            outline-offset: -1px;
          }

          :hover {
            background-color: ${backgroundColor ||
            "var(colorsUtilityMajor025)"};
          }
        }
      `}

      ${![-1, 0].includes(rowHeaderIndex) &&
      css`
        td:nth-of-type(${rowHeaderIndex + 1}) {
          border-left: 1px solid
            ${customBorderColor || "var(--colorsUtilityMajor100)"};
        }

        th:nth-of-type(${rowHeaderIndex + 2}) {
          border-left: 1px solid ${customBorderColor || borderColor(colorTheme)};
        }
      `}

      ${applyBorderLeft &&
      css`
        th:first-of-type {
          border-left: 1px solid ${customBorderColor || borderColor(colorTheme)};
        }
      `}

      ${isInSidebar &&
      css`
        ${allCellTypes} {
          background-color: ${bgColor || "var(--colorsUtilityMajor040)"};
          };
        }

        ${StyledFlatTableHeader} {
          background-color: var(--colorsUtilityMajor040);
          border-bottom-color: var(--colorsUtilityMajor100);
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
                "var(--colorsUtilityMajor075)"};
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
          background-color: ${backgroundColor || "var(--colorsActionMinor025)"};
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
            ? "var(--colorsUtilityMajor300)"
            : "var(--colorsUtilityMajor200)"}
          2px solid;
        ${allCellTypes} {
          background-color: ${isInSidebar
            ? "var(--colorsUtilityMajor200)"
            : "var(--colorsUtilityMajor150)"};
        }
      `}

      ${draggable &&
      css`
        ${StyledIcon}:first-of-type {
          font-size: 16px;
          color: var(--colorsActionMinor500);
        }
      `}

      ${isFirstSubRow &&
      css`
        ${allCellTypes} {
          box-shadow: var(--boxShadow075);
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
