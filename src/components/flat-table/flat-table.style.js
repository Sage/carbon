import styled, { css } from "styled-components";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import { StyledFlatTableRowHeader } from "./flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableHead from "./flat-table-head/flat-table-head.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import { baseTheme } from "../../style/themes";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import cellSizes from "./cell-sizes.style";
import Box from "../box";
import { StyledPagerContainer } from "../pager/pager.style";

const HEADER_OVERLAY_INCREMENT = 3;
const STICKY_FOOTER_OVERLAY_INCREMENT = 1;
const ROW_HEADER_OVERLAY_INCREMENT = 5;

const StyledTableContainer = styled.div`
  ${({ width, overflowX }) =>
    width &&
    css`
      width: ${width};

      ${overflowX && `overflow-x: ${overflowX};`}
    `}
`;

const StyledFlatTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  @-moz-document url-prefix() {
    overflow: hidden;
    border-top-left-radius: var(--borderRadius100);
    border-top-right-radius: var(--borderRadius100);
  }

  ${({ caption }) =>
    caption &&
    css`
      caption {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        width: 1px;
        position: absolute;
        top: -99999px;
      }
    `}

  ${({ size }) => {
    const { height, fontSize, paddingSize } = cellSizes[size];

    return css`
      ${StyledFlatTableRow} {
        height: ${height};
      }

      ${StyledFlatTableCell} > div,
      ${StyledFlatTableHeader} > div,
      ${StyledFlatTableRowHeader} > div,
      ${StyledFlatTableCheckbox} > div {
        font-size: ${fontSize};
        padding-left: ${paddingSize};
        padding-right: ${paddingSize};
      }
    `;
  }}

  ${({ isZebra }) =>
    isZebra &&
    css`
      ${StyledFlatTableRow}:nth-child(2n) {
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCell},
        ${StyledFlatTableCheckbox} {
          background-color: var(--colorsUtilityMajor010);
        }
      }
      ${StyledFlatTableRow}:hover {
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCheckbox}:not(th) {
          background-color: var(--colorsUtilityMajor025);
        }
      }
    `}
