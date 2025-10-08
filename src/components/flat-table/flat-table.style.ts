import styled, { css } from "styled-components";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import { StyledFlatTableRowHeader } from "./flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableHead from "./flat-table-head/flat-table-head.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import cellSizes from "./cell-sizes.style";
import StyledBox from "../box/box.style";
import { StyledPagerContainer } from "../pager/pager.style";
import { FlatTableProps } from "./flat-table.component";
import { DrawerSidebarContextProps } from "../drawer/__internal__/drawer-sidebar.context";
import addFocusStyling from "../../style/utils/add-focus-styling";

const HEADER_OVERLAY_INCREMENT = 3;
const STICKY_FOOTER_OVERLAY_INCREMENT = 1;
const ROW_HEADER_OVERLAY_INCREMENT = 5;

const StyledTableContainer = styled.div<
  Pick<FlatTableProps, "width" | "overflowX">
>`
  ${({ width, overflowX }) =>
    width &&
    css`
      width: ${width};

      ${overflowX && `overflow-x: ${overflowX};`}
    `}

  :focus {
    outline: none;
  }
`;

const StyledFlatTable = styled.table<
  Pick<FlatTableProps, "caption" | "isZebra"> & {
    size: NonNullable<FlatTableProps["size"]>;
  }
>`
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

interface StyledFlatTableWrapperProps
  extends Pick<
      FlatTableProps,
      | "hasStickyFooter"
      | "colorTheme"
      | "hasStickyHead"
      | "footer"
      | "hasOuterVerticalBorders"
    >,
    Partial<DrawerSidebarContextProps> {
  hasHorizontalScrollbar: boolean;
  hasVerticalScrollbar: boolean;
  lastColRowSpanIndex: number;
  firstColRowSpanIndex: number;
  bottomBorderRadius: NonNullable<FlatTableProps["bottomBorderRadius"]>;
}

const StyledFlatTableWrapper = styled(StyledBox).attrs(
  applyBaseTheme,
)<StyledFlatTableWrapperProps>`
  border-top-left-radius: var(--borderRadius100);
  border-top-right-radius: var(--borderRadius100);

  ${({ hasOuterVerticalBorders }) =>
    !hasOuterVerticalBorders &&
    css`
      ${StyledFlatTableRow} {
        & > ${StyledFlatTableCell}:first-child {
          border-left-color: var(--colorsUtilityMajorTransparent);
        }
        & > ${StyledFlatTableCell}:last-child {
          border-right-color: var(--colorsUtilityMajorTransparent);
        }
      }
    `}

  ${({ hasStickyFooter, hasHorizontalScrollbar, bottomBorderRadius }) =>
    !hasStickyFooter &&
    !hasHorizontalScrollbar &&
    css`
      border-bottom-left-radius: var(--${bottomBorderRadius});
      border-bottom-right-radius: var(--${bottomBorderRadius});
    `}

  ${({ isInSidebar }) => css`
    box-sizing: border-box;

    :has(${StyledTableContainer}:focus-visible) {
      ${addFocusStyling()}
    }

    ${isInSidebar ? "min-width: fit-content;" : ""}
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

  tbody
    ${StyledFlatTableRowHeader}.bringToFront,
    ${StyledFlatTableCell}.bringToFront,
    tbody
    ${StyledFlatTableCheckbox}.bringToFront {
    z-index: ${({ theme }) => theme.zIndex.overlay + 5};
  }

  ${({ footer }) =>
    footer &&
    css`
    tr:last-child:focus {
      :after {
        border-bottom-left-radius: var(--borderRadius000);
        border-bottom-right-radius: var(--borderRadius000);
      }
  `}

  ${({
    footer,
    firstColRowSpanIndex,
    lastColRowSpanIndex,
    hasHorizontalScrollbar,
    hasVerticalScrollbar,
    bottomBorderRadius,
  }) =>
    !footer &&
    css`
      tbody {
        ${firstColRowSpanIndex >= 0 &&
        css`
          ${StyledFlatTableRow}:nth-of-type(${firstColRowSpanIndex + 1}) {
            th:first-child,
            td:first-child {
              border-bottom-left-radius: var(--borderRadius100);
            }
          }
        `}

        ${lastColRowSpanIndex >= 0 &&
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
          ${!hasHorizontalScrollbar &&
          firstColRowSpanIndex === -1 &&
          css`
            th:first-child,
            td:first-child {
              border-bottom-left-radius: var(--${bottomBorderRadius});
            }
          `}
          ${!hasVerticalScrollbar &&
          !hasHorizontalScrollbar &&
          lastColRowSpanIndex === -1 &&
          css`
            th:last-child,
            td:last-child {
              border-bottom-right-radius: var(--${bottomBorderRadius});
            }
          `}
        }
      }
    `}
`;

const StyledFlatTableFooter = styled.div.attrs(applyBaseTheme)<
  Pick<FlatTableProps, "hasStickyFooter">
>`
  & > ${StyledPagerContainer} {
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${({ hasStickyFooter, theme }) =>
    hasStickyFooter &&
    css`
      position: sticky;
      bottom: 0px;
      z-index: ${theme.zIndex.overlay + STICKY_FOOTER_OVERLAY_INCREMENT};

      ${StyledPagerContainer} {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}
`;

export {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledTableContainer,
};
