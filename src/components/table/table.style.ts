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
    overflow-x: auto;
    overflow-y: hidden;
  `}
`;

interface StyledTableProps {
  $align?: "left" | "center" | "right";
  $isZebraStriped?: boolean;
  $hasOverflow?: boolean;
  $variant: TableContextProps["variant"];
  $removeOuterBorders: boolean;
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
        box-shadow: 2px 0 2px 0 var(--mode-color-generic-depth-faint);
      }

      thead th:first-child[rowspan]:not([rowspan="1"]) {
        border-right: var(--table-cell-border-vertical-width) solid var(--table-header-border-color);
      }

      tr:has(> th:first-child[rowspan]) + tr > th:first-child {
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
        box-shadow: -2px 0 2px 0 var(--mode-color-generic-depth-faint);
      }

      tr:has(> th:last-child[rowspan]) + tr > th:last-child {
        position: relative;
        box-shadow: none;
        z-index: unset;
        border-right: none;
      }
    }
  }

  && tbody tr[data-is-dragging="true"] > th:first-child,
  && tbody tr[data-is-dragging="true"] > td:first-child,
  && tbody tr[data-is-dragging="true"] > th:last-child,
  && tbody tr[data-is-dragging="true"] > td:last-child {
    box-shadow: none;
  }

  & tbody {
    tr {
      ${({ $variant }) => $variant !== "prominent" && css`
        &:first-child {
          td {
            border-top: var(--table-cell-border-horizontal-width) solid var(--table-row-border-default);
          }
        }
      `}

      td {
        &:not(:last-child) {
          border-right: var(--table-cell-border-vertical-width) solid var(--table-row-border-default);
        }
        border-bottom: var(--table-cell-border-horizontal-width) solid var(--table-row-border-default);
      }
    }
  }

  & tfoot td {
    background-color: var(--table-footer-bg-default);
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
    tr:has(> th:last-child[rowspan]) + tr > th:last-child {
      border-right: var(--table-cell-border-vertical-width) solid
        var(--table-header-border-color);
    }

    ${({ $variant }) => css`
      ${$variant !== "prominent" && css`
        /* The spanning cell should not draw one continuous divider. */
        tr > th:first-child[rowspan] {
          border-right-color: transparent;
        }

        /* Cells that need to paint the replacement divider. */
        tr > th:first-child[rowspan] + th,
        tr:has(> th:first-child[rowspan]) + tr > th:first-child {
          position: relative;
          border-left-color: transparent;
        }

        tr > th:first-child[rowspan] + th::before,
        tr:has(> th:first-child[rowspan]) + tr > th:first-child::before {
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
        tr:first-child th {
          border-top: var(--table-cell-border-horizontal-width) solid var(--table-header-border-color);
        }

        tr:first-child > th:first-child {
          border-left: var(--table-cell-border-vertical-width) solid var(--table-header-border-color);
        }

        tr:first-child > th:last-child {
          border-right: var(--table-cell-border-vertical-width) solid var(--table-header-border-color);
        }

        tr th {
          border-bottom: var(--table-cell-border-horizontal-width) solid var(--table-header-border-color);
        }
      `}
    `}
  }

  ${({ $removeOuterBorders }) => !$removeOuterBorders && css`
    & tbody tr td:first-child,
    & tfoot tr td:first-child {
      border-left: var(--global-borderwidth-xs) solid var(--table-row-border-default);
    }

    & tbody tr td:last-child,
    & tfoot tr td:last-child {
      border-right: var(--global-borderwidth-xs) solid var(--table-row-border-default);
    }

    & tfoot tr:last-child td {
      border-bottom: var(--global-borderwidth-xs) solid var(--table-row-border-default);
    }
  `}

  &[data-has-sticky-header="true"] {
    thead {
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }

  &[data-has-sticky-footer="true"] {
    tfoot {
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

export { StyledTableWrapper, StyledTable };
