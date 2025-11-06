import styled, { css } from "styled-components";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import StyledFlatTableHeader from "../flat-table-header/flat-table-header.style";
import StyledIcon from "../../icon/icon.style";
import { toColor } from "../../../style/utils/color";
import type { ThemeObject } from "../../../style/themes/theme.types";
import { FlatTableProps } from "..";
import { FlatTableRowProps } from "./flat-table-row.component";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { getNavigator } from "../../../__internal__/dom/globals";
import { isSafari } from "../../../__internal__/utils/helpers/browser-type-check";

const horizontalBorderSizes = {
  medium: "2px",
  large: "4px",
};

const newFocusStyling = (theme: ThemeObject) => {
  return `
    ${addFocusStyling(true)}
    z-index: ${theme.zIndex.overlay + 5};
  `;
};

const getLeftStickyStyling = (index: number, themeOptOut: boolean) =>
  index === 0 &&
  /* istanbul ignore next */
  themeOptOut &&
  /* istanbul ignore next */
  css`
    &:first-of-type::before {
      border-left: 3px solid var(--colorsSemanticFocus500);
    }
  `;

const getRightStickyStyling = (
  index: number,
  totalChildren: number,
  themeOptOut: boolean,
) =>
  index === totalChildren - 1 &&
  /* istanbul ignore next */
  themeOptOut &&
  /* istanbul ignore next */
  css`
    &:last-of-type {
      border-right: 2px solid var(--colorsSemanticFocus500);
    }
  `;

const stickyColumnFocusStyling = (theme: ThemeObject) => `
      width: calc(100% + 1px);
      z-index: ${theme.zIndex.overlay};
      :before {
        content: "";
        border-top: 2px solid var(--colorsSemanticFocus500);
        border-bottom: 2px solid var(--colorsSemanticFocus500);
        display: block;
        left: -2px;
        top: 0px;
        height: calc(100% - 3px);
        width: 103%;
        position: absolute;
        z-index: ${theme.zIndex.overlay};
      }
    }
  `;

const borderColor = (colorTheme: FlatTableProps["colorTheme"]) => {
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

const verticalBorderColor = (colorTheme: FlatTableProps["colorTheme"]) => {
  switch (colorTheme) {
    case "transparent-base":
      return "var(--colorsUtilityMajor025)";

    case "transparent-white":
      return "var(--colorsUtilityYang100)";

    // default theme is "dark"
    default:
      return "var(--colorsUtilityMajor100)";
  }
};

interface StyledFlatTableRowProps
  extends Pick<
    FlatTableRowProps,
    | "bgColor"
    | "horizontalBorderColor"
    | "expandable"
    | "selected"
    | "highlighted"
  > {
  isRowInteractive?: boolean;
  isFirstColumnInteractive?: boolean;
  lhsRowHeaderIndex: number;
  rhsRowHeaderIndex: number;
  totalChildren: number;
  firstCellIndex: number;
  colorTheme: FlatTableProps["colorTheme"];
  isExpanded?: boolean;
  isInSidebar?: boolean;
  size: FlatTableProps["size"];
  isDragging?: boolean;
  draggable?: boolean;
  horizontalBorderSize: NonNullable<FlatTableRowProps["horizontalBorderSize"]>;
  isSubRow?: boolean;
  isFirstSubRow?: boolean;
  stickyOffset?: number;
  rowHeight?: number;
}

const StyledFlatTableRow = styled.tr.attrs(
  applyBaseTheme,
)<StyledFlatTableRowProps>`
  ${({
    bgColor,
    horizontalBorderColor,
    horizontalBorderSize,
    stickyOffset,
    isRowInteractive,
    isFirstColumnInteractive,
    lhsRowHeaderIndex,
    rhsRowHeaderIndex,
    totalChildren,
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
    isDragging,
    draggable,
    rowHeight,
  }) => {
    const nav = getNavigator();
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

      :focus-visible {
        outline: none;
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

      ${StyledFlatTableRowHeader} + td {
        border-left: none;
      }

      ${lhsRowHeaderIndex !== -1 &&
      css`
        ${StyledFlatTableRowHeader}:nth-child(${lhsRowHeaderIndex + 1}) {
          border-right: 2px solid ${verticalBorderColor(colorTheme)};
        }
      `}

      ${rhsRowHeaderIndex !== -1 &&
      css`
        ${StyledFlatTableRowHeader}:nth-child(${rhsRowHeaderIndex + 1}) {
          border-left: 2px solid ${verticalBorderColor(colorTheme)};
        }
        ${StyledFlatTableHeader}:nth-child(${rhsRowHeaderIndex}) {
          border-right: none;
        }
      `}

      ${rhsRowHeaderIndex === totalChildren - 1 &&
      css`
        td:last-of-type {
          border-right: none;
        }
      `}

      ${StyledFlatTableHeader} {
        border-bottom: 1px solid ${borderColor(colorTheme)};

        ${horizontalBorderSize !== "small" &&
        css`
          border-bottom: ${horizontalBorderSizes[horizontalBorderSize]} solid
            var(--colorsUtilityMajor100);
        `}

        ${!isInSidebar &&
        !colorTheme?.includes("transparent") &&
        `
          :first-child {
            border-left: 1px solid ${borderColor(colorTheme)};
          }
        `}
      }

      ${stickyOffset !== undefined &&
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
            top: 0;
            bottom: 0px;
            ${newFocusStyling(theme)}
            pointer-events: none;
          }

          :last-child {
            :after {
              border-bottom-left-radius: var(--borderRadius100);
              border-bottom-right-radius: var(--borderRadius100);
            }
          }

          :first-child {
            :after {
              top: 0px;
            }
          }

          /* Styling for safari. Position relative does not work on tr elements on Safari  */
          // FIXME: this can cause hydration mismatches during SSR.
          ${nav &&
          isSafari(nav) &&
          css`
            position: -webkit-sticky;
            :after {
              border: none;
              content: "";
              height: ${rowHeight}px;
              ${newFocusStyling(theme)}
            }
          `}

          ${StyledFlatTableRowHeader} {
            ${getLeftStickyStyling(lhsRowHeaderIndex, theme)}
            ${getRightStickyStyling(rhsRowHeaderIndex, totalChildren, theme)}
            ${stickyColumnFocusStyling(theme)}
          }

          ${![-1, 0].includes(lhsRowHeaderIndex) &&
          css`
            ${Array.from({ length: lhsRowHeaderIndex }).map((_, index) => {
              return `
                td:nth-of-type(${index + 1}) {
                  ${stickyColumnFocusStyling(theme)}
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
            ${newFocusStyling(theme)}
          }

          :hover {
            background-color: ${backgroundColor ||
            "var(colorsUtilityMajor025)"};
          }
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
          font-size: 20px;
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

export default StyledFlatTableRow;
