import styled, { css } from "styled-components";
import { TableContextProps } from "./__internal__/contexts";
import { BorderThickness } from "./table.component";
import borderThicknessStyles from "./__internal__/config";

interface StyledTableWrapperProps {
  $maxWidth?: string;
}

const StyledTableWrapper = styled.div<StyledTableWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  ${({ $maxWidth }) => $maxWidth && css`
    max-width: ${$maxWidth};
  `}
`;

interface InnerWrapperProps {
  $variant: TableContextProps["variant"];
  $hasPagination: boolean;
  $showOuterBorder?: boolean;
}

const StyledInnerWrapper = styled.div<InnerWrapperProps & StyledTableWrapperProps>`
  --table-outer-border-color: ${({ $variant }) =>
    $variant === "prominent"
      ? "var(--table-header-harsh-border-default)"
      : "var(--table-row-border-default)"
  };
  > div {
    display: flex;
    flex-direction: column;
  }
  border-radius: var(--global-radius-container-m);
  overflow: clip;
  isolation: isolate;
  width: auto;
  height: auto;
  position: relative;

  ${({ $maxWidth }) => $maxWidth && css`
    max-width: ${$maxWidth};
    > div {
      max-width: ${$maxWidth};
      overflow-x: auto;
      overflow-y: hidden;
      overscroll-behavior-x: none;
    }
  `}

  ${({ $showOuterBorder, $variant }) =>
    $showOuterBorder &&
    $variant === "prominent" &&
    css`
      border: var(--global-borderwidth-xs) solid var(--table-outer-border-color);
    `}

  ${({ $showOuterBorder, $variant }) =>
    $showOuterBorder &&
    $variant !== "prominent" &&
    css`
      > div {
        /* Straight side borders below the header */
        > table > :is(tbody, tfoot) > tr > td:first-child {
          border-inline-start: var(--global-borderwidth-xs) solid var(--table-outer-border-color);
        }

        > table > :is(tbody, tfoot) > tr > td:last-child {
          border-inline-end: var(--global-borderwidth-xs) solid var(--table-outer-border-color);
        }

        > table > :is(thead) > tr > td:first-child {
          border-inline-start: var(--global-borderwidth-xs) solid var(--table-outer-border-color);
        }

        > table > :is(thead) > tr > td:last-child {
          border-inline-end: var(--global-borderwidth-xs) solid transparent;
        }

        /*
        * Draw both bottom corners and the bottom edge as one shape.
        * The short side sections overlap the cell borders, hiding the join.
        */
        &::after {
          content: "";
          position: absolute;
          inset-inline: 0;
          inset-block-end: 0;
          height: calc(
            var(--global-radius-container-m) + var(--global-borderwidth-xs) + 8px
          );
          box-sizing: border-box;
          z-index: 20;
          pointer-events: none;

          border-inline: var(--global-borderwidth-xs) solid var(--table-outer-border-color);
          border-block-end: var(--global-borderwidth-xs) solid var(--table-outer-border-color);

          border-end-start-radius: var(--global-radius-container-m);
          border-end-end-radius: var(--global-radius-container-m);
        }
      }
    `}

  ${({ $hasPagination }) => $hasPagination && css`
    margin-bottom: var(--global-space-comp-m);
  `}