`;

StyledFlatTable.defaultProps = {
  size: "medium",
};

const StyledFlatTableWrapper = styled(Box)`
  border-top-left-radius: var(--borderRadius100);
  border-top-right-radius: var(--borderRadius100);
  ${({ hasStickyFooter, hasHorizontalScrollbar }) =>
    !hasStickyFooter &&
    !hasHorizontalScrollbar &&
    css`
      border-bottom-left-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius100);
    `}

  ${({ isInSidebar }) =>
    css`
      box-sizing: border-box;

      :focus {
        outline: 2px solid var(--colorsSemanticFocus500);

        :not(:focus-visible) {
          outline: none;
        }

        :focus-visible {
          outline: 2px solid var(--colorsSemanticFocus500);
        }
      }

      ${isInSidebar
        ? "min-width: fit-content"
        : `box-shadow: inset 0px 0px 0px 1px var(--colorsUtilityMajor100)`};
    `}

  ${({ colorTheme }) => {
    switch (colorTheme) {
      case "light":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: var(--colorsUtilityMajor100);
            border-right: 1px solid var(--colorsUtilityMajor150);
            border-bottom-color: var(--colorsUtilityMajor150);
          }
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
            background-color: var(--colorsUtilityMajor100);
            border-bottom-color: var(--colorsUtilityMajor150);
            border-right-color: var(--colorsUtilityMajor150);
            border-left-color: var(--colorsUtilityMajor150);
          }
        `;

      case "transparent-base":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: var(--colorsUtilityMajor025);
            border-right: 1px solid var(--colorsUtilityMajor025);
            border-bottom-color: var(--colorsUtilityMajor100);
          }
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
            background-color: var(--colorsUtilityMajor025);
            border-bottom-color: var(--colorsUtilityMajor100);
            border-right-color: var(--colorsUtilityMajor025);
            border-left-color: var(--colorsUtilityMajor025);
          }
        `;

      case "transparent-white":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: var(--colorsUtilityYang100);
            border-right: 1px solid var(--colorsUtilityYang100);
            border-bottom-color: var(--colorsUtilityMajor100);
          }
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
            background-color: var(--colorsUtilityYang100);
            border-bottom-color: var(--colorsUtilityMajor100);
            border-right-color: var(--colorsUtilityYang100);
            border-left-color: var(--colorsUtilityYang100);
          }
        `;
      // default theme is "dark"
      default:
        return css`
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox},
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} {
            background-color: var(--colorsUtilityMajor400);
            border-right: 1px solid var(--colorsUtilityMajor300);
            color: var(--colorsUtilityYang100);
            border-bottom-color: var(--colorsUtilityMajor300);
          }
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
            background-color: var(--colorsUtilityMajor400);
            color: var(--colorsUtilityYang100);
            border-bottom-color: var(--colorsUtilityMajor300);
            border-right-color: var(--colorsUtilityMajor300);
            border-left-color: var(--colorsUtilityMajor300);
          }
        `;
    }
  }}

  ${({ isInSidebar }) =>
    isInSidebar &&
    css`
      ${StyledFlatTableHead} {
        background-color: var(--colorsUtilityMajor040);
      }
      ${StyledFlatTableHeader}, ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
      ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
        background-color: var(--colorsUtilityMajor040);
        border-right: 2px solid var(--colorsUtilityMajor040);
        color: var(--colorsUtilityYin090);
        border-bottom-color: var(--colorsUtilityMajor100);
      }
    `}

  ${({ hasStickyHead, theme }) =>
    hasStickyHead &&
    css`
      ${StyledFlatTableHead} {
        position: sticky;
        top: 0;
        left: 0;
        z-index: ${theme.zIndex.overlay + ROW_HEADER_OVERLAY_INCREMENT};
      }
    `}

  ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
  ${StyledFlatTableHeader}.isSticky,
  ${StyledFlatTableHead} ${StyledFlatTableCheckbox}.isSticky {
    z-index: ${({ theme }) =>
      theme.zIndex.overlay + ROW_HEADER_OVERLAY_INCREMENT};
  }

  thead ${StyledFlatTableHeader}.isSticky, ${StyledFlatTableCheckbox}.isSticky {
    border-right: none;
  }

  ${StyledFlatTableHeader}, ${StyledFlatTableCheckbox} {
    z-index: ${({ theme }) => theme.zIndex.overlay + HEADER_OVERLAY_INCREMENT};
  }

  thead {
    ${StyledFlatTableRow}:first-of-type {
      th:first-of-type {
        border-top-left-radius: var(--borderRadius100);
      }
      ${({ hasVerticalScrollbar }) =>
        !hasVerticalScrollbar &&
        css`
          th:last-of-type {
            border-top-right-radius: var(--borderRadius100);
          }
        `}
    }
  }

  tbody
    ${StyledFlatTableRowHeader},
    ${StyledFlatTableCell}.isSticky,
    tbody
    ${StyledFlatTableCheckbox}.isSticky {
    z-index: ${({ theme }) => theme.zIndex.overlay};
  }

  ${({ hasFooter }) =>
    hasFooter &&
    css`
    tr:last-child:focus {
      :after {
        border-bottom-left-radius: var(--borderRadius000);
        border-bottom-right-radius: var(--borderRadius000);
      }
  `}

  ${({ hasFooter }) =>
    !hasFooter &&
    css`
      tbody {
        ${({ firstColRowSpanIndex }) =>
          firstColRowSpanIndex >= 0 &&
          css`
            ${StyledFlatTableRow}:nth-of-type(${firstColRowSpanIndex + 1}) {
              th:first-child,
              td:first-child {
                border-bottom-left-radius: var(--borderRadius100);
              }
            }
          `}

        ${({ lastColRowSpanIndex, hasHorizontalScrollbar }) =>
          lastColRowSpanIndex >= 0 &&
          !hasHorizontalScrollbar &&
          css`
            ${StyledFlatTableRow}:nth-of-type(${lastColRowSpanIndex + 1}) {
              th:last-child,
              td:last-child {
                border-bottom-right-radius: var(--borderRadius100);
              }
            }
          `}

        ${StyledFlatTableRow}:last-of-type {
          ${({ hasHorizontalScrollbar, firstColRowSpanIndex }) =>
            !hasHorizontalScrollbar &&
            firstColRowSpanIndex === -1 &&
            css`
              th:first-child,
              td:first-child {
                border-bottom-left-radius: var(--borderRadius100);
              }
            `}
          ${({
            hasVerticalScrollbar,
            hasHorizontalScrollbar,
            lastColRowSpanIndex,
          }) =>
            !hasVerticalScrollbar &&
            !hasHorizontalScrollbar &&
            lastColRowSpanIndex === -1 &&
            css`
              th:last-child,
              td:last-child {
                border-bottom-right-radius: var(--borderRadius100);
              }
            `}
        }
      }
    `}
`;

StyledFlatTableWrapper.defaultProps = {
  theme: baseTheme,
};

const StyledFlatTableFooter = styled.div`
  ${({ hasStickyFooter, theme }) =>
    hasStickyFooter &&
    css`
      position: sticky;
      bottom: 0px;
      z-index: ${theme.zIndex.overlay + STICKY_FOOTER_OVERLAY_INCREMENT};

      ${StyledPagerContainer} {
        border-bottom-left-radius: var(--borderRadius000);
        border-bottom-right-radius: var(--borderRadius000);
      }
    `}
`;

StyledFlatTableFooter.defaultProps = {
  theme: baseTheme,
};

export {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledTableContainer,
};