`;

interface StyledTableProps {
  $align?: "left" | "center" | "right";
  $isZebraStriped?: boolean;
  $hasOverflow?: boolean;
  $variant: TableContextProps["variant"];
  $horizontalBorderThickness: BorderThickness;
  $verticalBorderThickness: BorderThickness;
}

const StyledTable = styled.table<StyledTableProps>`
  /* Border defaults — override via borderWidth props on Table rows and cells */
  --table-cell-border-horizontal-width: ${({
    $horizontalBorderThickness
  }) => borderThicknessStyles[$horizontalBorderThickness]};
  --table-cell-border-vertical-width: ${({
    $verticalBorderThickness
  }) => borderThicknessStyles[$verticalBorderThickness]};
  --table-header-border-color: ${({ $variant }) =>
    $variant === "prominent"
      ? "var(--table-header-harsh-border-default)"
      : "var(--table-header-subtle-border-default)"};

  border-spacing: 0;
  border-collapse: separate;

  ${({ $align }) => $align && css`
    & th > div,
    & td > div {
      text-align: ${$align};
    }
  `}

  &[data-has-first-column="true"] {
    && {
      th:first-child,
      td:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
        box-shadow: none;

        &::after {
          content: "";
          position: absolute;
          top: 0px;
          bottom: 0px;
          right: 0px;
          width: 4px;
          z-index: 2;
          pointer-events: none;
          box-shadow: var(--global-depth-sticky-l);
        }
      }

        /* First logical column is occupied by the first row's rowspan */
        thead
          > tr:first-child:has(> th:first-child[rowspan]:not([rowspan="1"]))
          ~ tr
          > th:first-child {
          position: relative;
          left: auto;
          z-index: auto;

          &::after {
            content: none;
          }
        }

      thead th:first-child[rowspan]:not([rowspan="1"]) {
        border-right: var(--table-cell-border-vertical-width) solid var(--table-header-border-color);
      }

      tr:has(> th:first-child[rowspan]):not([rowspan="1"]) + tr > th:first-child {
        position: relative;
        box-shadow: none;
        z-index: unset;
      }
    }
  }

  &[data-has-last-column="true"] {
    th:nth-last-child(2),
    td:nth-last-child(2) {
      border-right: none;
    }

    && {
      th:last-child,
      td:last-child {
        position: sticky;
        right: 0;
        z-index: 1;
        border-left: var(--table-cell-border-vertical-width) solid var(--table-row-border-default);
        box-shadow: none;

        &::after {
          content: "";
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          width: 4px;
          z-index: 2;
          pointer-events: none;
          box-shadow: var(--global-depth-sticky-r);
        }
      }

      tr:has(> th:last-child[rowspan]:not([rowspan="1"])) + tr > th:last-child {
        position: relative;
        box-shadow: none;
        z-index: unset;
        border-right: none;
      }

      /* Last logical column is occupied by the first row's rowspan */
      thead
        > tr:first-child:has(> th:last-child[rowspan]:not([rowspan="1"]))
        ~ tr
        > th:last-child {
        position: relative;
        right: auto;
        z-index: auto;
        border-left: none;

        &::after {
          content: none;
        }
      }
    }
  }

  && tbody tr[data-is-dragging="true"] > th:first-child,
  && tbody tr[data-is-dragging="true"] > td:first-child,
  && tbody tr[data-is-dragging="true"] > th:last-child,
  && tbody tr[data-is-dragging="true"] > td:last-child {
    content: none;
  }

  tbody {
    tr {
      td:not(:last-child) {
        border-right: var(--table-cell-border-vertical-width) solid var(--table-row-border-default);
      }
    }

    tr:not(:last-child):not(:last-child) {
      td {
        border-bottom: var(--table-cell-border-horizontal-width) solid var(--table-row-border-default);
      }
    }
  }

  &:not(:has(> tfoot))
  > tbody:last-of-type
  > tr:last-child
  > :is(th, td) {
    border-bottom: var(--global-borderwidth-xs) solid var(--table-row-border-default);
  }

  &:not(:has(> thead))
  > tbody:first-of-type
  > tr:first-child
  > :is(th, td) {
    border-top: var(--global-borderwidth-xs) solid var(--table-row-border-default);
  }

  & thead {
    tr:last-child th {
      border-bottom: var(--global-borderwidth-xs) solid var(--table-row-border-default);
    }
  }

  & tfoot {
    td {
      background-color: var(--table-footer-bg-default);

      &:not(:last-child) {
        border-right: var(--table-cell-border-vertical-width) solid var(--table-row-border-default);
      }
    }

    tr:first-child td {
      border-top: var(--global-borderwidth-xs) solid var(--table-row-border-default);
    }
  }

  & thead {
    tr {
      th {
        &:not(:last-child) {
          border-right: var(--table-cell-border-vertical-width) solid var(--table-header-border-color);
        }
      }
    }

    /* Add border-right if row above has rowspan on the last column */
    tr:has(> th:last-child[rowspan]:not([rowspan="1"])) + tr > th:last-child {
      border-right: var(--table-cell-border-vertical-width) solid
        var(--table-header-border-color);
    }

    ${({ $variant }) => css`
      ${$variant !== "prominent" && css`
        /* The spanning cell should not draw one continuous divider. */
        tr > th:first-child[rowspan]:not([rowspan="1"]) {
          border-right-color: transparent;
        }

        /* Cells that need to paint the replacement divider. */
        tr > th:first-child[rowspan]:not([rowspan="1"]) + th,
        tr:has(> th:first-child[rowspan]:not([rowspan="1"])) + tr > th:first-child {
          position: relative;
          border-left-color: transparent;
        }

        tr > th:first-child[rowspan]:not([rowspan="1"]) + th::before,
        tr:has(> th:first-child[rowspan]:not([rowspan="1"])) + tr > th:first-child::before {
          content: "";
          position: absolute;
          inset-block: 0;
          inset-inline-start: 0;
          width: var(--table-cell-border-vertical-width);
          background-color: var(--table-header-border-color);
          pointer-events: none;
          left: -1px;
          top: 0px;
          bottom: -1px;
        }
      `}

      ${$variant === "prominent" && css`
        /* tr:first-child th {
          border-top: var(--global-borderwidth-xs) solid var(--table-header-border-color);
        }

        tr:first-child > th:first-child {
          border-left: var(--global-borderwidth-xs) solid var(--table-header-border-color);
        }

        tr:first-child > th:last-child {
          border-right: var(--global-borderwidth-xs) solid var(--table-header-border-color);
        } */

        tr:last-child > th {
          border-bottom: var(--table-cell-border-horizontal-width) solid var(--table-header-border-color);
        }
      `}
    `}
  }

  &[data-has-sticky-header="true"] {
    thead tr {
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }

  &[data-has-sticky-footer="true"] {
    tfoot tr {
      position: sticky;
      bottom: 0;
      z-index: 10;
    }
  }

  & tbody {
    tr[data-is-selected="false"] td {
      background-color: var(--table-row-bg-default);
    }

    ${({ $isZebraStriped }) => $isZebraStriped && css`
      tr:nth-child(even of :not([data-component*="sub-row"])):not([data-is-selected="true"]) td {
        background-color: var(--table-row-bg-alt);
      }
    `}
  }
`;

export { StyledTableWrapper, StyledTable, StyledInnerWrapper };
